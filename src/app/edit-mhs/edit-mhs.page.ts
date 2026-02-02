import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

import { DataMahasiswaService } from '../services/data-mahasiswa.service';

@Component({
  selector: 'app-edit-mhs',
  templateUrl: './edit-mhs.page.html',
  styleUrls: ['./edit-mhs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonItem,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption
  ]
})
export class EditMhsPage implements OnInit {

  formMahasiswa!: FormGroup;
  idMahasiswa!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataService: DataMahasiswaService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.idMahasiswa = Number(this.route.snapshot.paramMap.get('id'));

    const data = await this.dataService.getDataById(this.idMahasiswa);

    this.formMahasiswa = this.fb.group({
      nama: [data?.nama, [Validators.required, Validators.minLength(3)]],
      nim: [data?.nim, [Validators.required, Validators.pattern('^[0-9]*$')]],
      jurusan: [data?.jurusan, [Validators.required]]
    });
  }

  async simpanPerubahan() {
    if (this.formMahasiswa.valid) {
      await this.dataService.updateData(
        this.idMahasiswa,
        this.formMahasiswa.value
      );

      alert('Data berhasil diperbarui');
      this.router.navigateByUrl('/home');
    }
  }
}
