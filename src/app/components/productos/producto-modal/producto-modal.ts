import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/producto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-producto-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './producto-modal.html',
  styleUrl: './producto-modal.css',
})
export class ProductoModal {
 form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductoModal>,
    private productoService: ProductoService,
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }
  

  ngOnInit() {
    this.form = this.fb.group({
      codigo: [{ value: this.data?.codigo || '', disabled: true }],
      producto: [this.data?.producto || '', Validators.required],
      marca: [this.data?.marca || '', Validators.required],
      precio: [
        this.data?.precio || '',
        [Validators.required, Validators.min(0), Validators.max(999)]
      ],
      created_at: [{ value: this.data?.created_at || '', disabled: true }],
      updated_at: [{ value: this.data?.updated_at || '', disabled: true }]
    });
  }

    guardar() {
      if (this.form.valid) {
        const producto = this.form.getRawValue();
        producto.id = this.data?.id ?? null;
        if (!producto.id) {
          // Crear nuevo producto
          this.productoService.createProducto(producto).subscribe({
            next: () => {
              this.snackBar.open('Producto creado', 'Cerrar', { duration: 3000 });
               this.dialogRef.close({ action: 'create', producto });
            },
            error: () => this.snackBar.open('Error al crear', 'Cerrar', { duration: 3000 })
          });
        } else {
          // Actualizar producto existente

        this.productoService.updateProducto(this.data.id, producto).subscribe({
              next: () => {
                this.snackBar.open('Producto actualizado', 'Cerrar', { duration: 3000 });
                 this.dialogRef.close({ action: 'update', producto });
              },
              error: () => this.snackBar.open('Error al actualizar', 'Cerrar', { duration: 3000 })
            });
          }
      }
    }

  eliminar() {
    this.productoService.deleteProducto(this.data.id).subscribe({
      next: () => {
        this.snackBar.open('Producto eliminado', 'Cerrar', { duration: 3000 });
        this.dialogRef.close({ action: 'eliminar', id: this.data?.id });
      },
      error: () => this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 3000 })
    });
    this.dialogRef.close({ action: 'eliminar', id: this.data?.id });
  }

  cerrar() {
    this.dialogRef.close();
  }


}
