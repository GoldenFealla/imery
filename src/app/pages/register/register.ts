import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

// Models
import { RegisterForm } from '@models/auth';

// Services
import { AuthService } from '@services/auth';

// Spartan
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';

// shared
import { minDelayResult } from '@shared/rxjs/min-delay.operator';

// Icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import googleIcon from '@iconify/icons-logos/google-icon';
import githubIcon from '@iconify/icons-logos/github-icon';

// Shared
import { iconifyToNgIcons } from '@shared/icon/iconify';

@Component({
  viewProviders: [provideIcons({ ...iconifyToNgIcons({ googleIcon, githubIcon }) })],
  imports: [
    NgIcon,
    RouterLink,
    ReactiveFormsModule,

    HlmCardImports,
    HlmFieldImports,
    HlmInputImports,
    HlmInputGroupImports,
    HlmButtonImports,
    HlmSeparatorImports,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  private readonly _fb = inject(FormBuilder);

  public form = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public isLoading = signal<boolean>(false);
  public error: string | null = null;

  ngOnInit() {
    let token = this.authService.Token();
    console.log(token);
    if (token) {
      this.router.navigate(['/']);
    }
  }

  submit() {
    console.log(this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.error = null;

    this.authService
      .Register(this.form.value as RegisterForm)
      .pipe(
        minDelayResult(500),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe((res) => {
        if (!res.success) {
          this.error = res.error ?? 'Invalid email or password';
          return;
        }

        this.router.navigate(['/']);
      });
  }

  loginWithGoogle() {
    this.authService.LoginWithGoogle();
  }

  loginWithGithub() {
    this.authService.LoginWithGithub();
  }
}
