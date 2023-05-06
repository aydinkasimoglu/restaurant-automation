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
      console.log("Veri tabanı kullanıldı")

      connection.query(`
        SELECT Siparis.masa_id, SUM(Yiyecek.fiyat * Siparis.adet) AS toplam_fiyat
        FROM Siparis
        JOIN Yiyecek ON Siparis.yiyecek_id = Yiyecek.yiyecek_id
        GROUP BY Siparis.masa_id`
      , (error: mysql.MysqlError, result: {masa_id: number, toplam_fiyat: number}[]) => {
        if (error) reject(error)

        result.forEach(masa => {
          connection.query(`
            UPDATE Masa
            SET toplam_fiyat = ${masa.toplam_fiyat}, dolu = ${masa.toplam_fiyat !== 0 ? 1 : 0}
            WHERE masa_id = ${masa.masa_id}
          `, (error) => {if (error) reject(error)})
        })

        connection.query(`
          SELECT masa_id AS id, dolu, toplam_fiyat
          FROM Masa
        `, (error, selectResult) => {
          if (error) reject(error)

          console.log("Masalar listelendi")
          resolve(selectResult)
        })
      })
    })
  })
}
