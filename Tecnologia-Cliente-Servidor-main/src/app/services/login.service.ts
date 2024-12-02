import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode'; // Importando a biblioteca para decodificar o JWT

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://10.20.8.35:22222"

  constructor(private httpClient: HttpClient) { }
//preciso pegar o email doi jwt
  login(email: string, senha: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/login", { email, senha }).pipe(
      tap((value) => {
        console.log('LoginResponse value:', value); // Verifique se o valor está correto
        sessionStorage.setItem("auth-token", value.token)

      })
    )
  }

  signup(nome: string, email: string, senha: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/usuarios", { nome, email, senha }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
      })
    )
  }
    // Método para obter o e-mail do JWT
    getEmailFromToken(): string | null {
      const token = sessionStorage.getItem("auth-token");
      if (!token) {
        console.warn("Token não encontrado");
        return null;
      }
      try {
        const decodedToken: any = jwtDecode(token); // Decodificando o token
        return decodedToken.email; // Retorna o e-mail do token
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
      }
    }
}
