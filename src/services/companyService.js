// Service pour gérer les entreprises
import { buildApiUrl, getAuthHeaders, API_CONFIG } from './apiConfig';

export const companyService = {
  /**
   * Récupérer la liste des entreprises
   * @returns {Promise<Array>}
   */
  async getCompanies() {
    try {
      console.log('🔄 Récupération des entreprises...');
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.COMPANIES.LIST), {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      console.log('🔄 Réponse API status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur API:', errorData);
        throw new Error(errorData.message || 'Erreur lors de la récupération des entreprises');
      }

      const data = await response.json();
      console.log('✅ Entreprises récupérées:', data);
      return data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des entreprises:', error);
      throw error;
    }
  },

  /**
   * Créer une nouvelle entreprise
   * @param {Object} companyData - Données de l'entreprise
   * @returns {Promise<Object>}
   */
  async createCompany(companyData) {
    try {
      // Nettoyer les données pour éviter les erreurs de createdAt
      const cleanData = { ...companyData };
      delete cleanData.createdAt;
      delete cleanData.updatedAt;
      delete cleanData.id;
      
      console.log('🔄 Création de l\'entreprise avec les données:', cleanData);
      
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.COMPANIES.CREATE), {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(cleanData),
      });

      console.log('🔄 Réponse API status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur API:', errorData);
        throw new Error(errorData.message || 'Erreur lors de la création de l\'entreprise');
      }

      const data = await response.json();
      console.log('✅ Entreprise créée avec succès:', data);
      return data;
    } catch (error) {
      console.error('❌ Erreur lors de la création de l\'entreprise:', error);
      throw error;
    }
  },

  /**
   * Mettre à jour une entreprise
   * @param {string} id - ID de l'entreprise
   * @param {Object} companyData - Nouvelles données
   * @returns {Promise<Object>}
   */
  async updateCompany(id, companyData) {
    try {
      // Nettoyer les données pour éviter les erreurs de createdAt
      const cleanData = { ...companyData };
      delete cleanData.createdAt;
      delete cleanData.updatedAt;
      delete cleanData.id;
      
      console.log('🔄 Mise à jour de l\'entreprise avec les données:', cleanData);
      
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.COMPANIES.UPDATE, { id }), {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(cleanData),
      });

      console.log('🔄 Réponse API status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erreur API:', errorData);
        throw new Error(errorData.message || 'Erreur lors de la mise à jour de l\'entreprise');
      }

      const data = await response.json();
      console.log('✅ Entreprise mise à jour avec succès:', data);
      return data;
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour de l\'entreprise:', error);
      throw error;
    }
  },

  /**
   * Supprimer une entreprise
   * @param {string} id - ID de l'entreprise
   * @returns {Promise<Object>}
   */
  async deleteCompany(id) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.COMPANIES.DELETE, { id }), {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la suppression de l\'entreprise');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'entreprise:', error);
      throw error;
    }
  },

  /**
   * Récupérer une entreprise par ID
   * @param {string} id - ID de l'entreprise
   * @returns {Promise<Object>}
   */
  async getCompanyById(id) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.COMPANIES.GET_BY_ID, { id }), {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération de l\'entreprise');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'entreprise:', error);
      throw error;
    }
  }
};

export default companyService; 