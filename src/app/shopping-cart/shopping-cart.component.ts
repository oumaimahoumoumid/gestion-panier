// shopping-cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

interface CartItem {
  product: any;
  quantity: number;
}

@Component({
  selector: 'app-shopping-cart',
  template: `
    <h2>Shopping Cart</h2>
    <ul>
      <li *ngFor="let item of cartItems">
        {{ item.product.name }} - Quantity: {{ item.quantity }}
        <button (click)="updateQuantity(item.product, 1)">+</button>
        <button (click)="updateQuantity(item.product, -1)">-</button>
        <button (click)="removeFromCart(item.product)">Remove</button>
      </li>
    </ul>
  `,
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart;
    });
  }

  updateQuantity(product: any, quantityChange: number): void {
    this.cartService.updateQuantity(product, quantityChange);
  }

  removeFromCart(product: any): void {
    this.cartService.removeFromCart(product);
  }
}
