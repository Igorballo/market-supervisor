# Dowonou Space - Plateforme de Recherches Automatisées

Une application web React moderne destinée aux entreprises pour effectuer des recherches automatisées sur Internet.

## 🚀 Fonctionnalités

### 👨‍💼 Page d'Administration
- **Enregistrement des entreprises** : Interface complète pour l'administrateur
- **Gestion des accès** : Création de comptes entreprises avec validation
- **Informations requises** : Nom, email, mot de passe, pays, secteur d'activité
- **Liste des entreprises** : Vue d'ensemble de toutes les entreprises enregistrées

### 🔐 Authentification
- **Page de connexion** : Interface professionnelle et sécurisée
- **Validation côté client** : Gestion des erreurs et feedback utilisateur
- **Mot de passe oublié** : Interface préparée (non fonctionnelle)
- **Protection des routes** : Redirection automatique si non authentifié

### 📊 Dashboard Entreprise
- **Statistiques en temps réel** : Nombre de recherches, crons actifs, etc.
- **Gestion des Crons** : Création et gestion des tâches automatisées
- **Interface intuitive** : Design moderne avec animations fluides
- **Responsive design** : Optimisé pour tous les appareils

### 🤖 Système de Crons
- **Création de tâches** : Interface modale pour créer de nouveaux crons
- **Tags de recherche** : Système flexible de tags pour définir les critères
- **Suivi des résultats** : Historique complet des recherches effectuées
- **Statut des tâches** : Activation/désactivation des crons

### 📈 Analytics
- **Statistiques avancées** : Évolution mensuelle, tags populaires
- **Activité récente** : Suivi des dernières actions
- **Visualisations** : Graphiques et métriques claires

## 🛠️ Technologies Utilisées

- **React 19** : Framework principal
- **React Router DOM** : Navigation et routage
- **Tailwind CSS** : Styling moderne et responsive
- **Zustand** : Gestion d'état légère et performante
- **React Hook Form** : Gestion des formulaires
- **Heroicons** : Icônes modernes et cohérentes

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── CreateCronModal.jsx
│   ├── CronDetailsModal.jsx
│   ├── DashboardNav.jsx
│   └── Analytics.jsx
├── pages/              # Pages principales
│   ├── Admin.jsx       # Page d'administration
│   ├── Login.jsx       # Page de connexion
│   ├── Dashboard.jsx   # Dashboard entreprise
│   └── ...            # Autres pages existantes
├── store/              # Gestion d'état
│   └── useStore.js     # Store Zustand
└── Router.jsx          # Configuration des routes
```

## 🚀 Installation et Démarrage

1. **Cloner le projet**
   ```bash
   git clone [url-du-repo]
   cd MS
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer l'application**
   ```bash
   npm start
   ```

4. **Accéder à l'application**
   - Page d'accueil : `http://localhost:3000`
   - Administration : `http://localhost:3000/admin`
   - Connexion : `http://localhost:3000/login`

## 🔧 Configuration

### Données de Test
L'application inclut des données de test pour démonstration :
- **Entreprises** : Tech Solutions SARL, Construction Plus
- **Crons** : Exemples de tâches automatisées
- **Résultats** : Données simulées de recherches

### Authentification
Pour tester l'application, utilisez ces identifiants :
- **Email** : `contact@techsolutions.tg`
- **Mot de passe** : `hashed_password`

## 📱 Fonctionnalités Principales

### Pour l'Administrateur
1. Accéder à `/admin`
2. Enregistrer de nouvelles entreprises
3. Consulter la liste des entreprises
4. Gérer les accès à la plateforme

### Pour les Entreprises
1. Se connecter via `/login`
2. Accéder au dashboard personnalisé
3. Créer des tâches automatisées (Crons)
4. Consulter les résultats de recherche
5. Analyser les statistiques

## 🎨 Design et UX

- **Interface moderne** : Design épuré et professionnel
- **Animations fluides** : Transitions et micro-interactions
- **Responsive** : Optimisé mobile, tablette et desktop
- **Accessibilité** : Respect des standards WCAG
- **Couleurs cohérentes** : Palette professionnelle

## 🔒 Sécurité

- **Validation côté client** : Formulaires sécurisés
- **Protection des routes** : Authentification requise
- **Gestion des sessions** : Persistance avec Zustand
- **Validation des données** : Contrôles de saisie

## 📈 Évolutions Futures

- [ ] Intégration API backend
- [ ] Système de notifications
- [ ] Export des données
- [ ] Rapports avancés
- [ ] Gestion des permissions
- [ ] API pour l'IA de recherche

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support, contactez l'équipe de développement.

---

**Développé avec ❤️ par l'équipe Dowonou**
