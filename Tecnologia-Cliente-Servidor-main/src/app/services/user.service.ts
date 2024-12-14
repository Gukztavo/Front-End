import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

interface User {
  email: string;
  senha: string;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUserData(email: string) {
    throw new Error('Method not implemented.');
  }
  public apiUrl = environment.api_url + '/usuarios'; // Base URL para buscar usuários

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    const token = sessionStorage.getItem('auth-token'); // Obtém o token armazenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<User[]>(`${this.apiUrl}`, { headers });
  }
  getUserByEmail(email: string): Observable<User> {
    const token = sessionStorage.getItem('auth-token'); // Obtém o token armazenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Faz a solicitação GET para /usuarios/{email}
    return this.http.get<User>(`${this.apiUrl}/${email}`, { headers });
  }

  // Atualiza usuário
  updateUser(email: string, user: any): Observable<any> {
    const token = sessionStorage.getItem('auth-token'); // Obtem o token do armazenamento
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<any>(`${this.apiUrl}/${email}`, user, { headers });
  }


  deleteUsuario(email: string): Observable<void> {
    const token = sessionStorage.getItem('auth-token'); // Obtem o token do armazenamento
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<void>(`${this.apiUrl}/${email}`,{headers});

  }
}
