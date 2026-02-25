// src/app/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/popular';
  private apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODdkODQxOWE2ZTVkZjc1ZmZmMThiZGFiNzhjMWRhOCIsIm5iZiI6MTc3MTk5MDcwNS45NTIsInN1YiI6IjY5OWU2ZWIxYjNlODVlMWFiZmIyZjMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tcQhRAVQwxt2YnIOh19Iku1-HsTJ2cXFve_hFRm0kg0';

  constructor(private http: HttpClient) {}

  getCine(): Observable<any> {
    const headers = new HttpHeaders({
      // Revisa que haya un ESPACIO después de Bearer
      'Authorization': `Bearer ${this.apiToken}`, 
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${this.apiUrl}?language=es-ES&page=1`, { headers });
  }
}