# Tugas 3 Hotel Application

## Ketentuan

1. Tugas paling lambat dikumpulkan pada **21 Oktober 2021**, sebelum **09:00**.
2. Buat project baru dan push ke repository dengan nama `task-3-hotel-app`.
3. Kerjakan sendiri, diperbolehkan bertanya, tapi tidak diperbolehkan **copy paste** jawaban.
4. Code akan diuji, jika terdapat kesamaan, nilai akan langsung di set ke **10**.

## Interface

Berikut adalah interface yang harus kalian implementasi.

```ts
export interface IBookComponent {
  bookings: Book[];
  booking: Book;

  onReserve(booking: Book): void;
  onCheckIn(bookingId: number): void;
  onCheckOut(bookingId: number): void;
  onSelectReservation(bookingId: number): void;
  onDeleteReservation(bookingId: number): void;

  initializeBookingStorage(): void;
  updateBookingStorage(): void;
  clearBookingStorage(): void;
}

export interface IBookFormComponent {
  booking?: Book;
  bookingGroup: FormGroup;

  onSubmitReservation(): void;
  onFormReset(): void;
}

export interface IBookListComponent {
  bookings: Book[];

  checkIn: EventEmitter<number>;
  checkOut: EventEmitter<number>;
  selectReservation: EventEmitter<number>;
  deleteReservation: EventEmitter<number>;

  onCheckIn(bookingId: number): void;
  onCheckOut(bookingId: number): void;
  onSelectReservation(bookingId: number): void;
  onDeleteReservation(bookingId: number): void;

  displayAlert(message: string): void;
}
```

## Model

```ts
export interface Book {
  id: number;
  status: "reserved" | "checked-in" | "checked-out";
  roomNumber: string;
  duration: number; // dalam satuan malam, jika 2 berarti 2 malam menginap.
  guestCount: number; // jumlah tamu yang menginap dalam 1 kamar
  reservee: Guest;
}

export interface Guest {
  id: number;
  name: string;
  email: string;
  phone: string;
}
```

## Requirement

1. Tugas ini kamu akan membuat sebuah website `reservasi hotel`
2. Pada website terdapat menu `Booking` yang isinya terdapat `Book List Component` dan `Form Book Component`
3. Untuk interface di simpan di folder `interfaces` dalam module `guest-book`
4. Untuk model disimpan di folder `models` dalam module `guest-book`
5. Untuk harga kamar per malam disimpan di `environment.ts` dengan nama `nightlyFee`
6. Pada saat `reserved` akan menampilkan `harga` sesuai dengan `lama menginap * harga permalam` yang harus di bayarkan di `displayAlert` yang isinya :
   ```text
      Tamu {name} telah melakukan pemesanan untuk kamar {roomNumber} selama {duration} malam dengan total tagihan sebesar {totalPrice}.
   ```
7. Data yang sudah terinput dapat di tampilkan pada tabel dengan format seperti di bawah ini :
   BookingID | Nama Pemesan | Nomor Kamar | Durasi Menginap | Total Biaya | Jumlah Tamu | Status Pemesanan | Aksi
   --- | --- | --- | --- | --- |--- |--- |---
   1| Amanda Raules| 123 | 2 Malam | 250000 | 2 | reserved | [checkin] [checkout] [edit] [hapus]
   2| Nazar | 124 | 1 Malam | 100000 | 1 | checked-in | [checkin] [checkout] [edit] [hapus]
   3| Soimah | 125 | 10 Malam | 1000000 | 3 | checked-out | [checkin] [checkout] [edit] [hapus]

8. Untuk `edit` pengunjung hanya dapat memperpanjang `duration` menginap dan pindah kamar (`roomNumber`) saja
9. Untuk `checked-in` akan merubah `Status Pemesanan` menjadi `checked-in` dengan menampilkan `displayAlert` sebagai berikut :
   ```text
   Tamu {name} sudah check-in pada kamar {roomNumber}.
   ```
10. Untuk `check-out` akan merubah `Status Pemesanan` menjadi `checked-out` dengan menampilkan `displayAlert` sebagai berikut :
    ```text
    Tamu {name} sudah check-out pada kamar {roomNumber}.
    ```
11. Untuk `hapus` dapat dilakukan jika `Status Pemesanan` adalah `checked-out`, jika status masih `reserved` atau `checked-in` akan menampilkan `displayAlert` sebagai berikut :

    ```text
      Data pemesanan tidak dapat di hapus karena tamu {name} belum checkout.
    ```

12. Format Form
    Label | Input Type | Validation
    --- | --- | ---
    Nama Tamu | text | required
    Email Tamu | text | required
    No Handphone Tamu | text | required
    Nomor Kamar | number | required
    Lama Menginap | number | required
    Jumlah Tamu | number | required
