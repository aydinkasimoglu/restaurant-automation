import mysql from "mysql"

type Masa = {
  id: number
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
				SELECT Siparis.masa_id AS id, SUM(Yiyecek.fiyat * Siparis.adet) AS toplam_fiyat
				FROM Siparis
				JOIN Yiyecek ON Siparis.yiyecek_id = Yiyecek.yiyecek_id
				GROUP BY Siparis.masa_id;
      `, (error, results) => {
        if (error) reject(error)
        console.log("Masalar listelendi")
        resolve(results)
      })
    })
  })
}
