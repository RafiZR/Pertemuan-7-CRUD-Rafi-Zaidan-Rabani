import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class DataMahasiswaService {

  // Key untuk penyimpanan di Preferences
  private KEY_MAHASISWA = 'data_mahasiswa_app';

  constructor() { }

  // =========================
  // FUNGSI 1: Ambil Semua Data
  // =========================
  async getData(): Promise<any[]> {
    const { value } = await Preferences.get({ key: this.KEY_MAHASISWA });
    return value ? JSON.parse(value) : [];
  }

  // =========================
  // FUNGSI 2: Tambah Data Baru
  // =========================
  async tambahData(mahasiswaBaru: any): Promise<void> {
    const dataLama = await this.getData();

    // Beri ID unik otomatis
    mahasiswaBaru.id = Date.now();

    dataLama.push(mahasiswaBaru);

    await Preferences.set({
      key: this.KEY_MAHASISWA,
      value: JSON.stringify(dataLama)
    });
  }

  // =========================
  // FUNGSI 3: Hapus Data Berdasarkan ID
  // =========================
  async hapusData(id: number): Promise<void> {
    const dataLama = await this.getData();

    // Filter data selain yang akan dihapus
    const dataBaru = dataLama.filter((item: any) => item.id !== id);

    await Preferences.set({
      key: this.KEY_MAHASISWA,
      value: JSON.stringify(dataBaru)
    });
  }

  // =========================
  // (OPSIONAL) FUNGSI 4: Ambil Data Berdasarkan ID
  // =========================
  async getDataById(id: number): Promise<any | null> {
    const data = await this.getData();
    return data.find((item: any) => item.id === id) || null;
  }

  // =========================
  // (OPSIONAL) FUNGSI 5: Hapus Semua Data
  // =========================
  async hapusSemuaData(): Promise<void> {
    await Preferences.remove({ key: this.KEY_MAHASISWA });
  }

  // =========================
  // FUNGSI UPDATE DATA
  // =========================
  async updateData(id: number, dataUpdate: any): Promise<void> {
    const dataLama = await this.getData();

    const index = dataLama.findIndex((item: any) => item.id === id);

    if (index !== -1) {
      dataLama[index] = {
        ...dataLama[index],
        ...dataUpdate,
        id // pastikan ID tidak berubah
      };

      await Preferences.set({
        key: this.KEY_MAHASISWA,
        value: JSON.stringify(dataLama)
      });
    }
  }

}
