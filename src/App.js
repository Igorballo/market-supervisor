import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './Router';
import useStore from './store/useStore';
import './App.css';

function App() {
  const { isAuthenticated, currentUser } = useStore();

  useEffect(() => {
    console.log('App - État d\'authentification:', { isAuthenticated, currentUser });
    
    // Vérifier si l'utilisateur est connecté au chargement de l'app
    if (isAuthenticated && !currentUser) {
      console.log('Utilisateur authentifié mais données manquantes');
      // Optionnel : essayer de récupérer les données utilisateur depuis l'API
    }
  }, [isAuthenticated, currentUser]);

  return (
    <Router>
      <div className="App">
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
