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
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private fb          = inject(FormBuilder);
  private authService = inject(AuthService);
  private toast       = inject(HotToastService);
  private router      = inject(Router);

  public registerForm = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  public loading = false;

  public onSubmit(): void {
    if (this.registerForm.invalid) return;
    this.loading = true;
    const { email, password } = this.registerForm.value;
    this.authService.registerApi(email!, password!)
      .pipe(
        tap(() => this.loading = false),
        this.toast.observe({
          loading: 'Registrando...',
          success: 'Registrado correctamente',
          error: 'Error al registrar'
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
