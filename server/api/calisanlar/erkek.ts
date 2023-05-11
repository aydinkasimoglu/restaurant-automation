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
    const calisanlar = await getErkekCalisanlarList(connection) as Calisan[]
    return calisanlar
  }
  catch (error) {
    console.error(error)

    throw new Error("Erkek çalışanlar listelenemedi")
  }
})

function getErkekCalisanlarList(connection: mysql.Connection) {
  return new Promise((resolve, reject) => {
    connection.query("USE Restoran", error => {
      if (error) reject(error)
      console.log("Veri tabanı kullanıldı")

      connection.query(`
        SELECT calisan_id, Calisan_Erkek.ad, soyad, Pozisyon.ad AS pozisyon, maas, telefon_no, cinsiyet
        FROM Calisan_Erkek
        JOIN Pozisyon ON Calisan_Erkek.pozisyon = Pozisyon.pozisyon_id
      `, (err, result) => {
        if (err) reject(err)
        console.log("Çalışanlar listelendi")
        resolve(result)
      })
    })
  })
}