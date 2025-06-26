import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService, companyService, cronService, searchResultService, dashboardService } from '../services';

const useStore = create(
  persist(
    (set, get) => ({
      // État d'authentification
      isAuthenticated: false,
      currentUser: null,
      
      // États de chargement
      loading: {
        auth: false,
        companies: false,
        crons: false,
        searchResults: false,
        dashboard: false
      },
      
      // États d'erreur
      errors: {
        auth: null,
        companies: null,
        crons: null,
        searchResults: null,
        dashboard: null
      },
      
      // Liste des entreprises (pour l'admin)
      companies: [
        {
          id: 1,
          name: "Tech Solutions SARL",
          email: "contact@techsolutions.tg",
          password: "hashed_password",
          country: "Togo",
          sector: "Technologie",
          createdAt: "2024-01-15"
        },
        {
          id: 2,
          name: "Construction Plus",
          email: "info@constructionplus.tg",
          password: "hashed_password",
          country: "Togo",
          sector: "Construction",
          createdAt: "2024-02-20"
        }
      ],
      
      // Crons par entreprise
      crons: {
        1: [
          {
            id: 1,
            companyId: 1,
            name: "Appels d'offres Construction Togo",
            tags: ["construction", "Togo", "appels d'offres"],
            isActive: true,
            createdAt: "2024-03-01",
            searchCount: 45,
            lastSearch: "2024-03-15"
          },
          {
            id: 2,
            companyId: 1,
            name: "Opportunités Énergie",
            tags: ["énergie", "renouvelable", "Togo"],
            isActive: true,
            createdAt: "2024-03-10",
            searchCount: 23,
            lastSearch: "2024-03-14"
          }
        ],
        2: [
          {
            id: 3,
            companyId: 2,
            name: "Projets BTP Togo",
            tags: ["BTP", "construction", "Togo"],
            isActive: true,
            createdAt: "2024-03-05",
            searchCount: 67,
            lastSearch: "2024-03-15"
          }
        ]
      },
      
      // Résultats de recherche par Cron
      searchResults: {
        1: [
          {
            id: 1,
            cronId: 1,
            title: "Appel d'offres pour la construction d'un pont à Lomé",
            summary: "Le gouvernement togolais lance un appel d'offres pour la construction d'un pont moderne reliant les quartiers de Lomé...",
            source: "https://www.togo.gouv.tg/appels-offres/construction-pont-lome",
            date: "2024-03-15",
            tags: ["construction", "infrastructure", "pont"]
          },
          {
            id: 2,
            cronId: 1,
            title: "Projet de construction d'écoles dans la région des Plateaux",
            summary: "Le ministère de l'éducation lance un appel d'offres pour la construction de 10 écoles primaires...",
            source: "https://www.education.tg/projets/construction-ecoles-plateaux",
            date: "2024-03-14",
            tags: ["construction", "éducation", "écoles"]
          }
        ],
        2: [
          {
            id: 3,
            cronId: 2,
            title: "Projet d'installation de panneaux solaires dans les zones rurales",
            summary: "Opportunité d'installation de systèmes d'énergie solaire pour électrifier les villages...",
            source: "https://www.energie.tg/projets/solaire-rural",
            date: "2024-03-14",
            tags: ["énergie", "solaire", "rural"]
          }
        ],
        3: [
          {
            id: 4,
            cronId: 3,
            title: "Construction d'un centre commercial à Kara",
            summary: "Appel d'offres pour la construction d'un centre commercial moderne de 5000m²...",
            source: "https://www.construction.tg/projets/centre-commercial-kara",
            date: "2024-03-15",
            tags: ["construction", "commerce", "Kara"]
          }
        ]
      },

      // Données du dashboard
      dashboardStats: null,
      analytics: null,
      
      // Actions d'authentification
      login: async (credentials) => {
        set(state => ({ 
          loading: { ...state.loading, auth: true },
          errors: { ...state.errors, auth: null }
        }));

        try {
          const response = await authService.login(credentials);
          set({
            isAuthenticated: true,
            currentUser: response.company || response.user,
            loading: { ...get().loading, auth: false }
          });
          return response;
        } catch (error) {
          set(state => ({
            loading: { ...state.loading, auth: false },
            errors: { ...state.errors, auth: error.message }
          }));
          throw error;
        }
      },
      
      logout: async () => {
        try {
          await authService.logout();
        } catch (error) {
          console.error('Erreur lors de la déconnexion:', error);
        } finally {
          set({
            isAuthenticated: false,
            currentUser: null
          });
        }
      },

      // Action de login direct (pour utilisation depuis les composants)
      loginUser: (userData) => {
        set({
          isAuthenticated: true,
          currentUser: userData
        });
      },

      // Actions pour les entreprises
      fetchCompanies: async () => {
        set(state => ({ 
          loading: { ...state.loading, companies: true },
          errors: { ...state.errors, companies: null }
        }));

        try {
          const companies = await companyService.getCompanies();
          set(state => ({
            companies,
            loading: { ...state.loading, companies: false }
          }));
          return companies;
        } catch (error) {
          set(state => ({
            loading: { ...state.loading, companies: false },
            errors: { ...state.errors, companies: error.message }
          }));
          throw error;
        }
      },

      createCompany: async (companyData) => {
        set(state => ({ 
          loading: { ...state.loading, companies: true },
          errors: { ...state.errors, companies: null }
        }));

        try {
          const newCompany = await companyService.createCompany(companyData);
          set(state => ({
            companies: [...state.companies, newCompany],
            loading: { ...state.loading, companies: false }
          }));
          return newCompany;
        } catch (error) {
          set(state => ({
            loading: { ...state.loading, companies: false },
            errors: { ...state.errors, companies: error.message }
          }));
          throw error;
        }
      },

      // Actions pour les crons
      fetchCrons: async () => {
        set(state => ({ 
          loading: { ...state.loading, crons: true },
          errors: { ...state.errors, crons: null }
        }));

        try {
          const crons = await cronService.getCrons();
          set(state => ({
            crons,
            loading: { ...state.loading, crons: false }
          }));
          return crons;
        } catch (error) {
          set(state => ({
            loading: { ...state.loading, crons: false },
            errors: { ...state.errors, crons: error.message }
          }));
          throw error;
        }
      },

      createCron: async (cronData) => {
        set(state => ({ 
          loading: { ...state.loading, crons: true },
          errors: { ...state.errors, crons: null }
        }));

        try {
          const newCron = await cronService.createCron(cronData);
          set(state => ({
            crons: {
              ...state.crons,
              [cronData.companyId]: [...(state.crons[cronData.companyId] || []), newCron]
            },
            loading: { ...state.loading, crons: false }
          }));
          return newCron;
        } catch (error) {
          set(state => ({
            loading: { ...state.loading, crons: false },
            errors: { ...state.errors, crons: error.message }
          }));
          throw error;
        }
      },

      // Actions pour les résultats de recherche
      fetchSearchResults: async (filters = {}) => {
        set(state => ({ 
          loading: { ...state.loading, searchResults: true },
          errors: { ...state.errors, searchResults: null }
        }));

        try {
          const results = await searchResultService.getSearchResults(filters);
          set(state => ({
            searchResults: results,
            loading: { ...state.loading, searchResults: false }
          }));
          return results;
        } catch (error) {
          set(state => ({
            loading: { ...state.loading, searchResults: false },
            errors: { ...state.errors, searchResults: error.message }
          }));
          throw error;
        }
      },

      // Actions pour le dashboard
      fetchDashboardStats: async () => {
        set(state => ({ 
          loading: { ...state.loading, dashboard: true },
          errors: { ...state.errors, dashboard: null }
        }));

        try {
          const stats = await dashboardService.getDashboardStats();
          set(state => ({
            dashboardStats: stats,
            loading: { ...state.loading, dashboard: false }
          }));
          return stats;
        } catch (error) {
          set(state => ({
            loading: { ...state.loading, dashboard: false },
            errors: { ...state.errors, dashboard: error.message }
          }));
          throw error;
        }
      },

      fetchAnalytics: async (filters = {}) => {
        set(state => ({ 
          loading: { ...state.loading, dashboard: true },
          errors: { ...state.errors, dashboard: null }
        }));

        try {
          const analytics = await dashboardService.getAnalytics(filters);
          set(state => ({
            analytics,
            loading: { ...state.loading, dashboard: false }
          }));
          return analytics;
        } catch (error) {
          set(state => ({
            loading: { ...state.loading, dashboard: false },
            errors: { ...state.errors, dashboard: error.message }
          }));
          throw error;
        }
      },

      // Actions de fallback (pour les données statiques)
      addCompany: (company) => {
        const newCompany = {
          ...company,
          id: Date.now(),
          createdAt: new Date().toISOString().split('T')[0]
        };
        set(state => ({
          companies: [...state.companies, newCompany]
        }));
      },
      
      addCron: (cron) => {
        // Nettoyer les données pour éviter les conflits avec l'API
        const {
          lastRunAt,
          ...cleanCron
        } = cron;
        
        const newCron = {
          ...cleanCron,
          id: cleanCron.id || Date.now(),
          createdAt: cleanCron.createdAt || new Date().toISOString(),
          searchCount: cleanCron.searchCount || 0,
          lastSearch: cleanCron.lastSearch || null,
          isActive: cleanCron.isActive !== undefined ? cleanCron.isActive : true
        };
        
        set(state => ({
          crons: {
            ...state.crons,
            [newCron.companyId]: [...(state.crons[newCron.companyId] || []), newCron]
          }
        }));
      },
      
      addSearchResult: (result) => {
        const newResult = {
          ...result,
          id: Date.now(),
          date: new Date().toISOString().split('T')[0]
        };
        
        set(state => ({
          searchResults: {
            ...state.searchResults,
            [result.cronId]: [...(state.searchResults[result.cronId] || []), newResult]
          }
        }));
        
        // Mettre à jour le compteur de recherches du Cron
        set(state => ({
          crons: {
            ...state.crons,
            [result.companyId]: state.crons[result.companyId].map(cron => 
              cron.id === result.cronId 
                ? { ...cron, searchCount: cron.searchCount + 1, lastSearch: newResult.date }
                : cron
            )
          }
        }));
      },

      // Actions utilitaires
      clearErrors: () => {
        set(state => ({
          errors: {
            auth: null,
            companies: null,
            crons: null,
            searchResults: null,
            dashboard: null
          }
        }));
      },

      setLoading: (key, value) => {
        set(state => ({
          loading: { ...state.loading, [key]: value }
        }));
      }
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        companies: state.companies,
        crons: state.crons,
        searchResults: state.searchResults
      })
    }
  )
);

export default useStore; 