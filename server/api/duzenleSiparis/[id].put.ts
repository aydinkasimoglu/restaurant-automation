import mysql from "mysql"

type Body = {
  siparisId: number
  siparisAd: string
  siparisAdet: number
  masaId: number
}

export default defineEventHandler(async event => {
  const body: Body = await readBody(event)
  const connection: mysql.Connection = event.context.connection

  try {
    const siparis = await updateSiparis(connection, body) as number

    return siparis
  } catch(error) {
    console.error(error)

    throw new Error("Sipariş güncellenemedi")
  }
})

function updateSiparis(connection: mysql.Connection, body: Body) {
  return new Promise((resolve, reject) => {
    connection.query("USE Restoran", error => {
      if (error) throw error
      console.log("Veri tabanı kullanıldı")

      connection.query(`
        UPDATE Siparis
        SET adet = ${body.siparisAdet}, yiyecek_id = (SELECT yiyecek_id FROM Yiyecek WHERE ad = '${body.siparisAd}'), masa_id = ${body.masaId}
        WHERE siparis_id = ${body.siparisId}`
      , (error, results) => {
        if (error) reject(error)
        console.log("Sipariş güncellendi")
        resolve(results.affectedRows)
      })
    })
  })
}
