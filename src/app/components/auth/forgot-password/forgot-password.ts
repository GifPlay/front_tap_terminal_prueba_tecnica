import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html'
})
export class ForgotPasswordComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private snack: MatSnackBar) {
    this.form = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]]
    });
  }

  enviar() {
    console.log(this.form.value);
    if (this.form.invalid) return;
    this.auth.forgotPassword(this.form.value.usuario).subscribe({
      next: () => this.snack.open('Correo enviado, revisa tu bandeja', 'Cerrar', { duration: 3000 }),
      error: () => this.snack.open('Error al enviar correo', 'Cerrar', { duration: 3000 })
    });
  }
}