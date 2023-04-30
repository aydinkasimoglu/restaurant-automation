import mysql from "mysql"

type Body = {
  siparisAd: string
  siparisAdet: number
  siparisNo: number
}

export default defineEventHandler(async event => {
  const body: Body = await readBody(event)
  const connection: mysql.Connection = event.context.connection

  try {
    const siparis = await insertSiparis(connection, body) as number

    return siparis
  } catch(error) {
    console.error(error)

    throw new Error("Yeni sipariş eklenemedi")
  }
})

function insertSiparis(connection: mysql.Connection, body: Body) {
  return new Promise((resolve, reject) => {
    connection.query("USE Restoran", error => {
      if (error) throw error
      console.log("Veri tabanı kullanıldı")

      connection.query("SELECT COUNT(*) FROM Siparis", (error, results) => {
        if (error) throw error

        const siparis_id: number = results[0]["COUNT(*)"]

        connection.query(`
          INSERT INTO Siparis (siparis_id, adet, yiyecek_id, siparis_no)
          VALUES (${siparis_id}, ${body.siparisAdet}, (SELECT yiyecek_id FROM Yiyecek WHERE ad = '${body.siparisAd}'), ${body.siparisNo})`
        , (error, results) => {
          if (error) reject(error)
          console.log("Yeni sipariş eklendi")
          resolve(results.affectedRows)
        })
      })
    })
  })
}