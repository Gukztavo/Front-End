import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CategoryComponent } from './pages/category/category.component';
import { AvisosComponent } from './pages/avisos/avisos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 

  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "usuarios",
    component: SignUpComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  // { path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [AuthGuard]
  // },

  // { path: 'categories',
  //   component: CategoriesComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'admin-users', component: AdminComponent },

  { path: 'categorias', component: CategoryComponent },

  { path: 'avisos', component: AvisosComponent },
];
