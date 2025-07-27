import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'examples',
    loadComponent: () => import('./examples/examples.component').then(m => m.ExamplesComponent),
  },
  { path: '**', redirectTo: 'home' },
];
