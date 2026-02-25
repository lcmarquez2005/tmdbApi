import { Routes } from '@angular/router';
import { MovieSearchComponent } from './components/movie-search.component';
import { DiscoverMoviesComponent } from './components/discover-movies.component'; // <-- Ruta nueva componente rodrigo 


export const routes: Routes = [
  {
    path: '',
    component: MovieSearchComponent
  },
  {
    path: 'buscar',
    component: MovieSearchComponent
  },
  { path: 'descubrir',
   component: DiscoverMoviesComponent },
];
