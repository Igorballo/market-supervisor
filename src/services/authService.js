// Service d'authentification pour gérer les appels API
import { buildApiUrl, getAuthHeaders, API_CONFIG } from './apiConfig';

export const authService = {
  /**
   * Connexion utilisateur
   * @param {Object} credentials - Email et mot de passe
   * @returns {Promise<Object>} - Données utilisateur en cas de succès
   */
  async login(credentials) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.COMPANY_LOGIN), {
        method: 'POST',
        headers: API_CONFIG.DEFAULT_HEADERS,
        body: JSON.stringify(credentials),
      });


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur de connexion');
      }

      const data = await response.json();
      

      // Stocker le token dans localStorage
      if (data.accessToken) {
        localStorage.setItem('authToken', data.accessToken);
      }

      return data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },

  /**
   * Déconnexion utilisateur
   */
  async logout() {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGOUT), {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      // Même si la requête échoue, on supprime le token localement
      localStorage.removeItem('authToken');
      
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // On supprime quand même le token localement
      localStorage.removeItem('authToken');
    }
  },

  /**
   * Vérifier si l'utilisateur est connecté
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Récupérer le token d'authentification
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('authToken');
  },

  /**
   * Réinitialisation du mot de passe
   * @param {string} email - Email de l'utilisateur
   * @returns {Promise<Object>}
   */
  async forgotPassword(email) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD), {
        method: 'POST',
        headers: API_CONFIG.DEFAULT_HEADERS,
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la réinitialisation');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      throw error;
    }
  },

  /**
   * Réinitialiser le mot de passe avec le token
   * @param {string} token - Token de réinitialisation
   * @param {string} newPassword - Nouveau mot de passe
   * @returns {Promise<Object>}
   */
  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD), {
        method: 'POST',
        headers: API_CONFIG.DEFAULT_HEADERS,
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la réinitialisation');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      throw error;
    }
  },

  /**
   * Vérifier la validité du token
   * @returns {Promise<Object>}
   */
  async verifyToken() {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('Aucun token trouvé');
      }

      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.VERIFY_TOKEN), {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Token invalide');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      throw error;
    }
  },

  /**
   * Rafraîchir le token
   * @returns {Promise<Object>}
   */
  async refreshToken() {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN), {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Impossible de rafraîchir le token');
      }

      const data = await response.json();
      
      // Mettre à jour le token
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      return data;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      throw error;
    }
  }
};

export default authService; 