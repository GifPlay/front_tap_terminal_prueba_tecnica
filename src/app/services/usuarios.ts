import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://tapterminal.test/api/usuarios';
  private apiUrlExport = 'http://tapterminal.test/api/export';
  private apiUrlFoto = 'http://tapterminal.test/api/foto';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  getUsuarioById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario, { headers: this.getHeaders() });
  }

  updateUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario, { headers: this.getHeaders() });
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getUsuariosExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrlExport}/usuarios/excel`, { headers: this.getHeaders(), responseType: 'blob' });
  }

  getUsuariosPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrlExport}/usuarios/pdf`, { headers: this.getHeaders(), responseType: 'blob' });
  }

  uploadFotoPerfil(id: number, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('fotoPerfil', file);

  const token = this.authService.getToken();
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  return this.http.post(`${this.apiUrlFoto}/usuarios/${id}`, formData, { headers });
}
  
}
