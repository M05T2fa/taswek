import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service'; 

@Component({
  selector: 'app-proudct-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './proudct-details.html',
  styleUrl: './proudct-details.css'
})
export class ProudctDetails implements OnInit {
  private _route = inject(ActivatedRoute);
  private _http = inject(HttpClient);
  private _cartService = inject(CartService); 

  product = signal<any>(null);

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._http.get(`https://fakestoreapi.com/products/${id}`).subscribe({
        next: (data) => this.product.set(data),
        error: (err) => console.error(err)
      });
    }
  }

  
  addToCart() {
    if (this.product()) {
      this._cartService.addToCart(this.product());
      alert('Done! Added to cart 🛒'); 
    }
  }
}