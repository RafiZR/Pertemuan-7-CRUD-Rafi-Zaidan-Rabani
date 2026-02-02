import { TestBed } from '@angular/core/testing';

import { DataMahasiswaService  } from './data-mahasiswa.service';

describe('DataMahasiswaService ', () => {
  let service: DataMahasiswaService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMahasiswaService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
