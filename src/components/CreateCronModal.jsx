import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon, PlusIcon, SparklesIcon, RocketLaunchIcon, TagIcon } from '@heroicons/react/24/outline';
import useStore from '../store/useStore';

const CreateCronModal = ({ isOpen, onClose, companyId }) => {
  const { addCron } = useStore();
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data) => {
    if (tags.length === 0) {
      alert('Veuillez ajouter au moins un tag');
      return;
    }

    setIsSubmitting(true);
    try {
      addCron({
        companyId,
        name: data.name,
        tags
      });
      reset();
      setTags([]);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la création du Cron:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
                <RocketLaunchIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  Créer une nouvelle tâche
                </h2>
                <p className="text-blue-200 text-sm">Automatisez vos recherches avec l'IA</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nom du Cron */}
            <div className="group">
              <label className="block text-sm font-medium text-blue-200 mb-3">
                Nom de la tâche
              </label>
              <input
                type="text"
                {...register("name", { required: "Le nom est requis" })}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-white placeholder-blue-300/50 backdrop-blur-sm"
                placeholder="Ex: Appels d'offres Construction Togo"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-3">
                Tags de recherche
              </label>
              <div className="flex space-x-3 mb-4">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-white placeholder-blue-300/50 backdrop-blur-sm"
                  placeholder="Ajouter un tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Tags affichés */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="group inline-flex items-center px-3 py-2 rounded-full text-sm bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-200 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300"
                  >
                    <TagIcon className="h-4 w-4 mr-2" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-emerald-300 hover:text-emerald-100 transition-colors"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>

              {tags.length === 0 && (
                <p className="text-sm text-blue-300 mt-3">
                  Ajoutez des tags pour définir les critères de recherche
                </p>
              )}
            </div>

            {/* Exemples de tags */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h4 className="text-sm font-medium text-blue-200 mb-3 flex items-center">
                <SparklesIcon className="h-4 w-4 mr-2" />
                Exemples de tags populaires :
              </h4>
              <div className="flex flex-wrap gap-2">
                {['construction', 'Togo', 'appels d\'offres', 'énergie', 'BTP', 'Lomé'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      if (!tags.includes(tag)) {
                        setTags([...tags, tag]);
                      }
                    }}
                    className="text-xs px-3 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-blue-200 hover:text-white"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Boutons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting || tags.length === 0}
                className="flex-1 group relative px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Création...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <RocketLaunchIcon className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Créer la tâche
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCronModal; 