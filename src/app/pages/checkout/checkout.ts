import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  public _cartService = inject(CartService);
  private _router = inject(Router);

  
  isOrdered = signal(false);

  getTotalPrice() {
    return this._cartService.cartItems().reduce((acc, item) => acc + item.price, 0);
  }

  confirmOrder() {
   
    this.isOrdered.set(true);
    this._cartService.clearCart();
   
    setTimeout(() => {
      
      this._router.navigate(['/home']);
    }, 3000);
  }
}