import mysql from "mysql"

type Yiyecek = {
  ad: string
  tur: string
  fiyat: number
}

export default defineEventHandler(async event => {
  const connection: mysql.Connection = event.context.connection

  try {
    const yiyecekler = await getYiyeceklerList(connection) as Yiyecek[]

    return yiyecekler
  } catch (error) {
    console.error(error)

    throw new Error("Yiyecekler listelenemedi")
  }
})

function getYiyeceklerList(connection: mysql.Connection) {
  return new Promise((resolve, reject) => {
    connection.query("USE Restoran", error => {
      if (error) throw error
      console.log("Veri tabanı kullanıldı")

      connection.query(`
        SELECT Yiyecek.ad AS ad, Yiyecek.fiyat AS fiyat, YiyecekTur.ad AS tur
        FROM Yiyecek
        JOIN YiyecekTur ON Yiyecek.tur_id = YiyecekTur.yiyecektur_id
      `, (error, results) => {
        if (error) reject(error)
        console.log("Yiyecekler listelendi")
        resolve(results)
      })
    })
  })
}