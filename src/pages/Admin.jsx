import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useStore from '../store/useStore';
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Admin = () => {
  const { addCompany } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Données statiques pour l'aperçu
  const [staticCompanies] = useState([
    {
      id: 1,
      name: "TechCorp Solutions",
      email: "contact@techcorp.com",
      phone: "+33 1 23 45 67 89",
      country: "France",
      sector: "Technologie",
      website: "https://techcorp.com",
      createdAt: "2024-01-15",
      status: "active"
    },
    {
      id: 2,
      name: "Digital Marketing Pro",
      email: "info@digitalmarketingpro.com",
      phone: "+33 1 98 76 54 32",
      country: "France",
      sector: "Marketing",
      website: "https://digitalmarketingpro.com",
      createdAt: "2024-01-12",
      status: "active"
    },
    {
      id: 3,
      name: "Fintech Innovations",
      email: "hello@fintechinnovations.com",
      phone: "+33 1 45 67 89 12",
      country: "France",
      sector: "Finance",
      website: "https://fintechinnovations.com",
      createdAt: "2024-01-10",
      status: "pending"
    },
    {
      id: 4,
      name: "Green Energy Solutions",
      email: "contact@greenenergy.com",
      phone: "+33 1 34 56 78 90",
      country: "France",
      sector: "Énergie",
      website: "https://greenenergy.com",
      createdAt: "2024-01-08",
      status: "active"
    }
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const newCompany = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    addCompany(newCompany);
    setSuccessMessage('Entreprise ajoutée avec succès !');
    setShowForm(false);
    reset();
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
                Administration
              </h1>
              <p className="text-blue-200 text-lg">
                Gérez les entreprises et leurs accès à la plateforme
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Ajouter une entreprise
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-8 p-4 bg-green-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-green-300">{successMessage}</span>
            </div>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 max-w-2xl w-full mx-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Ajouter une entreprise</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-blue-200 text-sm font-medium mb-2">
                        Nom de l'entreprise *
                      </label>
                      <div className="relative">
                        <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <input
                          type="text"
                          {...register('name', { required: 'Le nom est requis' })}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                          placeholder="Nom de l'entreprise"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-blue-200 text-sm font-medium mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <input
                          type="email"
                          {...register('email', { 
                            required: 'L\'email est requis',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Email invalide'
                            }
                          })}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                          placeholder="contact@entreprise.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-blue-200 text-sm font-medium mb-2">
                        Téléphone
                      </label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <input
                          type="tel"
                          {...register('phone')}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-blue-200 text-sm font-medium mb-2">
                        Pays *
                      </label>
                      <div className="relative">
                        <GlobeAltIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <select
                          {...register('country', { required: 'Le pays est requis' })}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                        >
                          <option value="">Sélectionner un pays</option>
                          <option value="France">France</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Suisse">Suisse</option>
                          <option value="Canada">Canada</option>
                          <option value="Luxembourg">Luxembourg</option>
                        </select>
                      </div>
                      {errors.country && (
                        <p className="text-red-400 text-sm mt-1">{errors.country.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-blue-200 text-sm font-medium mb-2">
                        Secteur d'activité *
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <select
                          {...register('sector', { required: 'Le secteur est requis' })}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                        >
                          <option value="">Sélectionner un secteur</option>
                          <option value="Technologie">Technologie</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Finance">Finance</option>
                          <option value="Santé">Santé</option>
                          <option value="Éducation">Éducation</option>
                          <option value="Énergie">Énergie</option>
                          <option value="Transport">Transport</option>
                          <option value="Commerce">Commerce</option>
                        </select>
                      </div>
                      {errors.sector && (
                        <p className="text-red-400 text-sm mt-1">{errors.sector.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-blue-200 text-sm font-medium mb-2">
                        Site web
                      </label>
                      <div className="relative">
                        <GlobeAltIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        <input
                          type="url"
                          {...register('website')}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                          placeholder="https://www.entreprise.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 text-blue-200 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Ajouter l'entreprise
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Companies List */}
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          <div className="relative p-8 border-b border-white/20">
            <h2 className="text-2xl font-bold text-white mb-2">
              Entreprises enregistrées
            </h2>
            <p className="text-blue-200">
              {staticCompanies.length} entreprises actuellement enregistrées
            </p>
          </div>

          <div className="relative p-8">
            <div className="grid gap-6">
              {staticCompanies.map((company) => (
                <div
                  key={company.id}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <h3 className="text-xl font-bold text-white mr-4">
                          {company.name}
                        </h3>
                        <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                          company.status === 'active'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        }`}>
                          {company.status === 'active' ? '🟢 Actif' : '🟡 En attente'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-blue-200">
                        <div className="flex items-center">
                          <EnvelopeIcon className="h-4 w-4 mr-2" />
                          {company.email}
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-2" />
                          {company.phone}
                        </div>
                        <div className="flex items-center">
                          <GlobeAltIcon className="h-4 w-4 mr-2" />
                          {company.country}
                        </div>
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                          {company.sector}
                        </div>
                      </div>

                      {company.website && (
                        <div className="mt-4">
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors"
                          >
                            <GlobeAltIcon className="h-4 w-4 mr-1" />
                            {company.website}
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button className="p-3 text-blue-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="p-3 text-blue-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="p-3 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-xl transition-all duration-300">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 