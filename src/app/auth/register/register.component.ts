import { Component, inject }                           from '@angular/core';
import { CommonModule }                                from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule }                                from '@angular/router';
import { Store }                                       from '@ngrx/store';
import { authFeature }                                 from '../../core/store/auth/auth.feature';
import { register }                                    from '../../core/store/auth/auth.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private fb    = inject(FormBuilder);
  private store = inject(Store);

  public registerForm = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  public loading$ = this.store.select(authFeature.selectLoading);
  public error$   = this.store.select(authFeature.selectError);

  public onSubmit(): void {
    if (this.registerForm.invalid) return;
    const { email, password } = this.registerForm.value;
    this.store.dispatch(register({ email: email!, password: password! }));
  }
}
