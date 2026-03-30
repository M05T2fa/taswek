import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  public _cartService = inject(CartService);
  private _router = inject(Router);
  public _themeService = inject(ThemeService);
  onLogout() {

    localStorage.removeItem('userToken');


    this._router.navigate(['/login']);


    console.log('User logged out');
  }
}