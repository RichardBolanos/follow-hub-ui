import { Component, inject }     from '@angular/core';
import { Router, RouterModule }   from '@angular/router';
import { ReactiveFormsModule,
         FormBuilder,
         Validators }             from '@angular/forms';
import { CommonModule }            from '@angular/common';
import { tap }                     from 'rxjs/operators';
import { HotToastService }         from '@ngxpert/hot-toast';
import { AuthService }             from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb          = inject(FormBuilder);
  private authService = inject(AuthService);
  private toast       = inject(HotToastService);
  private router      = inject(Router);

  public loginForm = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  public loading = false;

  public onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;
    const { email, password } = this.loginForm.value;
    this.authService.loginApi(email!, password!)
      .pipe(
        tap(() => this.loading = false),
        this.toast.observe({
          loading: 'Iniciando sesión...',
          success: 'Sesión iniciada',
          error: 'Error al iniciar sesión'
        })
      )
      .subscribe({
        next: ({ token, roles }) => {
          this.authService.login(token, roles);
          this.router.navigate(['/dashboard']);
        },
        error: () => (this.loading = false)
      });
  }
}
