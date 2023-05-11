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
      if (error) reject(error)

      connection.query("SELECT masa_id AS id, dolu, toplam_fiyat FROM Masa", (error, result) => {
        if (error) reject(error)

        resolve(result)
      })
    })
  })
}