import React from 'react';
import { 
  ChartBarIcon, 
  TrendingUpIcon, 
  ClockIcon, 
  TagIcon,
  CalendarIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import useStore from '../store/useStore';

const Analytics = () => {
  const { currentUser, crons, searchResults } = useStore();
  
  const userCrons = crons[currentUser?.id] || [];
  const allResults = Object.values(searchResults).flat();

  // Calculer les statistiques
  const totalSearches = userCrons.reduce((sum, cron) => sum + cron.searchCount, 0);
  const activeCrons = userCrons.filter(cron => cron.isActive).length;
  const totalCrons = userCrons.length;
  
  // Statistiques par mois (derniers 6 mois)
  const getMonthlyStats = () => {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('fr-FR', { month: 'short' });
      const year = date.getFullYear();
      
      // Simuler des données pour les mois précédents
      const searches = Math.floor(Math.random() * 50) + 10;
      const newCrons = Math.floor(Math.random() * 3) + 1;
      
      months.push({
        month: monthName,
        year,
        searches,
        newCrons
      });
    }
    
    return months;
  };

  const monthlyStats = getMonthlyStats();

  // Tags les plus populaires
  const getPopularTags = () => {
    const tagCounts = {};
    
    userCrons.forEach(cron => {
      cron.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([tag, count]) => ({ tag, count }));
  };

  const popularTags = getPopularTags();

  return (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Recherches</p>
              <p className="text-2xl font-bold text-gray-900">{totalSearches}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUpIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Crons Actifs</p>
              <p className="text-2xl font-bold text-gray-900">{activeCrons}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Crons</p>
              <p className="text-2xl font-bold text-gray-900">{totalCrons}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <GlobeAltIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Taux de Succès</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution mensuelle */}
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Évolution des recherches
          </h3>
          <div className="space-y-4">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900">
                    {stat.month} {stat.year}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {stat.searches} recherches
                  </span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(stat.searches / 60) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags populaires */}
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tags les plus utilisés
          </h3>
          <div className="space-y-3">
            {popularTags.map((tag, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <TagIcon className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {tag.tag}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {tag.count} utilisations
                  </span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(tag.count / Math.max(...popularTags.map(t => t.count))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activité récente */}
      <div className="bg-white rounded-xl shadow-sm p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Activité récente
        </h3>
        <div className="space-y-4">
          {userCrons.slice(0, 5).map((cron) => (
            <div key={cron.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <MagnifyingGlassIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{cron.name}</h4>
                  <p className="text-sm text-gray-600">
                    {cron.searchCount} recherches effectuées
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Dernière activité
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {cron.lastSearch ? new Date(cron.lastSearch).toLocaleDateString('fr-FR') : 'Jamais'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics; 