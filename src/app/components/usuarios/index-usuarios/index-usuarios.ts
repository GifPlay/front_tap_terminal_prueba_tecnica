import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuarios';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioModal } from '../usuario-modal/usuario-modal';
import { UsuarioDetallesModal } from '../usuario-detalles-modal/usuario-detalles-modal';

@Component({
  selector: 'app-usuarios',
  templateUrl: './index-usuarios.html',
  standalone: true,
  imports: [CommonModule, MatTableModule],
})
export class IndexUsuarios implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['codigo','usuario','nombre', 'telefono', 'role', 'updated_at', 'acciones'];

  constructor(private usuarioService: UsuarioService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() {
    this.getUsuarios();
  }

  nuevoUsuario() {
    this.abrirModal();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (res) => { this.dataSource.data = res; },
      error: () => this.snackBar.open('No se ha encontrado ningún usuario', 'Cerrar', { duration: 3000 })
    });
  }

  getUsuario(id: number) {
    this.usuarioService.getUsuarioById(id).subscribe({
      next: (res) => {
        this.dialog.open(UsuarioModal, {
          width: '500px',
          data: res
        });
      },
      error: () => this.snackBar.open('Error al obtener el usuario', 'Cerrar', { duration: 3000 })
    });
  }

  getUsuariosExcel() {
    this.usuarioService.getUsuariosExcel().subscribe({
      next: (data: Blob) => {
         this.snackBar.open('Procesando petición espere un momento', 'Cerrar', { duration: 3000 })
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = `usuarios-${new Date().toDateString()}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }

  getUsuariosPdf() {
    this.usuarioService.getUsuariosPdf().subscribe({
      next: (data: Blob) => {
        this.snackBar.open('Procesando petición espere un momento', 'Cerrar', { duration: 3000 })
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = `usuarios-${new Date().toDateString()}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }

  abrirModal(usuario?: any) {
    const dialogRef = this.dialog.open(UsuarioModal, {
      width: '500px',
      data: usuario ? { ...usuario } : {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action) {
        this.getUsuarios();
      }
    });
  }

 verDetalle(usuario: any) {
  this.usuarioService.getUsuarioById(usuario).subscribe({
    next: (res) => {
      this.dialog.open(UsuarioDetallesModal, {
        width: '500px',
        data: res 
      });
    },
    error: () => this.snackBar.open('Error al obtener el usuario', 'Cerrar', { duration: 3000 })
  });
}

}