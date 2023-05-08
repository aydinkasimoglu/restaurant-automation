import mysql from "mysql"

export default defineEventHandler(async event => {
  const id = parseInt(event.context.params!.id)

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400, 
      message: "Geçersiz sipariş id"
    })
  }

  const connection: mysql.Connection = event.context.connection

  try {
    const result = await deleteSiparisler(connection, id) as number

    return result
  } catch (error) {
    console.error(error)

    throw new Error("Masa temizlenemedi")
  }
})

function deleteSiparisler(connection: mysql.Connection, id: any) {
  return new Promise((resolve, reject) => {
    connection.query("USE Restoran", error => {
      if (error) reject(error)
      console.log("Veri tabanı kullanıldı")

      connection.query(`DELETE FROM Siparis WHERE masa_id = ${id}`, (error, result) => {
        if (error) reject(error)
        console.log("Siparişler silindi")

        resolve(result)
      })
    })
  })
}