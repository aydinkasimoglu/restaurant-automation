import mysql from "mysql"

const config = useRuntimeConfig()
let connection: mysql.Connection | null = null

export default defineEventHandler(event => {
  if (!connection) {
    connection = mysql.createConnection({
      host: "localhost",
      user: config.user,
      password: config.password,
    })
  }

  event.context.connection = connection
})