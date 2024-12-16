import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Category, CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SidebarComponent,
    FormsModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categories: Category[] = [];
  errorMessage: string = '';
  users: any[] = []; // Lista de usuários
  selectedCategory: Category = { id: 0, nome: '' };  // Para editar
  newCategory: string = ''; // Para criar
  admin: boolean = false; // Define o estado de administrador


  loggedInUserRole: string = sessionStorage.getItem('user-role') || ''; // Exemplo: "admin" ou "user"


  constructor(private categoryService: CategoryService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.checkAdmin(); // Verifica o estado de administrador
    console.log(this.admin);
  }

  // Método para carregar as categorias
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;

      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar categorias.';
        console.error('Erro:', error);
      },
    });
  }
  addCategory(): void {
    const newCategory: Category = { nome: this.newCategory };
    this.categoryService.createCategory(newCategory).subscribe({
      next: (category) => {
        this.categories.push(category);
        this.newCategory = '';
      },
      error: (error) => console.error('Erro ao criar categoria:', error),
    });
  }

  editCategory(category: Category): void {
    this.selectedCategory = { ...category };
  }


  updateCategory(): void {
    if (this.admin && this.selectedCategory?.id && this.selectedCategory?.nome) {
      const categoryId = this.selectedCategory.id;
      const updatedData = { nome: this.selectedCategory.nome };

      this.categoryService.updateCategory(categoryId, updatedData).subscribe({
        next: (updatedCategory) => {
          console.log('Categoria atualizada:', updatedCategory);
          this.loadCategories(); // Recarrega as categorias
          this.selectedCategory = { id: 0, nome: '' }; // Deseleciona a categoria
        },
        error: (err) => {
          console.error('Erro ao atualizar a categoria:', err);
        },
      });
    }
  }
  checkAdmin(): void {
    const token = sessionStorage.getItem('auth-token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log('Token decodificado:', decoded);
        this.admin = decoded.isAdmin || decoded.admin || false; // Verifica a claim corretamente
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        this.admin = false;
      }
    } else {
      console.error('Token não encontrado.');
      this.admin = false;
    }
  }

  deleteCategory(id: number): void {

    if (!this.admin) return; // Bloqueia se o usuário não for admin
    this.categoryService.deleteCategory(id).subscribe(
      () => this.loadCategories(),
      (error) => console.error(error)
    );
  }


}
