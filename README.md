# AstroForge: Orbit Tycoon — Web Prototype

Prototype browser-ready untuk **AstroForge: Orbit Tycoon**, disusun sebagai static site tanpa build tool, backend, package manager, atau aset eksternal wajib.

## Upload ke GitHub Pages

1. Buat repository GitHub baru, misalnya `astroforge-orbit-tycoon`.
2. Upload **isi folder ini** ke root repository. Pastikan `index.html` berada pada root, bukan di dalam folder tambahan.
3. Buka repository → **Settings** → **Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/(root)`, lalu klik **Save**.
6. Tunggu deployment GitHub Pages selesai. URL game akan muncul pada halaman Pages repository.

## Run lokal

Buka langsung `index.html` di browser. File ini tidak membutuhkan bundler maupun web server karena semua script memakai satu file JavaScript standar.

## Kontrol

- Pilih modul dari panel kanan, lalu klik tile kosong yang tersambung ke Corridor atau Docking Bay.
- Klik modul untuk memilihnya.
- Klik kartu kru setelah modul dipilih untuk menugaskan kru ke modul tersebut.
- Klik kartu kru terlebih dahulu lalu klik modul untuk metode penugasan sebaliknya.
- Gunakan Pause, 1X, atau 2X untuk mengatur simulasi.
- Klik Rotate 90° untuk memutar orientasi grid.

## Sistem yang tersedia

- Grid isometrik 2.5D dengan koordinat layer internal.
- Kamera logika rotasi empat arah 90°.
- Credits, Dark Matter, Power, Basic Alloy, dan Research Points.
- Empat ras kru dengan bonus yang terkunci: Terran, Xeno-Glitch, Kronos-Titan, Nebulon.
- Level kru 1–5, EXP, stres, happiness dasar, penugasan modul, serta sinergi buruk Xeno-Glitch/Kronos-Titan pada produksi.
- Tech Tier 1–4 dengan syarat Tier 2 otomatis: 20 kru dan 500 Basic Alloy.
- Solar Flare dan Space Pirates acak.
- Modul Tier 1 yang langsung playable: Corridor, Solar Panel Array, Debris Recycler, Algae Farm, Basic Crew Quarter, Quantum Lab, Recharging Station, dan Atmospheric Regulator.

## Batas build ini

Dokumen baseline masih mengatur beberapa sistem yang belum dibuat secara penuh dalam prototipe ini: pathfinding kru/robot visual, market dinamis, fleet expedition, UI research tree detail, quest Galactic Federation Contract, upgrading Quantum Lab sampai Tier 3, save/load, serta visual assets 3D. Tidak ada mekanik baru di luar baseline yang ditambahkan.
