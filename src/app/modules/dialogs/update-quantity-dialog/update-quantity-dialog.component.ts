import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'update-quantity-dialog',
  templateUrl: './update-quantity-dialog.component.html',
  styleUrls: ['./update-quantity-dialog.component.scss'],
})
export class UpdateQuantityDialogComponent implements OnInit {
  product: Product;
  updateQuantityForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private productData: any) {
    this.product = this.productData.product;
    this.updateQuantityForm = new FormGroup({
      quantity: new FormControl(this.product.quantity, [Validators.required]),
      bufferQuantity: new FormControl(this.product.bufferQuantity, [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {}
}
