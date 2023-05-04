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
        SELECT Masa.masa_id AS id, Masa.dolu, SUM(Yiyecek.fiyat * Siparis.adet) AS toplam_fiyat
        FROM Masa
        LEFT JOIN Siparis ON Masa.masa_id = Siparis.masa_id
        LEFT JOIN Yiyecek ON Siparis.yiyecek_id = Yiyecek.yiyecek_id
        GROUP BY Masa.masa_id, Masa.dolu
      `, (error, results) => {
        if (error) reject(error)
        console.log("Masalar listelendi")
        resolve(results)
      })
    })
  })
}
