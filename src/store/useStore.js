import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // État d'authentification
      isAuthenticated: false,
      currentUser: null,
      
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
      
      // Actions
      login: (userData) => {
        set({
          isAuthenticated: true,
          currentUser: userData
        });
      },
      
      logout: () => {
        set({
          isAuthenticated: false,
          currentUser: null
        });
      },
      
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
        const newCron = {
          ...cron,
          id: Date.now(),
          createdAt: new Date().toISOString().split('T')[0],
          searchCount: 0,
          lastSearch: null,
          isActive: true
        };
        
        set(state => ({
          crons: {
            ...state.crons,
            [cron.companyId]: [...(state.crons[cron.companyId] || []), newCron]
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