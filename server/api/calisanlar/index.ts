import mysql from "mysql"

type Calisan = {
  calisan_id: number
  ad: string
  soyad: string
  pozisyon: number
  maas: number
  telefon_no: string
  cinsiyet: string
}

export default defineEventHandler(async event => {
  const connection: mysql.Connection = event.context.connection

  try {
    const calisanlar = await getCalisanlarList(connection) as Calisan[]
    return calisanlar
  }
  catch (error) {
    console.error(error)

    throw new Error("Çalışanlar listelenemedi")
  }
})

function getCalisanlarList(connection: mysql.Connection) {
  return new Promise((resolve, reject) => {
    connection.query("USE Restoran", error => {
      if (error) reject(error)
      console.log("Veri tabanı kullanıldı")

      connection.query(`
        SELECT calisan_id, Calisan.ad AS ad, soyad, Pozisyon.ad AS pozisyon, maas, telefon_no, cinsiyet
        FROM Calisan
        JOIN Pozisyon ON Calisan.pozisyon = Pozisyon.pozisyon_id
      `, (err, result) => {
        if (err) reject(err)
        console.log("Çalışanlar listelendi")
        resolve(result)
      })
    })
  })
}