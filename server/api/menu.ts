import mysql from "mysql"

type Yiyecek = {
  ad: number
  tur: string
  fiyat: number
}

let yiyecekler: Yiyecek[] = []

export default defineEventHandler(event => {
  const connection: mysql.Connection = event.context.connection

  connection.query("USE Restoran", error => {
    if (error) throw error
    console.log("Veri tabanı kullanıldı")

    connection.query("SELECT Yiyecek.ad AS ad, Yiyecek.fiyat AS fiyat, YiyecekTur.ad AS tur "+
                     "FROM Yiyecek "+
                     "JOIN YiyecekTur ON Yiyecek.tur_id = YiyecekTur.yiyecektur_id", handleQuery)
  })

  return yiyecekler
})

function handleQuery(error: mysql.MysqlError, result: Yiyecek[]) {
  if (error) throw error
  console.log("Yiyecekler alındı")

  yiyecekler = result
}