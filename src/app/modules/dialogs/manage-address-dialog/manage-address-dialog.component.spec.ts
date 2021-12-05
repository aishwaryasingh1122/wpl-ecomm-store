import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAddressDialogComponent } from './manage-address-dialog.component';

describe('ManageAddressDialogComponent', () => {
  let component: ManageAddressDialogComponent;
  let fixture: ComponentFixture<ManageAddressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAddressDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
