import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-reset-password',
  templateUrl: './reset-password.html'

})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  email!: string;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  reset() {
    if (this.form.invalid) return;

    this.auth.resetPassword(
      this.email,
      this.token,
      this.form.value.password,
      this.form.value.password_confirmation
    ).subscribe({
      next: () => {
        this.snack.open('Contraseña actualizada', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: () => this.snack.open('Error al actualizar contraseña', 'Cerrar', { duration: 3000 })
    });
  }
}