import React, { useState } from 'react';
import { XMarkIcon, ArrowTopRightOnSquareIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
import useStore from '../store/useStore';

const CronDetailsModal = ({ isOpen, onClose, cron }) => {
  const { searchResults } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  if (!isOpen || !cron) return null;

  const cronResults = searchResults[cron.id] || [];
  const totalPages = Math.ceil(cronResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = cronResults.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {cron.name}
              </h2>
              <p className="text-gray-600 mt-1">
                Détails et résultats de recherche
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Informations du Cron */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Statut</p>
                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                  cron.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {cron.isActive ? 'Actif' : 'Inactif'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Recherches effectuées</p>
                <p className="text-lg font-semibold text-gray-900">{cron.searchCount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Créé le</p>
                <p className="text-gray-900">{formatDate(cron.createdAt)}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Tags de recherche</p>
              <div className="flex flex-wrap gap-2">
                {cron.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                  >
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Résultats de recherche */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Résultats de recherche ({cronResults.length})
            </h3>

            {cronResults.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Aucun résultat de recherche pour le moment</p>
                <p className="text-sm">Les résultats apparaîtront ici une fois les recherches effectuées</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {currentResults.map((result) => (
                    <div
                      key={result.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {result.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {result.summary}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {formatDate(result.date)}
                              </span>
                              {result.tags && result.tags.length > 0 && (
                                <div className="flex items-center space-x-1">
                                  {result.tags.slice(0, 3).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {result.tags.length > 3 && (
                                    <span className="text-gray-400">+{result.tags.length - 3}</span>
                                  )}
                                </div>
                              )}
                            </div>
                            <a
                              href={result.source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Voir la source
                              <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Précédent
                    </button>
                    
                    <span className="text-sm text-gray-600">
                      Page {currentPage} sur {totalPages}
                    </span>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Suivant
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Bouton de fermeture */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CronDetailsModal; 