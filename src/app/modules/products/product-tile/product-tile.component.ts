import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss'],
})
export class ProductTileComponent implements OnInit {
  @Input('product') product?: Product;

  @Output('addToCart') addToCart = new EventEmitter();
  productHovered?: string;

  constructor() {}

  ngOnInit(): void {}

  addItemToCart() {
    this.addToCart.emit(this.product);
  }
}
