import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useStore from '../store/useStore';
import { companyService } from '../services/companyService';
import { testCompanyCreationSingleCall, testCompanyUpdateSingleCall } from '../services/testApi';
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
  CheckCircleIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

const Admin = () => {
  const { 
    companies, 
    loading, 
    errors, 
    createCompany, 
    fetchCompanies,
    updateCompany
  } = useStore();
  
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTestingApi, setIsTestingApi] = useState(false);

  // Charger les entreprises au montage du composant
  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      console.log('🔄 Chargement des entreprises...');
      const companiesData = await fetchCompanies();
      console.log('✅ Entreprises chargées:', companiesData);
    } catch (error) {
      console.error('❌ Erreur lors du chargement des entreprises:', error);
    }
  };

  const testApiCalls = async () => {
    setIsTestingApi(true);
    try {
      console.log('🧪 Test des appels d\'API uniques pour les entreprises...');
      await testCompanyCreationSingleCall();
      await testCompanyUpdateSingleCall();
      alert('✅ Tests terminés ! Vérifiez la console pour les résultats.');
    } catch (error) {
      alert('❌ Erreur lors des tests: ' + error.message);
    } finally {
      setIsTestingApi(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors: formErrors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Préparer les données en renommant phone en telephone
      const companyData = {
        ...data,
        telephone: data.phone, // Renommer phone en telephone
        // isActive: true, // Par défaut, une nouvelle entreprise est active
      };
      
      // Supprimer le champ phone pour éviter les conflits
      delete companyData.phone;
      
      console.log('🔄 Création/Modification de l\'entreprise avec les données:', companyData);
      
      if (editingCompany) {
        // Modification d'une entreprise existante
        const updateData = {
          ...companyData,
          isActive: data.isActive !== undefined ? data.isActive : editingCompany.isActive // Utiliser la valeur du formulaire ou préserver le statut actuel
        };
        
        const updatedCompany = await updateCompany(editingCompany.id, updateData);
        console.log('✅ Entreprise modifiée avec succès:', updatedCompany);
        
        setSuccessMessage('Entreprise modifiée avec succès !');
      } else {
        // Création d'une nouvelle entreprise
        const newCompany = await createCompany(companyData);
        console.log('✅ Entreprise créée avec succès:', newCompany);
        
        setSuccessMessage('Entreprise ajoutée avec succès !');
      }
      
      setShowForm(false);
      setEditingCompany(null);
      reset();
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
    } catch (error) {
      console.error('❌ Erreur lors de la création/modification de l\'entreprise:', error);
      setSuccessMessage(`Erreur: ${error.message}`);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    // Pré-remplir le formulaire avec les données de l'entreprise
    setValue('name', company.name);
    setValue('email', company.email);
    setValue('phone', company.telephone || company.phone); // Gérer les deux cas
    setValue('country', company.country);
    setValue('sector', company.sector);
    setValue('website', company.website);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCompany(null);
    reset();
  };

  // Fonction utilitaire pour afficher le téléphone
  const getPhoneDisplay = (company) => {
    console.log('📞 Recherche téléphone pour:', company.name, company);
    const phone = company.telephone || company.phone || company.tel || company.telephoneNumber;
    console.log('📞 Téléphone trouvé:', phone);
    return phone || 'Non renseigné';
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
            <div className="flex items-center space-x-4">
              <button
                onClick={testApiCalls}
                disabled={isTestingApi}
                className="p-3 text-blue-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 disabled:opacity-50"
                title="Tester les appels d'API uniques"
              >
                {isTestingApi ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-300"></div>
                ) : (
                  <WrenchScrewdriverIcon className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Ajouter une entreprise
              </button>
            </div>
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

        {/* Error Message */}
        {errors.companies && (
          <div className="mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-center">
              <span className="text-red-300">Erreur: {errors.companies}</span>
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
                  <h2 className="text-2xl font-bold text-white">
                    {editingCompany ? 'Modifier l\'entreprise' : 'Ajouter une entreprise'}
                  </h2>
                  <button
                    onClick={handleCancel}
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
                      {formErrors.name && (
                        <p className="text-red-400 text-sm mt-1">{formErrors.name.message}</p>
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
                      {formErrors.email && (
                        <p className="text-red-400 text-sm mt-1">{formErrors.email.message}</p>
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
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                        >
                          <option value="">Sélectionner un pays</option>
                          <option value="France">France</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Suisse">Suisse</option>
                          <option value="Canada">Canada</option>
                          <option value="Luxembourg">Luxembourg</option>
                        </select>
                      </div>
                      {formErrors.country && (
                        <p className="text-red-400 text-sm mt-1">{formErrors.country.message}</p>
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
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
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
                      {formErrors.sector && (
                        <p className="text-red-400 text-sm mt-1">{formErrors.sector.message}</p>
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

                    {/* Champ pour le statut actif (seulement en mode édition) */}
                    {editingCompany && (
                      <div className="md:col-span-2">
                        <label className="block text-blue-200 text-sm font-medium mb-2">
                          Statut de l'entreprise
                        </label>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              {...register('isActive')}
                              defaultChecked={editingCompany.isActive === true}
                              className="sr-only"
                            />
                            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              editingCompany.isActive === true ? 'bg-green-500' : 'bg-gray-400'
                            }`}>
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                editingCompany.isActive === true ? 'translate-x-6' : 'translate-x-1'
                              }`} />
                            </div>
                            <span className="ml-3 text-blue-200">
                              {editingCompany.isActive === true ? '🟢 Actif' : '🟡 En attente'}
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 text-blue-200 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {editingCompany ? 'Modification en cours...' : 'Création en cours...'}
                        </>
                      ) : (
                        editingCompany ? 'Modifier l\'entreprise' : 'Ajouter l\'entreprise'
                      )}
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
              {companies.length} entreprises actuellement enregistrées
            </p>
          </div>

          <div className="relative p-8">
            {/* Indicateur de chargement */}
            {loading.companies && (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-blue-200">Chargement des entreprises...</p>
              </div>
            )}

            {/* Contenu principal */}
            {!loading.companies && companies.length === 0 ? (
              <div className="text-center py-16">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                  <div className="relative p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                    <BuildingOfficeIcon className="h-16 w-16 text-blue-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Aucune entreprise enregistrée
                    </h3>
                    <p className="text-blue-200 mb-8 text-lg">
                      Commencez par ajouter votre première entreprise
                    </p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Ajouter une entreprise
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-6">
                {companies.map((company) => {
                  console.log('🔍 Données de l\'entreprise:', company);
                  return (
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
                            company.isActive === true
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          }`}>
                            {company.isActive === true ? '🟢 Actif' : '🟡 En attente'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-base text-blue-200">
                          <div className="flex items-center">
                            <EnvelopeIcon className="h-4 w-4 mr-2" />
                            {company.email}
                          </div>
                          <div className="flex items-center">
                            <PhoneIcon className="h-4 w-4 mr-2" />
                            {getPhoneDisplay(company)}
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
                          <div className="mt-4 text-left">
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-base text-blue-300 hover:text-blue-200 transition-colors"
                            >
                              <GlobeAltIcon className="h-4 w-4 mr-1" />
                              {company.website}
                            </a>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleEdit(company)}
                          className="p-3 text-blue-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                          title="Modifier l'entreprise"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button className="p-3 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-xl transition-all duration-300">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 