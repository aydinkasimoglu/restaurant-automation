import mysql from "mysql"

type Siparis = {
  siparis_id: number
  siparis_no: number
  adet: number
  ad: string
  tur: string
  tarih: string
  fiyat: number
  fotograf: string
}

export default defineEventHandler(async event => {
  const connection: mysql.Connection = event.context.connection

  try {
    const siparisler = await getSiparislerList(connection) as Siparis[]

    return siparisler
  } catch (error) {
    console.error(error)

    throw new Error("Siparişler listelenemedi")
  }
})

function getSiparislerList(connection: mysql.Connection) {
  return new Promise((resolve, reject) => {
    connection.query("USE Restoran", error => {
      if (error) throw error
      console.log("Veri tabanı kullanıldı")

      connection.query(`
        SELECT Siparis.siparis_id AS siparis_id, Siparis.siparis_no AS siparis_no, Siparis.adet AS adet, Yiyecek.ad AS ad, Yiyecek.fiyat AS fiyat, YiyecekTur.ad AS tur, Siparis.siparis_tarih AS tarih, Yiyecek.fotograf AS fotograf
        FROM Siparis
        JOIN Yiyecek ON Siparis.yiyecek_id = Yiyecek.yiyecek_id
        JOIN YiyecekTur ON Yiyecek.tur_id = YiyecekTur.yiyecektur_id
        ORDER BY Siparis.siparis_tarih DESC
      `, (error, results) => {
        if (error) reject(error)
        console.log("Siparişler listelendi")
        resolve(results)
      })
    })
  })
}