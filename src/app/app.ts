import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { TmdbService, TvShow } from './tmdb.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="max-w-4xl mx-auto p-8 font-sans">
      
      <h1 class="text-3xl font-bold text-slate-800 mb-8 text-center">
        Buscar Series de TV
      </h1>

      <div class="flex gap-4 mb-8 justify-center">
        <input 
          #searchInput
          (keyup.enter)="buscar(searchInput.value)"
          type="text" 
          placeholder="Ej. Breaking Bad, The Office..." 
          class="w-full max-w-lg border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
        <button 
          (click)="buscar(searchInput.value)"
          class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
          Buscar
        </button>
      </div>

      @if (isLoading) {
        <p class="text-center text-gray-500">Buscando...</p>
      }

      @if (!isLoading && hasSearched) {
        <h2 class="text-xl font-bold text-slate-800 mb-4">
          Resultados ({{ totalResults }})
        </h2>

        @if (shows.length === 0) {
          <p class="text-gray-500">No se encontraron series con ese nombre.</p>
        } @else {
          <div class="flex flex-col gap-4">
            @for (show of shows; track show.id) {
              <div class="border border-gray-200 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition-shadow">
                
                <h3 class="text-lg font-medium text-blue-600 mb-1">
                  {{ show.name }}
                </h3>
                
                <p class="text-sm text-gray-400 mb-3">
                  {{ show.first_air_date || 'Fecha desconocida' }}
                </p>
                
                <p class="text-gray-600 text-sm leading-relaxed">
                  {{ show.overview || 'Sin descripción disponible para esta serie.' }}
                </p>
                
              </div>
            }
          </div>
        }
      }
    </div>
  `
})
export class App {
  private tmdbService = inject(TmdbService);

  private cdr = inject(ChangeDetectorRef);
  
  shows: TvShow[] = [];
  totalResults = 0;
  isLoading = false;
  hasSearched = false;

  buscar(query: string) {
    if (!query.trim()) return; 
    
    this.isLoading = true;
    this.hasSearched = true;

    this.tmdbService.searchTvShows(query).subscribe({
      next: (response) => {
        console.log("¡Los datos entraron a Angular!", response); // Un mensajito para la consola
        
        this.shows = response.results;
        this.totalResults = response.total_results;
        this.isLoading = false;
        
        // 3. ¡EL TOQUE MÁGICO! Obligamos a Angular a mostrar los cambios
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error en la búsqueda:', err);
        this.isLoading = false;
        this.cdr.detectChanges(); // También lo ponemos aquí por si acaso
      }
    });
  }
}