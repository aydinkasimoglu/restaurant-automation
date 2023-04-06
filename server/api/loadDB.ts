import mysql from "mysql"

const tur = [
  [1, "İçecekler"],
  [2, "Tatlılar"],
  [3, "Hamburgerler"],
  [4, "Çorbalar"],
  [5, "Salatalar"],
  [6, "Et Yemekleri"],
]

const yiyecek = [
  [1, "Kola", 1, 5],
  [2, "Fanta", 1, 5],
  [3, "Ayran", 1, 3],
  [4, "Su", 1, 2],
  [5, "Çikolata", 2, 5],
  [6, "Kek", 2, 5],
  [7, "Künefe", 2, 10],
  [8, "Köfte", 6, 15],
  [9, "Kuru Fasulye", 6, 10],
  [10, "Mercimek Çorbası", 4, 10],
  [11, "Domates Çorbası", 4, 10],
  [12, "Ezogelin Çorbası", 4, 10],
  [13, "Tavuklu Salata", 5, 15],
  [14, "Köfteli Salata", 5, 15],
  [15, "Hamburger", 3, 15],
  [16, "Cheeseburger", 3, 20],
  [17, "Tavukburger", 3, 20],
]

export default defineEventHandler(event => {
  const connection: mysql.Connection = event.context.connection

  // Gerekli veri tabanı ve tablolar yoksa oluştur ve verileri ekle
  connection.query("DROP DATABASE IF EXISTS Restoran", error => {
    if (error) throw error
    console.log("Veri tabanı düşürüldü")

    connection.query("CREATE DATABASE IF NOT EXISTS Restoran", error => {
      if (error) throw error
      console.log("Veri tabanı oluşturuldu")

      connection.query("USE Restoran", error => {
        if (error) throw error
        console.log("Veri tabanı kullanıldı")

        connection.query("DROP TABLE IF EXISTS YiyecekTur", error => {
          if (error) throw error
          console.log("Yiyecek türü tablosu düşürüldü")

          connection.query("CREATE TABLE IF NOT EXISTS YiyecekTur (yiyecektur_id INT NOT NULL PRIMARY KEY, ad NVARCHAR(25) NOT NULL)", error => {
            if (error) throw error
            console.log("Yiyecek türü tablosu oluşturuldu")

            connection.query("DROP TABLE IF EXISTS Yiyecek", error => {
              if (error) throw error
              console.log("Yiyecek tablosu düşürüldü")

              connection.query("CREATE TABLE IF NOT EXISTS Yiyecek (yiyecek_id INT NOT NULL PRIMARY KEY, ad NVARCHAR(25) NOT NULL, tur_id INT NOT NULL, fiyat INT NOT NULL, CONSTRAINT yiyecek_id FOREIGN KEY (tur_id) REFERENCES YiyecekTur(yiyecektur_id))", error => {
                if (error) throw error
                console.log("Yiyecek tablosu oluşturuldu")

                connection.query("CREATE INDEX yiyecektur_id_idx ON Yiyecek (tur_id ASC) VISIBLE", error => {
                  if (error) throw error
                  console.log("Yiyecek tablosu için index oluşturuldu")
                })

                connection.query("INSERT INTO YiyecekTur (yiyecektur_id, ad) VALUES ?", [tur], (error, result) => {
                  if (error) throw error
                  console.log(`Yiyecek türü tablosuna ${result.affectedRows} satır eklendi`)
                })

                connection.query("INSERT INTO Yiyecek (yiyecek_id, ad, tur_id, fiyat) VALUES ?", [yiyecek], (error, result) => {
                  if (error) throw error
                  console.log(`Yiyecek tablosuna ${result.affectedRows} satır eklendi`)
                })
              })
            })
          })
        })
      })
    })
  })

  return true
})