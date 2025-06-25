import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import {
  ChartBarIcon,
  PlayIcon,
  CpuChipIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  PauseIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import DashboardNav from '../components/DashboardNav';
import CreateCronModal from '../components/CreateCronModal';
import CronDetailsModal from '../components/CronDetailsModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCronDetails, setShowCronDetails] = useState(false);
  const [selectedCron, setSelectedCron] = useState(null);

  // Données statiques pour l'aperçu
  const [totalSearches] = useState(1247);
  const [activeCrons] = useState(8);
  const [totalCrons] = useState(12);
  
  // Données statiques des crons
  const [userCrons] = useState([
    {
      id: 1,
      name: "Surveillance Concurrents Tech",
      isActive: true,
      createdAt: "2024-01-15",
      searchCount: 156,
      lastSearch: "2024-01-20",
      tags: ["Technologie", "Concurrence", "IA"],
      description: "Surveillance automatique des concurrents dans le secteur technologique",
      frequency: "Quotidien",
      keywords: ["intelligence artificielle", "machine learning", "startup tech"],
      results: [
        { title: "Nouvelle startup IA française", url: "https://example.com", date: "2024-01-20" },
        { title: "Innovation en machine learning", url: "https://example.com", date: "2024-01-19" }
      ]
    },
    {
      id: 2,
      name: "Veille Marketing Digital",
      isActive: true,
      createdAt: "2024-01-10",
      searchCount: 89,
      lastSearch: "2024-01-19",
      tags: ["Marketing", "Digital", "Tendances"],
      description: "Veille sur les nouvelles tendances du marketing digital",
      frequency: "Hebdomadaire",
      keywords: ["marketing digital", "tendances", "social media"],
      results: [
        { title: "Nouvelles tendances marketing 2024", url: "https://example.com", date: "2024-01-19" },
        { title: "Stratégies social media", url: "https://example.com", date: "2024-01-18" }
      ]
    },
    {
      id: 3,
      name: "Recherche Emploi IT",
      isActive: false,
      createdAt: "2024-01-05",
      searchCount: 234,
      lastSearch: "2024-01-15",
      tags: ["Emploi", "IT", "Développement"],
      description: "Surveillance des offres d'emploi en développement informatique",
      frequency: "Quotidien",
      keywords: ["développeur", "emploi", "informatique"],
      results: [
        { title: "Développeur React Senior", url: "https://example.com", date: "2024-01-15" },
        { title: "Full Stack Developer", url: "https://example.com", date: "2024-01-14" }
      ]
    },
    {
      id: 4,
      name: "Veille Fintech",
      isActive: true,
      createdAt: "2024-01-12",
      searchCount: 67,
      lastSearch: "2024-01-20",
      tags: ["Fintech", "Finance", "Innovation"],
      description: "Surveillance des innovations dans le secteur fintech",
      frequency: "Hebdomadaire",
      keywords: ["fintech", "innovation", "finance"],
      results: [
        { title: "Nouvelle solution de paiement", url: "https://example.com", date: "2024-01-20" },
        { title: "Cryptomonnaies et régulation", url: "https://example.com", date: "2024-01-19" }
      ]
    }
  ]);

  useEffect(() => {
    console.log('Dashboard - currentUser:', currentUser);
    if (!currentUser) {
      console.log('Pas d\'utilisateur connecté, redirection vers login');
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCronClick = (cron) => {
    setSelectedCron(cron);
    setShowCronDetails(true);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <DashboardNav onLogout={handleLogout} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques avec design moderne */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                <ChartBarIcon className="h-8 w-8 text-white" />
              </div>
              <div className="ml-6">
                <p className="text-blue-200 text-sm font-medium">Total Recherches</p>
                <p className="text-4xl font-bold text-white">{totalSearches}</p>
                <div className="flex items-center mt-2">
                  <SparklesIcon className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-green-400 text-sm">+12% ce mois</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                <PlayIcon className="h-8 w-8 text-white" />
              </div>
              <div className="ml-6">
                <p className="text-green-200 text-sm font-medium">Crons Actifs</p>
                <p className="text-4xl font-bold text-white">{activeCrons}</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1"></div>
                  <span className="text-green-400 text-sm">En cours d'exécution</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                <CpuChipIcon className="h-8 w-8 text-white" />
              </div>
              <div className="ml-6">
                <p className="text-purple-200 text-sm font-medium">Total Crons</p>
                <p className="text-4xl font-bold text-white">{totalCrons}</p>
                <div className="flex items-center mt-2">
                  <ClockIcon className="h-4 w-4 text-purple-400 mr-1" />
                  <span className="text-purple-400 text-sm">Tâches automatisées</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Crons avec design moderne */}
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          <div className="relative p-8 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                  Mes Tâches Automatisées
                </h2>
                <p className="text-blue-200">
                  Gérez vos recherches automatisées avec l'IA
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Nouveau Cron
              </button>
            </div>
          </div>

          <div className="relative p-8">
            {userCrons.length === 0 ? (
              <div className="text-center py-16">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                  <div className="relative p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                    <MagnifyingGlassIcon className="h-16 w-16 text-blue-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Aucun Cron créé
                    </h3>
                    <p className="text-blue-200 mb-8 text-lg">
                      Créez votre première tâche automatisée pour commencer
                    </p>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Créer un Cron
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-6">
                {userCrons.map((cron) => (
                  <div
                    key={cron.id}
                    className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                    onClick={() => handleCronClick(cron)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-4">
                          <h3 className="text-xl font-bold text-white mr-4">
                            {cron.name}
                          </h3>
                          <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                            cron.isActive 
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                              : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                          }`}>
                            {cron.isActive ? '🟢 Actif' : '⚫ Inactif'}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-8 text-sm text-blue-200 mb-4">
                          <span className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Créé le {new Date(cron.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="flex items-center">
                            <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                            {cron.searchCount} recherches
                          </span>
                          {cron.lastSearch && (
                            <span className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-2" />
                              Dernière: {new Date(cron.lastSearch).toLocaleDateString('fr-FR')}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {cron.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 border border-blue-500/30"
                            >
                              <TagIcon className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          className="p-3 text-blue-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Toggle cron status
                          }}
                        >
                          {cron.isActive ? (
                            <PauseIcon className="h-6 w-6" />
                          ) : (
                            <PlayIcon className="h-6 w-6" />
                          )}
                        </button>
                        <ArrowRightIcon className="h-6 w-6 text-blue-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateCronModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          companyId={currentUser.id}
        />
      )}

      {showCronDetails && selectedCron && (
        <CronDetailsModal
          isOpen={showCronDetails}
          onClose={() => setShowCronDetails(false)}
          cron={selectedCron}
        />
      )}
    </div>
  );
};

export default Dashboard; 