import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginForm } from '../../models/login-form.model';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
  ],
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: NonNullableFormBuilder, private router: Router) {}

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.validateLogin(this.loginForm.getRawValue());
  }

  validateLogin(loginForm: LoginForm) {
    if (loginForm.username == 'prueba' && loginForm.password == '1234') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
