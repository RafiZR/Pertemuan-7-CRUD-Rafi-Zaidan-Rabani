import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

import { DataMahasiswaService } from '../services/data-mahasiswa.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // 🔥 INI KUNCI UTAMA
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonButtons,
    IonBackButton
  ]
})
export class DetailPage implements OnInit {

  idMahasiswa: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataMahasiswaService,
    private alertController: AlertController,
    private router: Router
  ) {
    addIcons({ trash });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.idMahasiswa = id ? Number(id) : null;
  }

  async konfirmasiHapus() {
    if (!this.idMahasiswa) return;

    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: 'Yakin ingin menghapus data mahasiswa ini?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: async () => {
            await this.dataService.hapusData(this.idMahasiswa!);
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });

    await alert.present();
  }
}
