import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { AnalisisLaboratorioForm } from './features/AnalisisLaboratorio/pages/analisisLaboratorio-form/analisis-laboratorio-form';

const loadLoginComponent = () =>
  import('./features/auth/pages/login/login').then(m => m.LoginComponent);

const loadUsuarioListComponent = () =>
  import('./features/usuarios/pages/usuario-list/usuario-list').then(m => m.UsuarioList);

const loadUsuarioFormComponent = () =>
  import('./features/usuarios/pages/usuario-form/usuario-form').then(m => m.UsuarioForm);

const loadAnalisisLaboratorioList = () =>
  import('./features/AnalisisLaboratorio/pages/analisisLaboratorio-list/analisis-laboratorio-list').then(m => m.AnalisisLaboratorioList);

const loadAnalisisLaboratorioForm = () =>
  import('./features/AnalisisLaboratorio/pages/analisisLaboratorio-form/analisis-laboratorio-form').then(m => m.AnalisisLaboratorioForm);


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: loadLoginComponent
  },
  {
    path: 'usuarios',
    canActivate: [],
    children: [
      {
        path: '',
        loadComponent: loadUsuarioListComponent
      },
      {
        path: 'nuevo',
        loadComponent: loadUsuarioFormComponent
      },
      {
        path: 'editar/:id',
        loadComponent: loadUsuarioFormComponent
      }
    ]
  },

  {
    path: 'analisis',
    canActivate: [],
    children: [
      {
        path: '',
        loadComponent: loadAnalisisLaboratorioList
      },
      {
        path: 'nuevo',
        loadComponent: loadAnalisisLaboratorioForm
      },
      {
        path: 'editar/:id',
        loadComponent: loadAnalisisLaboratorioForm
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
