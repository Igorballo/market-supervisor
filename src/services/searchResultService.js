// Service pour gérer les résultats de recherche
import { buildApiUrl, getAuthHeaders, API_CONFIG } from './apiConfig';

export const searchResultService = {
  /**
   * Récupérer la liste des résultats de recherche
   * @param {Object} filters - Filtres optionnels
   * @returns {Promise<Array>}
   */
  async getSearchResults(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams 
        ? `${buildApiUrl(API_CONFIG.ENDPOINTS.SEARCH_RESULTS.LIST)}?${queryParams}`
        : buildApiUrl(API_CONFIG.ENDPOINTS.SEARCH_RESULTS.LIST);

      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des résultats');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des résultats:', error);
      throw error;
    }
  },

  /**
   * Récupérer les résultats d'un cron spécifique
   * @param {string} cronId - ID du cron
   * @param {Object} filters - Filtres optionnels
   * @returns {Promise<Array>}
   */
  async getSearchResultsByCron(cronId, filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams 
        ? `${buildApiUrl(API_CONFIG.ENDPOINTS.SEARCH_RESULTS.GET_BY_CRON, { cronId })}?${queryParams}`
        : buildApiUrl(API_CONFIG.ENDPOINTS.SEARCH_RESULTS.GET_BY_CRON, { cronId });

      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des résultats');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des résultats:', error);
      throw error;
    }
  },

  /**
   * Supprimer un résultat de recherche
   * @param {string} id - ID du résultat
   * @returns {Promise<Object>}
   */
  async deleteSearchResult(id) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.SEARCH_RESULTS.DELETE, { id }), {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la suppression du résultat');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la suppression du résultat:', error);
      throw error;
    }
  },

  /**
   * Exporter les résultats de recherche
   * @param {Array} resultIds - IDs des résultats à exporter
   * @param {string} format - Format d'export (csv, json, xlsx)
   * @returns {Promise<Blob>}
   */
  async exportSearchResults(resultIds, format = 'csv') {
    try {
      const response = await fetch(buildApiUrl('/search-results/export'), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ resultIds, format }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'export');
      }

      return await response.blob();
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      throw error;
    }
  },

  /**
   * Marquer un résultat comme important
   * @param {string} id - ID du résultat
   * @param {boolean} isImportant - Statut important
   * @returns {Promise<Object>}
   */
  async markAsImportant(id, isImportant) {
    try {
      const response = await fetch(buildApiUrl(`/search-results/${id}/important`), {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isImportant }),
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
  }
};

export default searchResultService; 