import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
 imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
],
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar,private router: Router,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  login() {
    
    if (this.loginForm.valid) {
     const email = this.loginForm.get('email')?.value ?? '';
     const password = this.loginForm.get('password')?.value ?? '';

      
      this.authService.login(email, password).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        this.snackBar.open('Iniciando sesión', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/productos']);
      },
      error: () => this.snackBar.open('Credenciales inválidas', 'Cerrar', { duration: 3000 })
    });

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  logout() {
    this.authService.logout();
    alert('Sesión cerrada');
  }

  forgetPassword() {
   this.router.navigate(['/forgot-password']);
  }
}

