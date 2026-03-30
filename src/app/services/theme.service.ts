import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  isDarkMode = signal<boolean>(localStorage.getItem('user-theme') === 'dark');

  constructor() {
    effect(() => {
      const mode = this.isDarkMode() ? 'dark' : 'light';
      localStorage.setItem('user-theme', mode);
      document.documentElement.setAttribute('data-bs-theme', mode);
    });
  }

  toggleTheme() {
    this.isDarkMode.update(val => !val);
  }
}