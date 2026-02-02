import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';

// Ionic Standalone Components
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/angular/standalone';

// Alert Controller
import { AlertController } from '@ionic/angular';

// Ionicons
import { addIcons } from 'ionicons';
import { add, trash, createOutline } from 'ionicons/icons';

// Service
import { DataMahasiswaService } from '../services/data-mahasiswa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // ✅ WAJIB untuk routerLink
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonButton,
    IonFab,
    IonFabButton,
    IonIcon
  ],
})
export class HomePage {

  dataMahasiswa: any[] = [];

  constructor(
    private dataService: DataMahasiswaService,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController
  ) {
    // Register icons
    addIcons({
      add,
      trash,
      createOutline
    });
  }

  // Dipanggil setiap halaman aktif
  async ionViewWillEnter() {
    await this.loadData();
  }

  async loadData() {
    this.dataMahasiswa = await this.dataService.getData();
    this.cdr.detectChanges();
  }

  // Konfirmasi hapus
  async konfirmasiHapus(id: number) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: 'Yakin ingin menghapus data mahasiswa ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: async () => {
            await this.dataService.hapusData(id);
            await this.loadData();
          }
        }
      ]
    });

    await alert.present();
  }
}
