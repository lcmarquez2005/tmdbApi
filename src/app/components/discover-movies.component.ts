import { Component, inject, signal } from '@angular/core';
import { MovieService, Movie, DiscoverParams } from '../services/movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-discover-movies',
  standalone: true,
  imports: [FormsModule, CommonModule, DecimalPipe],
  templateUrl: './discover-movies.component.html'
})
export class DiscoverMoviesComponent {
  private readonly movieService = inject(MovieService);

  // Strings normales para ngModel (signals no funcionan bien con ngModel directamente)
  region = '';
  fromDate = '';
  toDate = '';
  releaseTypes = '';

  movies = signal<Movie[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  discover() {
    if (!this.region.trim()) {
      this.errorMessage.set('Por favor, introduce un código de región (ej. MX, US, DE).');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.movies.set([]);

    const params: DiscoverParams = {
      language: 'es-MX',
      region: this.region.trim().toUpperCase(),
    };

    if (this.fromDate) {
      params['release_date.gte'] = this.fromDate;
    }
    if (this.toDate) {
      params['release_date.lte'] = this.toDate;
    }
    if (this.releaseTypes.trim()) {
      params['with_release_type'] = this.releaseTypes.trim();
    }

    this.movieService.discoverMovies(params).subscribe({
      next: (response) => {
        this.movies.set(response.results);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al descubrir películas:', err);
        this.errorMessage.set('Ocurrió un error al obtener las películas. Revisa los parámetros.');
        this.isLoading.set(false);
      }
    });
  }

  getPosterUrl(path: string | null): string {
    return this.movieService.getMoviePosterUrl(path);
  }
}