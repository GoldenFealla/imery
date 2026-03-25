import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

// Services
import { ThemeService } from '@services/theme';

// Icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLayoutTemplate, lucideMoon, lucideSun, lucidePlus, lucideLogOut } from '@ng-icons/lucide';

// Spartan
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmMenubarImports } from '@spartan-ng/helm/menubar';
import { AuthService } from '@services/auth';

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
    HlmDropdownMenuImports,
    HlmMenubarImports,
  ],
  providers: [provideIcons({ lucideLayoutTemplate, lucideMoon, lucideSun, lucidePlus, lucideLogOut })],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);

  private theme = inject(ThemeService);
  private authService = inject(AuthService);

  userPayload = this.authService.Payload();

  isDark = this.theme.isDark;

  toggleTheme() {
    this.theme.toggle();
  }

  logout() {
    console.log('logout');
    this.authService.Logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
