import { Component, inject, signal } from '@angular/core';
import { MovieService, Movie, DiscoverParams } from '../services/movie.service';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { CommonModule } from '@angular/common'; // Para directivas comunes como @if, @for

@Component({
  selector: 'app-discover-movies',
  standalone: true, // Asumo que usan componentes standalone por la estructura
  imports: [FormsModule, CommonModule], // Importamos lo necesario
  templateUrl: './discover-movies.component.html'
//   styleUrls: ['./discover-movies.component.css'] // O .scss
})
export class DiscoverMoviesComponent {
  private readonly movieService = inject(MovieService);

  // Señales para el estado del componente
  region = signal<string>('');      // Ej. 'DE', 'US', 'MX'
  fromDate = signal<string>('');    // Ej. '2024-01-01'
  toDate = signal<string>('');      // Ej. '2024-01-31'
  releaseTypes = signal<string>(''); // Ej. '3' (Theatrical), '2|3' (Limited + Theatrical)
  movies = signal<Movie[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  discover() {
    // Validación básica
    if (!this.region()) {
      this.errorMessage.set('Por favor, introduce un código de región (ej. DE, US, MX).');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.movies.set([]);

    // Construimos los parámetros dinámicamente, solo si tienen valor
    const params: DiscoverParams = {
      language: 'es-MX', // Podrías hacer esto configurable también
      region: this.region(),
    };

    if (this.fromDate()) {
      params['release_date.gte'] = this.fromDate();
    }
    if (this.toDate()) {
      params['release_date.lte'] = this.toDate();
    }
    if (this.releaseTypes()) {
      params['with_release_type'] = this.releaseTypes();
    }

    // Llamamos al NUEVO método del servicio
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

  // Podemos reusar el método del servicio para las imágenes
  getPosterUrl(path: string | null): string {
    return this.movieService.getMoviePosterUrl(path);
  }
}