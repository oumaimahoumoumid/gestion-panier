import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  template: `
    <h2>Product List</h2>
    <ul>
      <li *ngFor="let product of products">
        {{ product.name }}
        <button (click)="addToCart(product)">Add to Cart</button>
      </li>
    </ul>
  `,
})
export class ProductListComponent {
  products = [
    { name: 'Product 1', price: 10 },
    { name: 'Product 2', price: 20 },
    // ... add more products
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
