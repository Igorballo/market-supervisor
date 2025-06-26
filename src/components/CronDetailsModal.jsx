import React, { useState } from 'react';
import { 
  XMarkIcon, 
  ArrowTopRightOnSquareIcon, 
  CalendarIcon, 
  TagIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  PauseIcon,
  ChartBarIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import useStore from '../store/useStore';

const CronDetailsModal = ({ isOpen, onClose, cron }) => {
  const { searchResults } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  if (!isOpen || !cron) return null;

  const cronResults = cron.searchResults || [];
  const totalPages = Math.ceil(cronResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = cronResults.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Date invalide';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col border border-white/20">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative h-full flex flex-col">
          {/* Header - Fixe */}
          <div className="p-6 border-b border-white/20 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <MagnifyingGlassIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {cron.name}
                  </h2>
                  <p className="text-blue-200 text-base">
                    Résultats de recherche automatisée
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 text-blue-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Informations du Cron - Fixe */}
          <div className="p-6 border-b border-white/20 flex-shrink-0">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl w-fit mx-auto mb-2">
                    <PlayIcon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-blue-200 text-xs font-medium">Statut</p>
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium mt-1 ${
                    cron.isActive 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {cron.isActive ? '🟢 Actif' : '🔴 Inactif'}
                  </span>
                </div>
                
                <div className="text-center">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl w-fit mx-auto mb-2">
                    <ChartBarIcon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-blue-200 text-xs font-medium">Recherches</p>
                  <p className="text-lg font-bold text-white">{cron.searchCount || 0}</p>
                </div>
                
                <div className="text-center">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl w-fit mx-auto mb-2">
                    <ClockIcon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-blue-200 text-xs font-medium">Créé le</p>
                  <p className="text-white text-sm font-medium">{formatDate(cron.createdAt)}</p>
                </div>

                <div className="text-center">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl w-fit mx-auto mb-2">
                    <TagIcon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-blue-200 text-xs font-medium">Tags</p>
                  <p className="text-white text-sm font-medium">{cron.tags?.length || 0}</p>
                </div>
              </div>

              {/* Tags */}
              {cron.tags && cron.tags.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-blue-200 text-xs font-medium mb-2">Tags de recherche</p>
                  <div className="flex flex-wrap gap-1">
                    {cron.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 border border-blue-500/30"
                      >
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Résultats de recherche - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Résultats de recherche
                </h3>
                <span className="px-3 py-1 bg-white/10 rounded-lg text-blue-200 text-sm font-medium">
                  {cronResults.length} résultat{cronResults.length !== 1 ? 's' : ''}
                </span>
              </div>

              {cronResults.length === 0 ? (
                <div className="text-center py-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="relative p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                      <MagnifyingGlassIcon className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-3">
                        Aucun résultat pour le moment
                      </h3>
                      <p className="text-blue-200 text-base">
                        Les résultats de recherche apparaîtront ici une fois les recherches effectuées
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {currentResults.map((result, index) => (
                      <div
                        key={result.id || index}
                        className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-500 hover:scale-[1.01]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors flex-1 mr-4">
                              {result.title}
                            </h4>
                            <a
                              href={result.source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                            >
                              Voir la source
                              <ArrowTopRightOnSquareIcon className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                          
                          <p className="text-blue-200 text-sm mb-3 leading-relaxed">
                            {result.summary}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-blue-300">
                              <span className="flex items-center">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {formatDate(result.createdAt)}
                              </span>
                              {result.tags && result.tags.length > 0 && (
                                <div className="flex items-center space-x-1">
                                  {result.tags.slice(0, 3).map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="px-1 py-0.5 bg-white/10 text-blue-200 rounded text-xs border border-white/20"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {result.tags.length > 3 && (
                                    <span className="text-blue-400">+{result.tags.length - 3}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination améliorée */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-blue-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-sm"
                      >
                        <ChevronLeftIcon className="h-3 w-3 mr-1" />
                        Précédent
                      </button>
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                : 'bg-white/10 text-blue-200 hover:bg-white/20 border border-white/20'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="flex items-center px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-blue-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-sm"
                      >
                        Suivant
                        <ChevronRightIcon className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CronDetailsModal; 