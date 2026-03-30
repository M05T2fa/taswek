import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  private getInitialCart() {
    const savedCart = localStorage.getItem('tasweaka_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  
  cartItems = signal<any[]>(this.getInitialCart());

  constructor() {
   
    effect(() => {
      localStorage.setItem('tasweaka_cart', JSON.stringify(this.cartItems()));
    });
  }

  
  addToCart(product: any) {
    this.cartItems.update(items => [...items, product]);
  }

  
  removeItem(id: number) {
    this.cartItems.update(items => items.filter(i => i.id !== id));
  }

  
  clearCart() {
    this.cartItems.set([]); 
  }
}