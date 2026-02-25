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
        // 👇 BORRA ESTA LÍNEA 👇
        // console.log('Películas recibidas:', this.results); 
      },
      error: (err) => console.error('Error de API:', err)
    });
  }
}