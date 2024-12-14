import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Category, CategoryService } from '../../services/category.service';

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
  selectedCategory: Category = { id: 0, nome: '' };  // Para editar
  newCategory: string = ''; // Para criar

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
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
    if (this.selectedCategory?.id && this.selectedCategory?.nome) {
      const categoryId = this.selectedCategory.id;
      const updatedData = { nome: this.selectedCategory.nome };

      this.categoryService.updateCategory(categoryId, updatedData).subscribe({
        next: (updatedCategory) => {
          console.log('Categoria atualizada:', updatedCategory);
          this.loadCategories(); // Recarrega as categorias
          // Reseta o formulário
        },
        error: (err) => {
          console.error('Erro ao atualizar a categoria:', err);
        },
      });
    }
  }


  deleteCategory(id: number): void {
    if (confirm('Tem certeza de que deseja excluir esta categoria?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.categories = this.categories.filter((c) => c.id !== id);
        },
        error: (error) => console.error('Erro ao excluir categoria:', error),
      });
    }
  }

}
