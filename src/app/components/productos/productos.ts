import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProductoModal } from './producto-modal/producto-modal';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.html',
  standalone: true,
  imports: [CommonModule, MatTableModule],

})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['codigo','producto','marca', 'precio','updated_at', 'acciones'];

  constructor(private productoService: ProductoService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit() {
   this.getProductos();
  }

  nuevoProducto() {
    this.abrirModal();
  }

  getProductos() {
    this.productoService.getProductos().subscribe({
      next: (res) => { this.dataSource.data = res; console.log(res)  },
      error: () =>  this.snackBar.open('No se ha encontrado ningun producto', 'Cerrar', { duration: 3000 })
    });
  }

  getProducto(id: number) {
    this.productoService.getProductoById(id).subscribe({
      next: (res) => {
        const dialogRef = this.dialog.open(ProductoModal, {
        width: '400px',
        data: res
      });
        },
      error: () =>  this.snackBar.open('Error al obtener el producto', 'Cerrar', { duration: 3000 })
    });
  }
  getProductosExcel() {
    this.productoService.getProductosExcel().subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        const date = new Date().toDateString();
        a.target = '_blank';
        a.href = url;
        a.download = 'productos'+date+'.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
       console.error('Error al descargar el archivo');
      }
    });
  }

   getProductosPdf() {
    this.productoService.getProductosPdf().subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        const date = new Date().toDateString();
        a.target = '_blank';
        a.href = url;
        a.download = 'productos'+date+'.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
       console.error('Error al descargar el archivo');
      }
    });
  }

    abrirModal(producto?: any) {
    const dialogRef = this.dialog.open(ProductoModal, {
      width: '500px',
        data: producto ? { ...producto } : {}
    });


   dialogRef.afterClosed().subscribe((result) => {
  if (result?.action) {
    this.getProductos();
  }
});


  }


}