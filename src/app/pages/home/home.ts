import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private _http = inject(HttpClient);
  public _cartService = inject(CartService);

  
  products = signal<any[]>([]);
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('All');

  
  categories = ['All', "electronics", "jewelery", "men's clothing", "women's clothing"];

  
  filteredProducts = computed(() => {
    let items = this.products();
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();

    if (category !== 'All') {
      items = items.filter(p => p.category === category);
    }

    if (query) {
      items = items.filter(p => p.title.toLowerCase().includes(query));
    }

    return items;
  });

  ngOnInit() {
    this._http.get<any[]>('https://fakestoreapi.com/products').subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('API Error:', err)
    });
  }

  onSearch(event: any) {
    this.searchQuery.set(event.target.value);
  }

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  addToCart(product: any) {
    this._cartService.addToCart(product);
  }
}