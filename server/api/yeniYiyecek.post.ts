import mysql from "mysql"

type Body = {
  yiyecekAd: string
  yiyecekFiyat: number
  yiyecekTur: string
  yiyecekFotograf: string
}

export default defineEventHandler(async event => {
  const body: Body = await readBody(event)
  const connection: mysql.Connection = event.context.connection

  try {
    const yiyecek = await insertYiyecek(connection, body) as number

    return yiyecek
  } catch (error) {
    console.error(error)

    throw new Error("Yeni yiyecek eklenirken bir hata oluştu.")
  }
})

function insertYiyecek(connection: mysql.Connection, body: Body) {
  return new Promise((resolve, reject) => {
    connection.query("USE Restoran", error => {
      if (error) throw error
      console.log("Veri tabanı kullanıldı")

      connection.query("SELECT COUNT(*) FROM Yiyecek", (error, results) => {
        if (error) throw error

        connection.query(`
          INSERT INTO Yiyecek (ad, tur_id, fiyat, fotograf)
          VALUES ('${body.yiyecekAd}', (SELECT yiyecektur_id FROM YiyecekTur WHERE ad = '${body.yiyecekTur}'), ${body.yiyecekFiyat}, '${body.yiyecekFotograf}')`
        , (error, results) => {
          if (error) reject(error)
          console.log("Yeni yiyecek eklendi")
          resolve(results.affectedRows)
        })
      })
    })
  })
}