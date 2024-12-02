import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) { }
  userEmail: string | null = null;
  isAdmin: boolean = false;

  ngOnInit(): void {
    // this.checkUserRole();
    this.checkIfAdmin();
  }
  // checkUserRole(): void {
  //   const adminEmail= sessionStorage.getItem('admin-email');
  //   const userRole = sessionStorage.getItem('user-role');
  //   console.log(userRole);

  //   if (userRole === 'admin') {
  //     this.isAdmin = true; // Usuário é admin
  //   } else {
  //     this.isAdmin = false; // Usuário não é admin
  //   }
  // }
  checkIfAdmin() {
    const token = sessionStorage.getItem('auth-token'); // Pega o token armazenado no sessionStorage
    if (token) {
      try {
        // Decodifica o token para obter as informações
        const decodedToken: any = jwtDecode(token);
        this.userEmail = decodedToken.email; // Extrai o email do token
        // Verifica se o email do usuário é igual ao do admin
        this.isAdmin = this.userEmail === 'admin@email.com';
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }

  logout() {
    sessionStorage.clear(); // Remove o token e dados da sessão
    this.router.navigate(['/login']); // Redireciona para a tela de login
  }
  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
  navigateToCategories() {
    this.router.navigate(['/categories']);
  }
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin-users']);
  }
}
