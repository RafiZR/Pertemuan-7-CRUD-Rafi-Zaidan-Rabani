import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMhsPage } from './edit-mhs.page';

describe('EditMhsPage', () => {
  let component: EditMhsPage;
  let fixture: ComponentFixture<EditMhsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMhsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
