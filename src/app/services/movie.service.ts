import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TMDB_API_CONFIG } from '../config/tmdb.config';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface MovieSearchResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiKey = TMDB_API_CONFIG.apiKey;
  private readonly baseUrl = TMDB_API_CONFIG.baseUrl;

  searchMovies(query: string, page: number = 1): Observable<MovieSearchResponse> {
    return this.httpClient.get<MovieSearchResponse>(`${this.baseUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: query,
        page: page.toString()
      }
    });
  }

  getMoviePosterUrl(posterPath: string | null): string {
    if (!posterPath) {
      return 'https://via.placeholder.com/200x300?text=No+Image';
    }
    return `https://image.tmdb.org/t/p/w200${posterPath}`;
  }
}
