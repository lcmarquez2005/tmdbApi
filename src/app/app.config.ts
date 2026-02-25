import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// 1. Asegúrate de importar withFetch
import { provideHttpClient, withFetch } from '@angular/common/http'; 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 2. Agrega withFetch() dentro de provideHttpClient()
    provideHttpClient(withFetch()) 
  ]
};