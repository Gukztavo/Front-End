import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent
    // outros módulos
  ],

})
export class HomeComponent implements OnInit {
  usuario: any = null; // Armazena os dados do usuário logado
  emailUsuario: string | null = null;

  constructor(private UserService: UserService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.emailUsuario = this.loginService.getEmailFromToken(); // Supõe que o email do usuário é armazenado como 'username'
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
