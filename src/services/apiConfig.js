// Configuration de l'API
export const API_CONFIG = {
  // URL de base de l'API
  BASE_URL: 'http://localhost:5000',
  
  // Headers par défaut
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },

  
  // Timeout pour les requêtes (en millisecondes)
  TIMEOUT: 10000,
  
  // Endpoints de l'API
  ENDPOINTS: {
    AUTH: {
      ADMIN_LOGIN: '/auth/users/login',
      COMPANY_LOGIN: '/auth/companies/login',
      LOGOUT: '/auth/logout',
      REGISTER: '/auth/register',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      VERIFY_TOKEN: '/auth/verify',
      REFRESH_TOKEN: '/auth/refresh',
    },
    COMPANIES: {
      LIST: '/companies',
      CREATE: '/companies',
      UPDATE: '/companies/:id',
      DELETE: '/companies/:id',
      GET_BY_ID: '/companies/:id',
    },
    CRONS: {
      LIST: '/crons',
      CREATE: '/crons',
      UPDATE: '/crons/:id',
      DELETE: '/crons/:id',
      GET_BY_ID: '/crons/:id',
      EXECUTE: '/crons/:id/execute',
    },
    SEARCH_RESULTS: {
      LIST: '/search-results',
      GET_BY_CRON: '/search-results/cron/:cronId',
      DELETE: '/search-results/:id',
    },
    DASHBOARD: {
      STATS: '/dashboard/stats',
      ANALYTICS: '/dashboard/analytics',
    }
  }
};

// Fonction utilitaire pour construire l'URL complète
export const buildApiUrl = (endpoint, params = {}) => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  // Remplacer les paramètres dans l'URL
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  
  return url;
};

// Fonction utilitaire pour ajouter le token d'authentification
export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    ...API_CONFIG.DEFAULT_HEADERS,
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export default API_CONFIG; 