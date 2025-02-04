import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface Aviso {
  id: number;
  idCategoria?: number;
  descricao?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AvisoService {
  apiUrl: string = environment.api_url;

  constructor(private http: HttpClient) { }

  getAvisosPorCategoria(idCategoria: number): Observable<Aviso[]> {
    const token = sessionStorage.getItem('auth-token'); // Obtem o token do armazenamento
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Aviso[]>(`${this.apiUrl}/avisos/${idCategoria}`, { headers });
  }

  criarAviso(aviso: Omit<Aviso, 'id'>): Observable<Aviso> {
    return this.http.post<Aviso>(`${this.apiUrl}/avisos`, aviso);
  }

  atualizarAviso(id: number, aviso: Omit<Aviso, 'id'>): Observable<Aviso> {
    return this.http.put<Aviso>(`${this.apiUrl}/avisos/${id}`, aviso);
  }

  excluirAviso(id: number): Observable<void> {
    const token = sessionStorage.getItem('auth-token'); // Obtem o token do armazenamento
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<void>(`${this.apiUrl}/avisos/${id}`,{ headers });
  }
}
