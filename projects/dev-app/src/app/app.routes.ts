import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.Home),
  },
  {
    path: 'examples',
    loadComponent: () => import('./examples/examples').then(m => m.Examples),
  },
  {
    path: 'gradient-parser',
    loadComponent: () =>
      import('./gradient-parser/gradient-parser').then(m => m.GradientParser),
  },
  { path: '**', redirectTo: 'home' },
];
