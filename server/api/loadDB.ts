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
  [1,  "Kola",             1, 5,  "https://tinyurl.com/43t27x7n"],
  [2,  "Fanta",            1, 5,  "https://tinyurl.com/2p8j53yj"],
  [3,  "Ayran",            1, 3,  "https://tinyurl.com/bderer36"],
  [4,  "Su",               1, 2,  "https://tinyurl.com/dmmskznz"],
  [5,  "Sütlaç",           2, 5,  "https://tinyurl.com/mshf4tn2"],
  [6,  "Baklava",          2, 5,  "https://tinyurl.com/mr6sbz9n"],
  [7,  "Künefe",           2, 10, "https://tinyurl.com/2p92yk6s"],
  [8,  "Ekler",            2, 15, "https://tinyurl.com/58d65am4"],
  [9,  "Köfte",            6, 15, "https://tinyurl.com/2s3532br"],
  [10, "Ciğer",            6, 10, "https://tinyurl.com/2p8sjnt5"],
  [11, "Tantuni",          6, 20, "https://tinyurl.com/4yfrddy5"],
  [12, "Tas Kebabı",       6, 20, "https://tinyurl.com/5n6uyp7d"],
  [13, "Mercimek Çorbası", 4, 10, "https://tinyurl.com/bddspsjd"],
  [14, "Domates Çorbası",  4, 10, "https://tinyurl.com/3c47bj84"],
  [15, "Ezogelin Çorbası", 4, 10, "https://tinyurl.com/ypwkw2st"],
  [16, "Tavuklu Salata",   5, 15, "https://tinyurl.com/4s99pnks"],
  [17, "Mevsim Salata",    5, 15, "https://tinyurl.com/4p43vsxk"],
  [18, "Akdeniz Salata",   5, 15, "https://tinyurl.com/3tcwu78m"],
  [19, "Köfteburger",      3, 15, "https://tinyurl.com/5n8w29k3"],
  [20, "Cheeseburger",     3, 20, "https://tinyurl.com/3xupdp3u"],
  [21, "Tavukburger",      3, 20, "https://tinyurl.com/t5vcbezt"],
]

const masa = [
  [1, 0, 0],
  [2, 0, 0],
  [3, 0, 0],
  [4, 0, 0],
  [5, 0, 0],
  [6, 0, 0],
  [7, 0, 0],
  [8, 0, 0],
  [9, 0, 0],
  [10, 0, 0],
]

const pozisyon = [
  [1, "Aşçı"],
  [2, "Garson"],
  [3, "Kasiyer"],
  [4, "Bulaşıkçı"],
  [5, "Komi"],
  [6, "Müdür"]
]

const calisan = [
  [1,  "Ahmet",   "Yılmaz", 1, 3000, "05321234567", "Erkek"],
  [2,  "Mehmet",  "Aydın",  1, 2500, "05321234568", "Erkek"],
  [3,  "Ayşe",    "Köse",   1, 2000, "05321234569", "Kadın"],
  [4,  "Fatma",   "Kara",   2, 2000, "05321234570", "Kadın"],
  [5,  "Ali",     "Yıldız", 2, 3000, "05321234571", "Erkek"],
  [6,  "Veli",    "Kaya",   3, 3000, "05321234572", "Erkek"],
  [7,  "Hasan",   "Demir",  4, 3500, "05321234573", "Erkek"],
  [8,  "Hüseyin", "Çelik",  4, 4000, "05321234574", "Erkek"],
  [9,  "Merve",   "Yılmaz", 5, 3000, "05321234575", "Kadın"],
  [10, "Zeynep",  "Aydın",  6, 5500, "05321234576", "Kadın"],
]

