// Service pour gérer les crons
import { buildApiUrl, getAuthHeaders, API_CONFIG } from './apiConfig';

// Fonction pour nettoyer les données du cron reçues de l'API
const cleanCronData = (cronData) => {
  const {
    lastRunAt,
    searchCount,
    ...cleanData
  } = cronData;
  
  return cleanData;
};

export const cronService = {
  /**
   * Récupérer la liste des crons
   * @returns {Promise<Array>}
   */
  async getCrons(companyId) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CRONS.LIST, { companyId }), {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des crons');
      }

      const data = await response.json();
      // Nettoyer les données reçues
      return Array.isArray(data) ? data.map(cleanCronData) : cleanCronData(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des crons:', error);
      throw error;
    }
  },

  /**
   * Créer un nouveau cron
   * @param {Object} cronData - Données du cron
   * @returns {Promise<Object>}
   */
  async createCron(cronData) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CRONS.CREATE), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(cronData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création du cron');
      }

      const data = await response.json();
      // Nettoyer les données reçues
      return cleanCronData(data);
    } catch (error) {
      console.error('Erreur lors de la création du cron:', error);
      throw error;
    }
  },

  /**
   * Mettre à jour un cron
   * @param {string} id - ID du cron
   * @param {Object} cronData - Nouvelles données
   * @returns {Promise<Object>}
   */
  async updateCron(id, cronData) {
    try {
      console.log('🔄 updateCron appelé avec:', { id, cronData });
      
      if (!id) {
        throw new Error('ID du cron manquant');
      }

      const url = buildApiUrl(API_CONFIG.ENDPOINTS.CRONS.UPDATE, { id });
      console.log('🔄 URL de mise à jour:', url);
      
      const response = await fetch(url, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(cronData),
      });

      console.log('🔄 Réponse API status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur API:', errorData);
        throw new Error(errorData.message || 'Erreur lors de la mise à jour du cron');
      }

      const data = await response.json();
      console.log('✅ Données reçues de l\'API:', data);
      
      // Nettoyer les données reçues
      const cleanedData = cleanCronData(data);
      console.log('✅ Données nettoyées:', cleanedData);
      
      return cleanedData;
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour du cron:', error);
      throw error;
    }
  },

  /**
   * Supprimer un cron
   * @param {string} id - ID du cron
   * @returns {Promise<Object>}
   */
  async deleteCron(id) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CRONS.DELETE, { id }), {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la suppression du cron');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la suppression du cron:', error);
      throw error;
    }
  },

  /**
   * Récupérer un cron par ID
   * @param {string} id - ID du cron
   * @returns {Promise<Object>}
   */
  async getCronById(id) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CRONS.GET_BY_ID, { id }), {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération du cron');
      }

      const data = await response.json();
      // Nettoyer les données reçues
      return cleanCronData(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du cron:', error);
      throw error;
    }
  },

  /**
   * Exécuter un cron manuellement
   * @param {string} id - ID du cron
   * @returns {Promise<Object>}
   */
  async executeCron(id) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.CRONS.EXECUTE, { id }), {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'exécution du cron');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'exécution du cron:', error);
      throw error;
    }
  }
};

export default cronService; 