import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-perfil-detalles-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './perfil-detalles-modal.html',
  styleUrls: ['./perfil-detalles-modal.css'],
})
export class PerfilDetallesModal {
  constructor(
    private dialogRef: MatDialogRef<PerfilDetallesModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cerrar() {
    this.dialogRef.close();
  }
}