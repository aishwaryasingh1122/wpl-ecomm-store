import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'manage-address-dialog',
  templateUrl: './manage-address-dialog.component.html',
  styleUrls: ['./manage-address-dialog.component.scss'],
})
export class ManageAddressDialogComponent implements OnInit {
  address: Address;
  action: string = 'add';

  addressForm?: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any) {
    this.address = this.dialogData.address;
    this.action = this.dialogData.action;
    this.initAddressForm();
  }

  ngOnInit(): void {}

  initAddressForm() {
    this.addressForm = new FormGroup({
      name: new FormControl(this.address?.name ?? '', [Validators.required]),
      mobile: new FormControl(this.address?.mobile ?? '', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      apartment: new FormControl(this.address?.apartment ?? '', [
        Validators.required,
      ]),
      addressLine1: new FormControl(this.address?.addressLine1 ?? '', [
        Validators.required,
      ]),
      addressLine2: new FormControl(this.address?.addressLine2 ?? '', []),
      pincode: new FormControl(this.address?.pincode ?? '', [
        Validators.required,
      ]),
      deliveryInstructions: new FormControl(
        this.address?.deliveryInstructions ?? '',
        []
      ),
    });
  }
}
