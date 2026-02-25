import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TvShow {
  id: number;
  name: string; 
  first_air_date: string;
  overview: string;
}

export interface TmdbResponse {
  results: TvShow[];
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private http = inject(HttpClient);
  
  // ¡Pega aquí tu token larguísimo de Postman!
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjc3ZTU0Zjg2ODk3NDZiMzk3N2VkYTVhMjhhZDJkYSIsIm5iZiI6MTc3MTk5MDI4OC4yMjcsInN1YiI6IjY5OWU2ZDEwZWMwMmJjN2IzOWYxZmMxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XJwgSOPf-V4b8cvaK1pGrbqhN7Q5aaCj2XOl2oG7crU'; 

  searchTvShows(query: string): Observable<TmdbResponse> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    
    const url = `https://api.themoviedb.org/3/search/tv?query=${query}&language=es-MX`;
    return this.http.get<TmdbResponse>(url, { headers });
  }
}