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

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo et nom */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">
                Dowonou Space
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
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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
                <p className="text-gray-900 font-medium">{currentUser?.name}</p>
                <p className="text-gray-500">{currentUser?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
            >
              <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-1" />
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
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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