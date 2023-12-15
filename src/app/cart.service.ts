// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  product: any;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(product: any): void {
    const existingItem = this.cart.find((item) => item.product === product);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }

    this.cartSubject.next([...this.cart]);
  }

  getCartItems(): CartItem[] {
    return this.cart;
  }

  updateQuantity(product: any, quantityChange: number): void {
    const item = this.cart.find((cartItem) => cartItem.product === product);

    if (item) {
      item.quantity += quantityChange;

      if (item.quantity === 0) {
        this.removeFromCart(product);
      }
    }

    this.cartSubject.next([...this.cart]);
  }

  removeFromCart(product: any): void {
    this.cart = this.cart.filter((item) => item.product !== product);
    this.cartSubject.next([...this.cart]);
  }
}