export default defineEventHandler(event => {
  const connection: mysql.Connection = event.context.connection

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

              connection.query("CREATE TABLE IF NOT EXISTS Yiyecek (yiyecek_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ad NVARCHAR(25) NOT NULL, tur_id INT NOT NULL, fiyat INT NOT NULL, fotograf NVARCHAR(30) NOT NULL, INDEX yiyecektur_id_idx (tur_id ASC) VISIBLE, CONSTRAINT yiyecektur_id FOREIGN KEY (tur_id) REFERENCES YiyecekTur(yiyecektur_id))", error => {
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

                  connection.query("CREATE TABLE IF NOT EXISTS Siparis (siparis_id INT NOT NULL PRIMARY KEY, yiyecek_id INT NOT NULL, masa_id INT NOT NULL, adet TINYINT NOT NULL, siparis_tarih DATETIME DEFAULT CURRENT_TIMESTAMP, INDEX siparis_yiyecek_id_idx (yiyecek_id ASC) VISIBLE, CONSTRAINT siparis_yiyecek_id FOREIGN KEY (yiyecek_id) REFERENCES Yiyecek(yiyecek_id))", error => {
                    if (error) throw error
                    console.log("Siparişler tablosu oluşturuldu")

                    connection.query("DROP TABLE IF EXISTS Masa", error => {
                      if (error) throw error
                      console.log("Masa tablosu düşürüldü")
    
                      connection.query("CREATE TABLE IF NOT EXISTS Masa (masa_id INT NOT NULL PRIMARY KEY,dolu TINYINT NOT NULL,toplam_fiyat INT DEFAULT 0)",
                        error => {
                          if (error) throw error
                          console.log("Masa tablosu oluşturuldu")
    
                          connection.query("INSERT INTO Masa (masa_id, dolu, toplam_fiyat) VALUES ?", [masa], (error, result) => {
                            if (error) throw error
                            console.log(`Masa türü tablosuna ${result.affectedRows} satır eklendi`)
                          })

                          connection.query(`
                            CREATE TRIGGER yiyecek_update
                            AFTER UPDATE ON Yiyecek
                            FOR EACH ROW
                            BEGIN
                              DECLARE masa_toplam INT;

                              SELECT SUM(Yiyecek.fiyat * Siparis.adet) INTO masa_toplam
                              FROM Siparis JOIN Yiyecek ON Siparis.yiyecek_id = Yiyecek.yiyecek_id
                              WHERE Siparis.yiyecek_id = NEW.yiyecek_id;

                              UPDATE Masa SET
                                toplam_fiyat = masa_toplam
                              WHERE masa_id IN (SELECT masa_id FROM Siparis WHERE yiyecek_id = NEW.yiyecek_id);
                            END
                          `)

                          connection.query(`
                            CREATE TRIGGER siparis_masa_insert
                            AFTER INSERT ON Siparis
                            FOR EACH ROW
                            BEGIN
                              DECLARE masa_toplam INT;
                              
                              SELECT SUM(Yiyecek.fiyat * NEW.adet) INTO masa_toplam
                              FROM Siparis JOIN Yiyecek ON Siparis.yiyecek_id = Yiyecek.yiyecek_id
                              WHERE Siparis.masa_id = NEW.masa_id;
                              
                              UPDATE Masa SET 
                                toplam_fiyat = masa_toplam,
                                dolu = 1
                              WHERE masa_id = NEW.masa_id;
                            END
                          `)

                          connection.query(`
                            CREATE TRIGGER siparis_masa_delete
                            AFTER DELETE ON Siparis
                            FOR EACH ROW
                            BEGIN
                              DECLARE masa_toplam INT;
                              
                              SELECT SUM(Yiyecek.fiyat * Siparis.adet) INTO masa_toplam
                              FROM Siparis JOIN Yiyecek ON Siparis.yiyecek_id = Yiyecek.yiyecek_id
                              WHERE Siparis.masa_id = OLD.masa_id;
                              
                              UPDATE Masa SET 
                                toplam_fiyat = masa_toplam,
                                dolu = IF((SELECT COUNT(*) FROM Siparis WHERE masa_id = OLD.masa_id) > 0, 1, 0)
                              WHERE masa_id = OLD.masa_id;
                            END
                          `)

                          connection.query(`
                            CREATE TRIGGER siparis_masa_update
                            AFTER UPDATE ON Siparis
                            FOR EACH ROW
                            BEGIN
                              DECLARE masa_toplam INT;

                              SELECT SUM(Yiyecek.fiyat * NEW.adet) INTO masa_toplam
                              FROM Siparis JOIN Yiyecek ON Siparis.yiyecek_id = Yiyecek.yiyecek_id
                              WHERE Siparis.masa_id = NEW.masa_id;

                              UPDATE Masa SET
                                toplam_fiyat = masa_toplam,
                                dolu = 1
                              WHERE masa_id = NEW.masa_id;

                              SELECT SUM(Yiyecek.fiyat * OLD.adet) INTO masa_toplam
                              FROM Siparis JOIN Yiyecek ON Siparis.yiyecek_id = Yiyecek.yiyecek_id
                              WHERE Siparis.masa_id = OLD.masa_id;

                              UPDATE Masa SET
                                toplam_fiyat = IF((SELECT COUNT(*) FROM Siparis WHERE masa_id = OLD.masa_id) > 0, masa_toplam, 0),
                                dolu = IF((SELECT COUNT(*) FROM Siparis WHERE masa_id = OLD.masa_id) > 0, 1, 0)
                              WHERE masa_id = OLD.masa_id;
                            END
                          `)
                      })
                    })
                  })
                })

                connection.query("DROP TABLE IF EXISTS Pozisyon", error => {
                  if (error) throw error
                  console.log("Pozisyon tablosu düşürüldü")

                  connection.query("CREATE TABLE IF NOT EXISTS Pozisyon (pozisyon_id INT NOT NULL PRIMARY KEY, ad NVARCHAR(25) NOT NULL)", error => {
                    if (error) throw error
                    console.log("Pozisyon tablosu oluşturuldu")

                    connection.query("DROP TABLE IF EXISTS Calisan", error => {
                      if (error) throw error
                      console.log("Çalışanlar tablosu düşürüldü")

                      connection.query("CREATE TABLE IF NOT EXISTS Calisan (calisan_id INT NOT NULL PRIMARY KEY, ad NVARCHAR(50) NOT NULL, soyad NVARCHAR(50) NOT NULL, pozisyon INT NOT NULL, maas DECIMAL NOT NULL, telefon_no BIGINT NOT NULL, cinsiyet NVARCHAR(5) NOT NULL, INDEX pozisyon_id_idx (pozisyon ASC) VISIBLE, CONSTRAINT pozisyon_id FOREIGN KEY (pozisyon) REFERENCES Pozisyon(pozisyon_id))", error => {
                        if (error) throw error
                        console.log("Çalışanlar tablosu oluşturuldu")

                        connection.query("CREATE OR REPLACE VIEW Calisan_Erkek AS SELECT * FROM Calisan WHERE cinsiyet = 'Erkek'", error => {
                          if (error) throw error
                          console.log("Erkek çalışanlar görüntüsü oluşturuldu")
                        })

                        connection.query("CREATE OR REPLACE VIEW Calisan_Kadin AS SELECT * FROM Calisan WHERE cinsiyet = 'Kadın'", error => {
                          if (error) throw error
                          console.log("Kadın çalışanlar görüntüsü oluşturuldu")
                        })

                        connection.query("INSERT INTO Pozisyon (pozisyon_id, ad) VALUES ?", [pozisyon], (error, result) => {
                          if (error) throw error
                          console.log(`Pozisyon tablosuna ${result.affectedRows} satır eklendi`)
                        })

                        connection.query("INSERT INTO Calisan (calisan_id, ad, soyad, pozisyon, maas, telefon_no, cinsiyet) VALUES ?", [calisan], (error, result) => {
                          if (error) throw error
                          console.log(`Çalışanlar tablosuna ${result.affectedRows} satır eklendi`)
                        })
                      })
                    })
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