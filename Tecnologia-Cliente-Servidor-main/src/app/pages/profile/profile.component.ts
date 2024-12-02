import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SidebarComponent
  ],
})
export class ProfileComponent implements OnInit {
  user: any = {}; // Armazena as informações do usuário logado
  editUser: any = {}; // Armazena os dados para edição
  emailUsuario: string | null = null;
  usuarioEditado: any = {};  // Dados para edição


  constructor(private userService: UserService, private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.emailUsuario = this.loginService.getEmailFromToken(); // Obtém o email do token
    if (this.emailUsuario) {
      // Busca os dados do usuário com o email extraído do token
      this.userService.getUserByEmail(this.emailUsuario).subscribe(
        (data) => {
          this.user = data;
          this.usuarioEditado = { ...data }; // Preenche os campos para edição
          console.log('Usuário logado:', this.user);
          console.log('Dados para editar:', this.editUser);
        },
        (error) => {
          console.error('Erro ao obter dados do usuário:', error);
        }
      );
    } else {
      console.error('Email do usuário não encontrado na sessão.');
    }
  }


  // Carrega as informações do usuário logado

  // Método para editar os dados do usuário
  editarUsuario(): void {
    console.log('this.user:', this.user);
    console.log('this.emailUsuario:', this.emailUsuario);
    console.log('this.editUser:', this.editUser);
    console.log('editUser tem dados?', Object.keys(this.editUser).length > 0);

    // Se editUser estiver vazio, copie os dados do usuário
    if (Object.keys(this.editUser).length === 0) {
      this.editUser = { ...this.user };
    }

    if (this.user && this.emailUsuario && Object.keys(this.editUser).length > 0) {
      this.userService.updateUser(this.emailUsuario, this.editUser).pipe(
        catchError(error => {
          if (error.status === 403) {
            alert('Você não tem permissão para realizar esta operação');
          } else {
            alert('Erro ao atualizar usuário: ' + error.message);
          }
          return throwError(() => error);
        })
      ).subscribe({
        next: (data) => {
          alert('Usuário atualizado com sucesso!');
          this.user = { ...this.editUser };
        },
        error: (error) => {
          console.error('Erro ao atualizar usuário:', error);
        }
      });
    } else {
      let mensagemErro = 'Dados inválidos para atualização:\n';
      if (!this.user) mensagemErro += '- Usuário não encontrado\n';
      if (!this.emailUsuario) mensagemErro += '- Email não informado\n';
      if (Object.keys(this.editUser).length === 0) mensagemErro += '- Nenhum dado para atualizar\n';

      alert(mensagemErro);
      console.error(mensagemErro);
    }
  }


  // Método para excluir a conta do usuário
  excluirUsuario(): void {
    if (confirm('Tem certeza de que deseja excluir sua conta?')) {
      this.userService.deleteUsuario(this.user.email).subscribe(() => {
        alert('Conta excluída!');
        this.router.navigate(['/login']); // Redireciona para o login
      });
    }
  }
}
