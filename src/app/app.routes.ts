import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth.guard';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },

  { path: 'login', component: Login },
  {
    path: 'register',
    component: Register
  },

  {
    path: 'home',
    component: Home,
    canActivate: [authGuard]
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/proudct-details/proudct-details').then(m => m.ProudctDetails),
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    component: Cart,
    canActivate: [authGuard]
  },

  { path: 'checkout', component: Checkout, canActivate: [authGuard] },

  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },

];