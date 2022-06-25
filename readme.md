# Dicoding - Aplikasi Pengelolaan Data Menggunakan DOM dan Web Storage

  Project ini adalah Submission dari Aplikasi Pengelolaan Data Menggunakan DOM dan Web Storage.

  Link Dicoding: [disini](https://www.dicoding.com/academies/315)

## Table of contents

- [Dicoding - Aplikasi Pengelolaan Data Menggunakan DOM dan Web Storage](#dicoding---aplikasi-pengelolaan-data-menggunakan-dom-dan-web-storage)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [Screenshots](#screenshots)
    - [Features](#features)
      - [1. Mampu Menambahkan Data Buku](#1-mampu-menambahkan-data-buku)
      - [2. Memiliki Dua Rak Buku](#2-memiliki-dua-rak-buku)
      - [3. Dapat Memindahkan Buku antar Rak](#3-dapat-memindahkan-buku-antar-rak)
      - [4. Dapat Menghapus Data Buku](#4-dapat-menghapus-data-buku)
      - [5. Manfaatkan localStorage dalam Menyimpan Data Buku](#5-manfaatkan-localstorage-dalam-menyimpan-data-buku)
    - [Stack Technology Used](#stack-technology-used)
    - [Link](#link)
  - [Developed By](#developed-by)
  - [Thanks to](#thanks-to)

## Overview

Untuk bisa lulus dan mendapatkan sertifikat dari akademi ini, Anda harus mengerjakan tugas yakni membuat proyek Bookshelf Apps sesuai kriteria lengkap di bawah ini. Tim Reviewer akan memeriksa pekerjaan Anda dan memberikan reviu pada proyek yang Anda buat.

### Screenshots

Coming soon...

### Features

#### 1. Mampu Menambahkan Data Buku

- Bookshelf Apps harus mampu menambahkan data buku baru.
- Data buku yang disimpan merupakan objek JavaScript dengan struktur berikut:

```javascript
{
  id: string | number,
  title: string,
  author: string,
  year: number,
  isComplete: boolean,
}
```

Berikut contoh data riilnya:

```javascript
{
  id: 3657848524,
  title: 'Harry Potter and the Philosopher\'s Stone',
  author: 'J.K Rowling',
  year: 1997,
  isComplete: false,
}
```

Catatan:

Untuk id buku pada tiap buku yang disimpan haruslah unik. Tips dalam menetapkan nilai untuk adalah Anda bisa memanfaatkan nilai timestamp. Untuk mendapatkan nilai timestamp di JavaScript cukup mudah, cukup dengan menuliskan expressions +new Date().

#### 2. Memiliki Dua Rak Buku

- Bookshelf Apps harus memiliki 2Rak buku. Yakni, “Belum selesai dibaca” dan “Selesai dibaca”.
- Rak buku Belum selesai dibaca hanya menyimpan buku yang properti isComplete nya bernilai false.
- Rak buku Selesai dibaca hanya menyimpan buku yang properti isComplete nya bernilai true.

#### 3. Dapat Memindahkan Buku antar Rak

- Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dipindahkan di antara keduanya.

#### 4. Dapat Menghapus Data Buku

- Buku yang ditampilkan pada rak baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dihapus.

#### 5. Manfaatkan localStorage dalam Menyimpan Data Buku

- Data buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat bertahan walaupun halaman web ditutup.
- Dengan begitu, Anda harus menyimpan data buku pada localStorage.

### Stack Technology Used

- HTML
- CSS
- Tailwind CSS
- Javascript

### Link

  Coming soon...

## Developed By

  Developed by me (Afif Abdillah Jusuf), visit my web at [afif.dev](https://afif.dev) for more contact information

## Thanks to

  Dicoding. ([dicoding.com](https://dicoding.com))

  Jadilah developer expert menggunakan kurikulum standar internasional dari principal technology owner seperti Google, Microsoft, AWS, IBM, dan LINE.
