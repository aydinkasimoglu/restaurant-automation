import mysql from "mysql"

type Masa = {
  id: number
  dolu: number
  toplam_fiyat: number
}

export default defineEventHandler(async event => {
  const connection: mysql.Connection = event.context.connection

  try {
    const masalar = await getYiyeceklerList(connection) as Masa[]

    return masalar
  } catch (error) {
    console.error(error)

    throw new Error("Masalar listelenemedi")
  }
})

function getYiyeceklerList(connection: mysql.Connection) {
  return new Promise((resolve, reject) => {
    connection.query("USE Restoran", error => {
      if (error) reject(error)

      connection.query(`
        SELECT Siparis.masa_id, SUM(Yiyecek.fiyat * Siparis.adet) AS toplam_fiyat
        FROM Siparis
        JOIN Yiyecek ON Siparis.yiyecek_id = Yiyecek.yiyecek_id
        GROUP BY Siparis.masa_id`
      , async (error: mysql.MysqlError, results: {masa_id: number, toplam_fiyat: number}[]) => {
        if (error) reject(error)

        for (let i = 1; i <= 10; i++) {
          connection.query(`SELECT COUNT(*) FROM Siparis WHERE masa_id = ${i}`, (error, countResult) => {
            if (error) reject(error)

            const count: number = countResult[0]["COUNT(*)"]

            if (count === 0) {
              connection.query(`
                UPDATE Masa
                SET toplam_fiyat = 0, dolu = 0
                WHERE masa_id = ${i}
              `, (error) => {if (error) reject(error)})
            }

            if (count > 0) {
              connection.query(`
                UPDATE Masa
                SET toplam_fiyat = ${results.find(item => item.masa_id === i)?.toplam_fiyat}, dolu = 1
                WHERE masa_id = ${i}
              `, (error) => {if (error) reject(error)})
            }

            if (i === 10) {
              connection.query("SELECT Masa.masa_id AS id, dolu, toplam_fiyat FROM Masa", (error, result) => {
                if (error) reject(error)

                resolve(result)
              })
            }
          })
        }
      })
    })
  })
}