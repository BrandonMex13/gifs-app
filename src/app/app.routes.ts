import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page').then( c => c.DashboardPage),
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page').then( c => c.TrendingPage)
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page').then( c => c.SearchPage)
      },
      {
        path: '**',
        redirectTo: 'trending'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
