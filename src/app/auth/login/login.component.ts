import { Component, inject }                           from '@angular/core';
import { CommonModule }                                from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule }                                from '@angular/router';
import { Store }                                       from '@ngrx/store';
import { authFeature }                                 from '../../core/store/auth/auth.feature';
import { login }                                       from '../../core/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb    = inject(FormBuilder);
  private store = inject(Store);

  public loginForm = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  // Selectores de estado
  public loading$ = this.store.select(authFeature.selectLoading);
  public error$   = this.store.select(authFeature.selectError);

  public onSubmit(): void {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.store.dispatch(login({ email: email!, password: password! }));
  }
}
