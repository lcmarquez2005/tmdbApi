// Reemplaza esto con tu API key de TMDB
// Obtén una API key gratis en: https://www.themoviedb.org/settings/api
export const TMDB_API_CONFIG = {
  apiKey: '10771df7b293498681b17e218cda50eb',
  baseUrl: 'https://api.themoviedb.org/3'
};



// Tipos de estreno según la documentación
export const RELEASE_TYPES = {
  PREMIERE: 1,
  THEATRICAL_LIMITED: 2,
  THEATRICAL: 3,
  DIGITAL: 4,
  PHYSICAL: 5,
  TV: 6
} as const;