import mysql from "mysql"

export default defineEventHandler(async event => {
  const id = parseInt(event.context.params!.id)

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400, 
      message: "Geçersiz yiyecek id"
    })
  }

  const connection: mysql.Connection = event.context.connection

  try {
    const result = await deleteYiyecek(connection, id) as number

    return result
  } catch (error) {
    console.error(error)

    throw new Error("Yiyecek silinemedi")
  }
})

function deleteYiyecek(connection: mysql.Connection, id: any) {
  return new Promise((resolve, reject) => {
    connection.query("USE Restoran", error => {
      if (error) reject(error)
      console.log("Veri tabanı kullanıldı")

      connection.query(`DELETE FROM Yiyecek WHERE yiyecek_id = ${id}`, (error, result) => {
        if (error) reject(error)
        console.log("Yiyecek silindi")

        resolve(result)
      })
    })
  })
}