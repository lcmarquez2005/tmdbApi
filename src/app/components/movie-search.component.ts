import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService, Movie } from '../services/movie.service';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.css'
})
export class MovieSearchComponent {
  private readonly movieService = inject(MovieService);

  searchQuery = '';
  movies = signal<Movie[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  search(): void {
    if (!this.searchQuery.trim()) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.movieService.searchMovies(this.searchQuery, 1).subscribe({
      next: (response) => {
        this.movies.set(response.results);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Error al buscar películas');
        console.error('Error:', error);
        this.isLoading.set(false);
      }
    });
  }
}
