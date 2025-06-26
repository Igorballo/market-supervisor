// Export de tous les services
export { authService } from './authService';
export { companyService } from './companyService';
export { cronService } from './cronService';
export { searchResultService } from './searchResultService';
export { dashboardService } from './dashboardService';
export { API_CONFIG, buildApiUrl, getAuthHeaders } from './apiConfig';

// Export par défaut pour faciliter l'import
export default {
  authService: require('./authService').authService,
  companyService: require('./companyService').companyService,
  cronService: require('./cronService').cronService,
  searchResultService: require('./searchResultService').searchResultService,
  dashboardService: require('./dashboardService').dashboardService,
  API_CONFIG: require('./apiConfig').API_CONFIG,
  buildApiUrl: require('./apiConfig').buildApiUrl,
  getAuthHeaders: require('./apiConfig').getAuthHeaders,
}; 