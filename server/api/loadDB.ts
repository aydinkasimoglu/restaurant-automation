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
  [1, "Kola", 1, 5, "https://tinyurl.com/43t27x7n"],
  [2, "Fanta", 1, 5, "https://tinyurl.com/2p8j53yj"],
  [3, "Ayran", 1, 3, "https://tinyurl.com/bderer36"],
  [4, "Su", 1, 2, "https://tinyurl.com/dmmskznz"],
  [5, "Sütlaç", 2, 5, "https://tinyurl.com/mshf4tn2"],
  [6, "Baklava", 2, 5, "https://tinyurl.com/mr6sbz9n"],
  [7, "Künefe", 2, 10, "https://tinyurl.com/2p92yk6s"],
  [8, "Ekler", 2, 15, "https://tinyurl.com/58d65am4"],
  [9, "Köfte", 6, 15, "https://tinyurl.com/2s3532br"],
  [10, "Ciğer", 6, 10, "https://tinyurl.com/2p8sjnt5"],
  [11, "Tantuni", 6, 20, "https://tinyurl.com/4yfrddy5"],
  [12, "Tas Kebabı", 6, 20, "https://tinyurl.com/5n6uyp7d"],
  [13, "Mercimek Çorbası", 4, 10, "https://tinyurl.com/bddspsjd"],
  [14, "Domates Çorbası", 4, 10, "https://tinyurl.com/3c47bj84"],
  [15, "Ezogelin Çorbası", 4, 10, "https://tinyurl.com/ypwkw2st"],
  [16, "Tavuklu Salata", 5, 15, "https://tinyurl.com/4s99pnks"],
  [17, "Mevsim Salata", 5, 15, "https://tinyurl.com/4p43vsxk"],
  [18, "Akdeniz Salata", 5, 15, "https://tinyurl.com/3tcwu78m"],
  [19, "Köfteburger", 3, 15, "https://tinyurl.com/5n8w29k3"],
  [20, "Cheeseburger", 3, 20, "https://tinyurl.com/3xupdp3u"],
  [21, "Tavukburger", 3, 20, "https://tinyurl.com/t5vcbezt"],
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

              connection.query("CREATE TABLE IF NOT EXISTS Yiyecek (yiyecek_id INT NOT NULL PRIMARY KEY, ad NVARCHAR(25) NOT NULL, tur_id INT NOT NULL, fiyat INT NOT NULL, fotograf NVARCHAR(30) NOT NULL, INDEX yiyecektur_id_idx (tur_id ASC) VISIBLE, CONSTRAINT yiyecektur_id FOREIGN KEY (tur_id) REFERENCES YiyecekTur(yiyecektur_id))", error => {
                if (error) throw error
                console.log("Yiyecek tablosu oluşturuldu")

                connection.query("INSERT INTO YiyecekTur (yiyecektur_id, ad) VALUES ?", [tur], (error, result) => {
                  if (error) throw error
                  console.log(`Yiyecek türü tablosuna ${result.affectedRows} satır eklendi`)
                })

                connection.query("INSERT INTO Yiyecek (yiyecek_id, ad, tur_id, fiyat, fotograf) VALUES ?", [yiyecek], (error, result) => {
                  if (error) throw error
                  console.log(`Yiyecek tablosuna ${result.affectedRows} satır eklendi`)
                })

                connection.query("DROP TABLE IF EXISTS Siparisler", error => {
                  if (error) throw error
                  console.log("Siparişler tablosu düşürüldü")

                  connection.query("CREATE TABLE IF NOT EXISTS Siparis (siparis_id INT NOT NULL PRIMARY KEY, yiyecek_id INT NOT NULL, siparis_no INT NOT NULL, adet TINYINT NOT NULL, siparis_tarih DATETIME DEFAULT CURRENT_TIMESTAMP, INDEX siparis_yiyecek_id_idx (yiyecek_id ASC) VISIBLE, CONSTRAINT siparis_yiyecek_id FOREIGN KEY (yiyecek_id) REFERENCES Yiyecek(yiyecek_id))", error => {
                    if (error) throw error
                    console.log("Siparişler tablosu oluşturuldu")
                  })
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