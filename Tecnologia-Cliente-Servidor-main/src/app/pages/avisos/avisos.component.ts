import { Component, OnInit } from '@angular/core';
import { Aviso, AvisoService } from '../../services/avisos.service';
import { Category, CategoryService } from '../../services/category.service';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    FormsModule,
    CommonModule,
  ],
})
export class AvisosComponent implements OnInit {
  avisos: Aviso[] = [];
  categorias: Category[] = [];
  idCategoriaSelecionada: number | null = null;
  novoAvisoDescricao: string = '';
  avisoEditando: Aviso | null = null;
  errorMessage: string = '';
  admin: boolean = false; // Define o estado de administrador


  constructor(private avisoService: AvisoService, private categoryService: CategoryService) { }


  ngOnInit(): void {
    this.carregarCategorias();
    this.checkAdmin();
  }

  carregarCategorias() {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categorias = data),
      error: () => (this.errorMessage = 'Erro ao carregar categorias.'),
    });
  }

  carregarAvisos() {
    if (!this.idCategoriaSelecionada) return;
    console.log(this.idCategoriaSelecionada);
    this.avisoService.getAvisosPorCategoria(this.idCategoriaSelecionada).subscribe({
      next: (avisos) => (this.avisos = avisos),
      error: () => (this.errorMessage = 'Erro ao buscar avisos.'),
    });
  }

  adicionarAviso() {
    if (!this.novoAvisoDescricao.trim() || !this.idCategoriaSelecionada) return;

    const novoAviso = {
      idCategoria: this.idCategoriaSelecionada,
      descricao: this.novoAvisoDescricao,
    };

    this.avisoService.criarAviso(novoAviso).subscribe({
      next: (aviso) => {
        this.avisos.push(aviso);
        this.novoAvisoDescricao = '';
      },
      error: () => (this.errorMessage = 'Erro ao adicionar aviso.'),
    });
  }

  editarAviso(aviso: Aviso) {
    this.avisoEditando = { ...aviso };
  }

  salvarEdicao() {
    if (!this.avisoEditando) return;

    const { id, descricao, idCategoria } = this.avisoEditando;
    this.avisoService.atualizarAviso(id, { idCategoria, descricao }).subscribe({
      next: () => {
        this.avisos = this.avisos.map((a) =>
          a.id === id ? { ...a, descricao } : a
        );
        this.avisoEditando = null;
      },
      error: () => (this.errorMessage = 'Erro ao atualizar aviso.'),
    });
  }

  excluirAviso(id: number) {
    this.avisoService.excluirAviso(id).subscribe({
      next: () => {
        this.avisos = this.avisos.filter((a) => a.id !== id);
      },
      error: () => (this.errorMessage = 'Erro ao excluir aviso.'),
    });
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
}
