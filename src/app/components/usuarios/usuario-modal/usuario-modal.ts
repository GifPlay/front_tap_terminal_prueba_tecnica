import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuarios';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './usuario-modal.html',
  styleUrls: ['./usuario-modal.css'],
})
export class UsuarioModal {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UsuarioModal>,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      codigo: [{ value: this.data?.codigo || '', disabled: true }],
      usuario: [this.data?.usuario || '', [Validators.required, Validators.email]],
      nombre: [this.data?.nombre || '', Validators.required],
      telefono: [this.data?.telefono || '', Validators.required],
      fotoPerfil: [this.data?.fotoPerfil || 'default.png'],
      password: ['', this.data?.id ? [] : [Validators.required, Validators.minLength(6)]],
      role: [this.data?.role || 'user', Validators.required],
      created_at: [{ value: this.data?.created_at || '', disabled: true }],
      updated_at: [{ value: this.data?.updated_at || '', disabled: true }],
    });
  }

  guardar() {
    if (this.form.valid) {
      const usuario = this.form.getRawValue();
      usuario.id = this.data?.id ?? null;

      if (!usuario.id) {
        this.usuarioService.createUsuario(usuario).subscribe({
          next: (res) => {
            if( res.code === 205 ){
              this.snackBar.open('res.message', 'Cerrar', { duration: 3000 });
            }
            this.snackBar.open('Usuario creado', 'Cerrar', { duration: 3000 });
            this.dialogRef.close({ action: 'create', usuario });
          },
          error: () => this.snackBar.open('Error al crear usuario', 'Cerrar', { duration: 3000 })
        });
      } else {
        this.usuarioService.updateUsuario(this.data.id, usuario).subscribe({
           next: (res) => {
            if( res.code === 205 ){
              this.snackBar.open('res.errors', 'Cerrar', { duration: 3000 });
            }
            this.snackBar.open('Usuario actualizado', 'Cerrar', { duration: 3000 });
            this.dialogRef.close({ action: 'update', usuario });
          },
          error: () => this.snackBar.open('Error al actualizar usuario', 'Cerrar', { duration: 3000 })
        });
      }
    }
  }

  eliminar() {
    this.usuarioService.deleteUsuario(this.data.id).subscribe({
      next: () => {
        this.snackBar.open('Usuario eliminado', 'Cerrar', { duration: 3000 });
        this.dialogRef.close({ action: 'eliminar', id: this.data?.id });
      },
      error: () => this.snackBar.open('Error al eliminar usuario', 'Cerrar', { duration: 3000 })
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.usuarioService.uploadFotoPerfil(this.data.id, file).subscribe({
      next: (res) => {
        this.data.fotoPerfil = res.fotoPerfil;
        this.snackBar.open('Foto actualizada', 'Cerrar', { duration: 3000 });
        this.cdRef.detectChanges();
      }
    });
  }
}


}