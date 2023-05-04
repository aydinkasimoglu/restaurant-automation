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
      if (error) throw error
      console.log("Veri tabanı kullanıldı")

      connection.query(`
        UPDATE Masa
        LEFT JOIN (
          SELECT Siparis.masa_id, SUM(Yiyecek.fiyat * Siparis.adet) AS toplam_fiyat
          FROM Siparis
          LEFT JOIN Yiyecek ON Siparis.yiyecek_id = Yiyecek.yiyecek_id
          GROUP BY Siparis.masa_id
        ) AS Calculated ON Masa.masa_id = Calculated.masa_id
        SET Masa.toplam_fiyat = IFNULL(Calculated.toplam_fiyat, 0),
            Masa.dolu = CASE WHEN IFNULL(Calculated.toplam_fiyat, 0) <> 0 THEN 1 ELSE 0 END
      `, (error, updateResult) => {
        if (error) reject(error)

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
