import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PerfilDetallesModal } from './perfil-detalles-modal/perfil-detalles-modal';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.html',
  standalone: true,
  imports: [CommonModule, MatTableModule],
})
export class PerfilesComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['codigo', 'nombre', 'seccionesPermitidas', 'updated_at', 'acciones'];

  constructor(private perfilService: PerfilService, private snack: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() {
    this.getPerfiles();
  }

  getPerfiles() {
    this.perfilService.getPerfiles().subscribe({
      next: (res) => this.dataSource.data = res,
      error: () => this.snack.open('No se ha encontrado ningún perfil', 'Cerrar', { duration: 3000 })
    });
  }

  verDetalle(id: number) {
    this.perfilService.getPerfilById(id).subscribe({
      next: (res) => {
        this.dialog.open(PerfilDetallesModal, { width: '520px', data: res });
      },
      error: () => this.snack.open('Error al obtener el detalle', 'Cerrar', { duration: 3000 })
    });
  }

  exportarExcel() {
    this.perfilService.exportExcel().subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = `perfiles-${new Date().toDateString()}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => this.snack.open('Error al exportar Excel', 'Cerrar', { duration: 3000 })
    });
  }

  exportarPdf() {
    this.perfilService.exportPdf().subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = `perfiles-${new Date().toDateString()}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => this.snack.open('Error al exportar PDF', 'Cerrar', { duration: 3000 })
    });
  }
}