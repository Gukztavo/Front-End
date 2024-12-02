import { CommonModule } from '@angular/common';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone: true,
  imports: [
    CommonModule,
    // outros módulos
  ],

})
export class UserComponent implements OnInit {
  usuario: any = null; // Armazena os dados do usuário logado
  emailUsuario: string | null = null;

  constructor(private UserService: UserService) { }

  ngOnInit(): void {
    this.emailUsuario = sessionStorage.getItem('username'); // Supõe que o email do usuário é armazenado como 'username'
    console.log('Email do usuário:', this.emailUsuario);

    if (this.emailUsuario) {
      this.UserService.getUserByEmail(this.emailUsuario).subscribe(
        (data) => {
          this.usuario = data;
          console.log('Usuário logado:', this.usuario);
        },
        (error) => {
          console.error('Erro ao obter dados do usuário:', error);
        }
      );
    } else {
      console.error('Email do usuário não encontrado na sessão.');
    }
  }
}
