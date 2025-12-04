import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class PerfilService {
  private apiUrl = 'http://tapterminal.test/api/perfiles';
  private apiUrlExport = 'http://tapterminal.test/api/export';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getPerfiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers() });
  }

  getPerfilById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers() });
  }

  createPerfil(perfil: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, perfil, { headers: this.headers() });
  }

  updatePerfil(id: number, perfil: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, perfil, { headers: this.headers() });
  }

  deletePerfil(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.headers() });
  }

  exportExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrlExport}/perfiles/excel`, { headers: this.headers(), responseType: 'blob' });
  }

  exportPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrlExport}/perfiles/pdf`, { headers: this.headers(), responseType: 'blob' });
  }
}