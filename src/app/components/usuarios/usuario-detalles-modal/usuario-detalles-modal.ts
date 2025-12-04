import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-usuario-detalle-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './usuario-detalles-modal.html',
  styleUrls: ['./usuario-detalles-modal.css']
})
export class UsuarioDetallesModal {
  constructor(
    private dialogRef: MatDialogRef<UsuarioDetallesModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
     console.log('Datos recibidos en el modal:', data);
  }

  cerrar() {
    this.dialogRef.close();
  }
}