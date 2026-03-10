import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark = signal(localStorage.getItem('theme') === 'dark');

  constructor() {
    // Apply saved theme on startup
    document.documentElement.classList.toggle('dark', this.isDark());
  }

  toggle() {
    this.isDark.update((v) => !v);
    document.documentElement.classList.toggle('dark', this.isDark());
    localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
  }
}
