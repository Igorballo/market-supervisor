import React from 'react';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  ChartBarIcon, 
  CogIcon,
  ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/outline';
import useStore from '../store/useStore';

const DashboardNav = ({ activeTab, onTabChange }) => {
  const { currentUser, logout } = useStore();

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: HomeIcon },
    { id: 'crons', name: 'Mes Crons', icon: MagnifyingGlassIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'settings', name: 'Paramètres', icon: CogIcon },
  ];

  const handleLogout = async () => {
    try {
      console.log('🔄 Déconnexion en cours...');
      await logout();
      console.log('✅ Déconnexion réussie');
      
      // Rediriger vers la page de login
      window.location.href = '/login';
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
      // Rediriger quand même vers la page de login
      window.location.href = '/login';
    }
  };

  return (
    <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo et nom */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold uppercase bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Market Supervisor
              </h1>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-400 bg-blue-500/20 border border-blue-500/30'
                        : 'text-blue-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="text-sm">
                <p className="text-white font-medium">{currentUser?.name}</p>
                <p className="text-blue-200">{currentUser?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-blue-200 hover:text-white hover:bg-red-500/20 border border-red-500/30 hover:border-red-400/50 rounded-xl transition-all duration-300 text-sm"
            >
              <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden">
          <div className="flex items-center space-x-4 overflow-x-auto py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-400 bg-blue-500/20 border border-blue-500/30'
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav; 