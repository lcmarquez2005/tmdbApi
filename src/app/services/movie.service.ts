import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    }).pipe(
      tap(response => console.log('Respuesta de TMDB API:', response))
    );
  }

  getMoviePosterUrl(posterPath: string | null): string {
    if (!posterPath) {
      return 'https://via.placeholder.com/200x300?text=No+Image';
    }
    return `https://image.tmdb.org/t/p/w200${posterPath}`;
  }

   discoverMovies(params: DiscoverParams): Observable<MovieSearchResponse> {
    // Construimos los parámetros, asegurándonos de incluir siempre la API key
    const httpParams: any = {
      api_key: this.apiKey,
      ...params // Expandimos los parámetros que nos pasan
    };

    return this.httpClient.get<MovieSearchResponse>(`${this.baseUrl}/discover/movie`, {
      params: httpParams
    });
  }
}


//INTERFAZ: Para los parámetros de discover
export interface DiscoverParams {
  language?: string;   // ej. 'de-DE'
  region?: string;     // ej. 'DE'
  'release_date.gte'?: string; // ej. '2016-11-16' (formato YYYY-MM-DD)
  'release_date.lte'?: string; // ej. '2016-12-02'
  'with_release_type'?: string; // ej. '2|3' (los IDs separados por |)

  
}