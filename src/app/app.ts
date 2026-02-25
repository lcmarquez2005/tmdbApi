// src/app/app.ts
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

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getCine().subscribe({
      next: (data) => {
        this.results = data.results;
        console.log('Películas recibidas:', this.results); // <--- Esto te mostrará en consola si llegaron
      },
      error: (err) => console.error('Error de API:', err)
    });
  }
}