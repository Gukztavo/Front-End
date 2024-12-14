import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface Category {
  id?: number;
  nome: string;
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl: string = environment.api_url;


  constructor(private http: HttpClient) { }

  // Método para buscar todas as categorias
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + '/categorias');
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl  + '/categorias', category);
  }

  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(this.apiUrl + `/categorias/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
     const token = sessionStorage.getItem('auth-token'); // Obtem o token do armazenamento
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
    return this.http.delete<void>(`${this.apiUrl}/categorias/${id}`,{headers});
  }
}
