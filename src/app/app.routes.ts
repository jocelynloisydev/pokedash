import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokedex',
    pathMatch: 'full',
  },
  {
    path: 'pokedex',
    loadComponent: () => import('./features/pokemon-list/pokemon-list').then(m => m.PokemonList),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () => import('./features/pokemon-card/pokemon-card').then(m => m.PokemonCard),
  },
  {
    path: 'random',
    loadComponent: () => import('./features/pokemon-card/pokemon-card').then(m => m.PokemonCard),
  },
  {
    path: '**',
    redirectTo: 'pokedex',
  },
]
