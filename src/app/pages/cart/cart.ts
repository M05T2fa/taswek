import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  public _cartService = inject(CartService);


  getTotalPrice() {
    return this._cartService.cartItems().reduce((acc, item) => acc + item.price, 0);
  }


  removeItem(id: number) {
    this._cartService.cartItems.update(items => items.filter(i => i.id !== id));
  }

  clearAll() {
    const confirmClear = confirm(" Do you want to remove the basket completely?🗑️");
    if (confirmClear) {
      this._cartService.cartItems.set([]);
    }
  }
}