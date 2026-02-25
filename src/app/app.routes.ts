import { Routes } from '@angular/router';
import { MovieSearchComponent } from './components/movie-search.component';

export const routes: Routes = [
  {
    path: '',
    component: MovieSearchComponent
  },
  {
    path: 'buscar',
    component: MovieSearchComponent
  }
];
