import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  newProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    unit: new FormControl('', [Validators.required]),
    rate: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    imageData: new FormControl('', [Validators.required]),
  });
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}
}
