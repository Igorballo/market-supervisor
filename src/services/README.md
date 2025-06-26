# Services API

Ce dossier contient tous les services pour communiquer avec l'API backend.

## Structure

```
services/
├── apiConfig.js          # Configuration de l'API (URLs, headers, etc.)
├── authService.js        # Service d'authentification
├── companyService.js     # Service pour les entreprises
├── cronService.js        # Service pour les crons
├── searchResultService.js # Service pour les résultats de recherche
├── dashboardService.js   # Service pour le dashboard
├── index.js             # Export de tous les services
└── README.md            # Ce fichier
```

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
REACT_APP_API_URL=http://localhost:3001/api
```

### Configuration par défaut

Si `REACT_APP_API_URL` n'est pas défini, l'API utilisera `http://localhost:3001/api` par défaut.

## Services disponibles

### 1. Service d'authentification (`authService`)

```javascript
import { authService } from '../services';

// Connexion
const login = async (credentials) => {
  try {
    const response = await authService.login({
      email: 'user@example.com',
      password: 'password123'
    });
    console.log('Connexion réussie:', response);
  } catch (error) {
    console.error('Erreur de connexion:', error.message);
  }
};

// Déconnexion
const logout = async () => {
  await authService.logout();
};

// Vérifier si connecté
const isLoggedIn = authService.isAuthenticated();

// Récupérer le token
const token = authService.getToken();

// Réinitialisation du mot de passe
const forgotPassword = async (email) => {
  await authService.forgotPassword(email);
};

// Réinitialiser le mot de passe
const resetPassword = async (token, newPassword) => {
  await authService.resetPassword(token, newPassword);
};
```

### 2. Service des entreprises (`companyService`)

```javascript
import { companyService } from '../services';

// Récupérer toutes les entreprises
const companies = await companyService.getCompanies();

// Créer une entreprise
const newCompany = await companyService.createCompany({
  name: 'Nouvelle Entreprise',
  email: 'contact@nouvelle-entreprise.com',
  country: 'Togo',
  sector: 'Technologie'
});

// Mettre à jour une entreprise
const updatedCompany = await companyService.updateCompany(id, {
  name: 'Nom mis à jour'
});

// Supprimer une entreprise
await companyService.deleteCompany(id);

// Récupérer une entreprise par ID
const company = await companyService.getCompanyById(id);
```

### 3. Service des crons (`cronService`)

```javascript
import { cronService } from '../services';

// Récupérer tous les crons
const crons = await cronService.getCrons();

// Créer un nouveau cron
const newCron = await cronService.createCron({
  name: 'Recherche appels d\'offres',
  tags: ['construction', 'Togo'],
  companyId: 1,
  schedule: '0 9 * * *' // Tous les jours à 9h
});

// Mettre à jour un cron
const updatedCron = await cronService.updateCron(id, {
  name: 'Nouveau nom',
  isActive: false
});

// Supprimer un cron
await cronService.deleteCron(id);

// Exécuter un cron manuellement
await cronService.executeCron(id);
```

### 4. Service des résultats de recherche (`searchResultService`)

```javascript
import { searchResultService } from '../services';

// Récupérer tous les résultats
const results = await searchResultService.getSearchResults();

// Récupérer avec filtres
const filteredResults = await searchResultService.getSearchResults({
  dateFrom: '2024-01-01',
  dateTo: '2024-03-31',
  tags: ['construction']
});

// Récupérer les résultats d'un cron spécifique
const cronResults = await searchResultService.getSearchResultsByCron(cronId);

// Supprimer un résultat
await searchResultService.deleteSearchResult(resultId);

// Exporter les résultats
const blob = await searchResultService.exportSearchResults([1, 2, 3], 'csv');

// Marquer comme important
await searchResultService.markAsImportant(resultId, true);
```

### 5. Service du dashboard (`dashboardService`)

```javascript
import { dashboardService } from '../services';

// Récupérer les statistiques
const stats = await dashboardService.getDashboardStats();

// Récupérer les analytics
const analytics = await dashboardService.getAnalytics({
  period: 'month'
});

// Récupérer les performances des crons
const performance = await dashboardService.getCronPerformance('week');

// Récupérer les notifications
const notifications = await dashboardService.getNotifications();

// Marquer une notification comme lue
await dashboardService.markNotificationAsRead(notificationId);

// Récupérer les tendances de recherche
const trends = await dashboardService.getSearchTrends('month');
```

## Utilisation avec Zustand

Les services sont intégrés dans le store Zustand pour une gestion d'état centralisée :

```javascript
import useStore from '../store/useStore';

const MyComponent = () => {
  const { 
    login, 
    fetchCompanies, 
    companies, 
    loading, 
    errors 
  } = useStore();

  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleFetchCompanies = async () => {
    try {
      await fetchCompanies();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div>
      {loading.companies && <p>Chargement...</p>}
      {errors.companies && <p>Erreur: {errors.companies}</p>}
      {companies.map(company => (
        <div key={company.id}>{company.name}</div>
      ))}
    </div>
  );
};
```

## Gestion des erreurs

Tous les services gèrent automatiquement les erreurs et les retournent pour traitement :

```javascript
try {
  const result = await authService.login(credentials);
  // Succès
} catch (error) {
  // Erreur gérée
  console.error('Erreur:', error.message);
  // Afficher un message à l'utilisateur
}
```

## Fallback vers les données statiques

Si l'API n'est pas disponible, l'application utilise automatiquement les données statiques définies dans le store pour permettre le développement et les tests.

## Headers d'authentification

Les services ajoutent automatiquement le token d'authentification aux requêtes quand il est disponible dans le localStorage.

## Timeout

Les requêtes ont un timeout par défaut de 10 secondes, configurable dans `apiConfig.js`. 