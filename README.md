# Niyet — Kaza Orucu

Kaza orucunu planlama, hatırlatma ve tamamlamaya yönelik gerçek, kurulabilir web uygulaması.

## Canlı

**https://ensar0-beep.github.io/niyet/**

Telefonda tarayıcıda aç, "Ana Ekrana Ekle" ile gerçek bir uygulama gibi kur.
Hiçbir hesap/giriş gerekmez — tüm veri yalnızca cihazında tutulur (localStorage).

## Bu sürümde ne var

- Onboarding: kaç gün kaza orucun var, ne tempoda tamamlamak istiyorsun
- Gün planlama + Diyanet'in resmî dinî günler verisiyle desteklenen fırsat günü önerileri
  (Berat, Aşure, Arefe, eyyam-ı bîd) — bayram günlerinde planlama otomatik engellenir
- Tamamlama anı ve görsel ilerleme (yıldız alanı / yolculuk)
- Cihaz bildirimi (best-effort): bir gün önceden "yarın planlısın" hatırlatması
- Kaynaklar ekranı: her öneri, kaynağı ve ihtilafıyla birlikte gösterilir

## Bu sürümde bilerek olmayan şey

- **Sosyal/grup katmanı yok.** En riskli, hiç kullanıcıyla doğrulanmamış varsayımdı — önce
  bireysel döngünün kendi başına değerli olup olmadığını görmek daha önemli.
- **Gerçek push bildirimi yok.** Backend/sunucu olmadan bu mümkün değil. Şu an yapılan şey:
  uygulama açıldığında ertesi gün planlıysa cihaz bildirimi göstermek — tarayıcı/cihaz kapalıyken
  çalışmaz.
- **Gerçek imsak/iftar vakti yok.** Yanlış vakit göstermek gerçek zarar verebileceği için hiç
  gösterilmiyor; kullanıcı kendi bölgesinin takvimine yönlendiriliyor.
- Ümmü'l-Kurâ takvimi hâlâ formül tabanlı tahmin; yalnızca Diyanet tarafı gerçek veriyle doğrulanmış.

## Dosyalar

- `index.html` — gerçek uygulama (tek dosya, derleme gerekmez)
- `manifest.json`, `sw.js`, `icons/` — kurulabilirlik (PWA) desteği
- `niyet-prototype.html` — önceki tıklanabilir mockup (sosyal katman dahil, arşiv amaçlı)

## Önemli not

Dini içerik (Kaynaklar ekranı, kandil önerileri) bir ön-filtredir, nihai onay değil.
Gerçek kullanıcılara açık şekilde dağıtmadan önce ilahiyat kökenli bir danışmana okutulmalı.
