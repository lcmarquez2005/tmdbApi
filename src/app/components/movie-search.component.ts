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
  protected readonly Math = Math;

  searchQuery = '';
  movies = signal<Movie[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  sliderIndex = signal(0);
  itemsPerSlide = 4;

  search(): void {
    if (!this.searchQuery.trim()) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.sliderIndex.set(0);

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

  getPosterUrl(posterPath: string | null): string {
    if (!posterPath) {
      return 'https://via.placeholder.com/200x300?text=Sin+Imagen';
    }
    return `https://image.tmdb.org/t/p/w200${posterPath}`;
  }

  previousSlide(): void {
    if (this.sliderIndex() > 0) {
      this.sliderIndex.set(this.sliderIndex() - 1);
    }
  }

  nextSlide(): void {
    const maxIndex = Math.ceil(this.movies().length / this.itemsPerSlide) - 1;
    if (this.sliderIndex() < maxIndex) {
      this.sliderIndex.set(this.sliderIndex() + 1);
    }
  }

  getSliderMovies(): Movie[] {
    const start = this.sliderIndex() * this.itemsPerSlide;
    return this.movies().slice(start, start + this.itemsPerSlide);
  }

  canPrevious(): boolean {
    return this.sliderIndex() > 0;
  }

  canNext(): boolean {
    const maxIndex = Math.ceil(this.movies().length / this.itemsPerSlide) - 1;
    return this.sliderIndex() < maxIndex;
  }
}
