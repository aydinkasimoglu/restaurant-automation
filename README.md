# Lokanta Otomasyon Programı

Bu, restoran sahiplerinin menülerini yönetmelerine, sipariş almalarına ve masaları yönetmelerine olanak tanıyan Nuxt ve MySQL ile oluşturulmuş bir web uygulamasıdır.

## Özellikler

- Menü öğelerini fiyat ve kategorileriyle birlikte görüntüleme
- Menü öğeleri ekleme, düzenleme veya kaldırma
- Sipariş ekleme, düzenleme veya kaldırma
- Masa doluluğunu ve masalardaki ücret hesaplarını görüntüleme

## Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/aydinkasimoglu/restaurant-automation.git
```

2. Bağımlılıkları yükleyin:

```bash
cd restaurant-automation
npm install
```

3. MySQL Kurulumu:

MySQL Workbench ve MySQL Server yazılımlarını [MySQL Installer](https://dev.mysql.com/downloads/installer/) kullanarak kurun.

MySQL Workbench üzerinden bir kullanıcı oluşturun.

4. Konfigürasyon:

MySQL Workbench'teki kullanıcı adı ve şifreniz ile iki geçici değişken oluşturun.

```bash
set sqlUser=<kullanıcı adı>
set sqlPassword=<şifre>
```

## Çalıştırma

```bash
npm run dev
```

Uygulamaya erişmek için web tarayıcınızda `http://localhost:3000` adresini ziyaret edin.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.