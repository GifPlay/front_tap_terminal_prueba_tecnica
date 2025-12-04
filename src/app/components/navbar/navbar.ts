import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  logout() {
    this.authService.logout();
    this.snackBar.open('Cerrando sesión', 'Cerrar', { duration: 3000 });
     this.router.navigate(['/']);
  }
}
