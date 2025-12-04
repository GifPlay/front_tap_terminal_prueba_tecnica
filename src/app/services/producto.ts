import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://tapterminal.test/api/productos';
   private apiUrlExport = 'http://tapterminal.test/api/export';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProductos(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(this.apiUrl, { headers });
  }

  getProductoById(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  createProducto(producto: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, producto, { headers });
  }

  updateProducto(id: number, producto: any): Observable<any> {
    console.log('Updating producto with id:', id, 'and data:', producto);
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/${id}`, producto, { headers });
  }

  deleteProducto(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  getProductosExcel(): Observable<Blob> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrlExport}/productos/excel`, { headers, responseType: 'blob' });
  }
  getProductosPdf(): Observable<Blob> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrlExport}/productos/pdf`, { headers, responseType: 'blob' });
  }

}