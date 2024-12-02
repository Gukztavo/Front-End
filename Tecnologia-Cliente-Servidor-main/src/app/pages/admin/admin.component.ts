import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  users: any[] = []; // Lista de usuários
  selectedUser: any = null; // Usuário selecionado para edição
  isModalOpen: boolean = false;
  errorMessage: string | null = null; // Mensagem de erro para exibição

  loggedInUserEmail: string = sessionStorage.getItem('user-email') || '';
  loggedInUserRole: string = sessionStorage.getItem('user-role') || ''; // Exemplo: "admin" ou "user"

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
      this.fetchUsers(); // Carrega os usuários para admins

  }

  fetchUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      },
    });
  }

  editUser(user: any) {
    this.selectedUser = { ...user }; // Faz uma cópia do usuário selecionado
    this.isModalOpen = true; // Abre o modal de edição
  }

  saveUser() {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.email, this.selectedUser).subscribe({
        next: () => {
          this.fetchUsers(); // Atualiza a lista após salvar
          this.closeModal();
        },
        error: (err) => {
          console.error('Erro ao atualizar usuário:', err);
        },
      });
    }
  }

  deleteUser(email: string) {
    this.userService.deleteUsuario(email).subscribe({
      next: () => {
        alert(`Usuário com email ${email} excluído com sucesso.`);
        this.fetchUsers(); // Atualiza a lista após a exclusão
      },
      error: (err) => {
        console.error('Erro ao excluir usuário:', err);
        alert('Erro ao excluir usuário.');
      }
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedUser = null;
  }
}
