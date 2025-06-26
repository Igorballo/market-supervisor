// Service pour gérer le dashboard
import { buildApiUrl, getAuthHeaders, API_CONFIG } from './apiConfig';

export const dashboardService = {
  /**
   * Récupérer les statistiques du dashboard
   * @returns {Promise<Object>}
   */
  async getDashboardStats() {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.STATS), {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des statistiques');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  },

  /**
   * Récupérer les données d'analytics
   * @param {Object} filters - Filtres optionnels (période, etc.)
   * @returns {Promise<Object>}
   */
  async getAnalytics(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams 
        ? `${buildApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.ANALYTICS)}?${queryParams}`
        : buildApiUrl(API_CONFIG.ENDPOINTS.DASHBOARD.ANALYTICS);

      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des analytics');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des analytics:', error);
      throw error;
    }
  },

  /**
   * Récupérer les données de performance des crons
   * @param {string} period - Période (day, week, month, year)
   * @returns {Promise<Object>}
   */
  async getCronPerformance(period = 'week') {
    try {
      const response = await fetch(buildApiUrl('/dashboard/cron-performance'), {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des performances');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des performances:', error);
      throw error;
    }
  },

  /**
   * Récupérer les alertes et notifications
   * @returns {Promise<Array>}
   */
  async getNotifications() {
    try {
      const response = await fetch(buildApiUrl('/dashboard/notifications'), {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des notifications');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
      throw error;
    }
  },

  /**
   * Marquer une notification comme lue
   * @param {string} notificationId - ID de la notification
   * @returns {Promise<Object>}
   */
  async markNotificationAsRead(notificationId) {
    try {
      const response = await fetch(buildApiUrl(`/dashboard/notifications/${notificationId}/read`), {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise à jour');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      throw error;
    }
  },

  /**
   * Récupérer les tendances de recherche
   * @param {string} period - Période (day, week, month)
   * @returns {Promise<Object>}
   */
  async getSearchTrends(period = 'week') {
    try {
      const response = await fetch(buildApiUrl(`/dashboard/search-trends?period=${period}`), {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des tendances');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des tendances:', error);
      throw error;
    }
  }
};

export default dashboardService; 