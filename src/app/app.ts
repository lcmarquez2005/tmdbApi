import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  results: any[] = [];
  // URL Base para las imágenes de TMDB
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getCine().subscribe({
      next: (data) => {
        this.results = data.results;
      },
      error: (err) => console.error('Error de API:', err)
    });
  }
}