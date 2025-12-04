import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { ProductosComponent } from './components/productos/productos';
import { Layaout } from './components/layaout/layaout';
import { IndexUsuarios } from './components/usuarios/index-usuarios/index-usuarios';
import { PerfilesComponent } from './components/perfiles/perfiles';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    component: Layaout,
    children: [
      { path: 'productos', component: ProductosComponent },
      { path: 'usuarios', component: IndexUsuarios },
      { path: 'perfiles', component: PerfilesComponent },
    ]
  },
  
];