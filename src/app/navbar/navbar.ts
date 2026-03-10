import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// Services
import { ThemeService } from '@services/theme';

// Icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLayoutTemplate, lucideMoon, lucideSun, lucidePlus } from '@ng-icons/lucide';

// Spartan
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIcon,
    HlmButtonImports,
    HlmIconImports,
    HlmSeparatorImports,
    HlmAvatarImports,
  ],
  providers: [provideIcons({ lucideLayoutTemplate, lucideMoon, lucideSun, lucidePlus })],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private theme = inject(ThemeService);
  isDark = this.theme.isDark;

  toggleTheme() {
    this.theme.toggle();
  }
}
