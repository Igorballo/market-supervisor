// Fichier de test pour vérifier la connectivité API
import { API_CONFIG, buildApiUrl, getAuthHeaders } from './apiConfig';
import { cronService } from './cronService';
import { companyService } from './companyService';

export const testApiConnection = async () => {
  try {
    console.log('🔍 Test de connectivité API...');
    console.log('URL de base:', API_CONFIG.BASE_URL);
    
    // Test de connectivité basique
    const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
      method: 'GET',
      headers: API_CONFIG.DEFAULT_HEADERS,
    });
    
    if (response.ok) {
      console.log('✅ API accessible');
      return true;
    } else {
      console.log('⚠️ API accessible mais endpoint /health non trouvé');
      return true; // L'API répond, c'est bon signe
    }
  } catch (error) {
    console.error('❌ Erreur de connectivité API:', error);
    console.log('💡 Vérifiez que votre backend est démarré sur:', API_CONFIG.BASE_URL);
    return false;
  }
};

export const testCronCreation = async (cronData) => {
  try {
    console.log('🧪 Test de création de cron...');
    console.log('Données du cron:', cronData);
    
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.CRONS.CREATE);
    console.log('URL de création:', url);
    
    const headers = getAuthHeaders();
    console.log('Headers:', headers);
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(cronData),
    });
    
    console.log('Status de la réponse:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Cron créé avec succès:', data);
      return { success: true, data };
    } else {
      const errorData = await response.json();
      console.error('❌ Erreur lors de la création:', errorData);
      return { success: false, error: errorData };
    }
  } catch (error) {
    console.error('❌ Erreur de réseau:', error);
    return { success: false, error: error.message };
  }
};

export const testCronCreationWithDifferentPayloads = async () => {
  console.log('🧪 Test de création avec différents payloads...');
  
  const testPayloads = [
    // Payload minimal
    {
      name: "Test Cron Minimal",
      companyId: 1
    },
    // Payload avec tags
    {
      name: "Test Cron avec Tags",
      companyId: 1,
      tags: ["test", "cron"]
    },
    // Payload complet
    {
      name: "Test Cron Complet",
      companyId: 1,
      tags: ["test", "cron"],
      description: "Description de test"
    }
  ];

  for (let i = 0; i < testPayloads.length; i++) {
    console.log(`\n--- Test ${i + 1}: ${testPayloads[i].name} ---`);
    const result = await testCronCreation(testPayloads[i]);
    console.log(`Résultat:`, result);
  }
};

// Fonction de test pour vérifier les appels d'API uniques
export const testSingleApiCall = async (serviceFunction, data, testName) => {
  console.log(`🧪 Test: ${testName}`);
  console.log('📤 Données envoyées:', data);
  
  const startTime = Date.now();
  try {
    const result = await serviceFunction(data);
    const endTime = Date.now();
    
    console.log(`✅ ${testName} réussi en ${endTime - startTime}ms`);
    console.log('📥 Résultat reçu:', result);
    return result;
  } catch (error) {
    const endTime = Date.now();
    console.error(`❌ ${testName} échoué en ${endTime - startTime}ms:`, error);
    throw error;
  }
};

// Fonction pour tester la création de cron sans double appel
export const testCronCreationSingleCall = async () => {
  const tags = ["test", "unique"];
  const testData = {
    name: "Test Cron Unique",
    tags: tags,
    keywords: tags.join(' '), // Générer le keyword à partir des tags
    companyId: 1,
    description: "Test pour vérifier l'appel unique"
  };
  
  return await testSingleApiCall(
    cronService.createCron,
    testData,
    "Création de Cron - Appel Unique"
  );
};

// Fonction pour tester la création d'entreprise sans double appel
export const testCompanyCreationSingleCall = async () => {
  const testData = {
    name: "Test Entreprise Unique",
    email: "test@unique.com",
    telephone: "+1234567890",
    country: "France",
    sector: "Technologie",
    website: "https://test-unique.com"
  };
  
  return await testSingleApiCall(
    companyService.createCompany,
    testData,
    "Création d'Entreprise - Appel Unique"
  );
};

// Fonction pour tester la modification d'entreprise sans double appel
export const testCompanyUpdateSingleCall = async () => {
  const testData = {
    name: "Test Entreprise Modifiée",
    email: "modifie@test.com",
    telephone: "+9876543210",
    country: "France",
    sector: "Technologie",
    website: "https://test-modifie.com",
    isActive: true
  };
  
  return await testSingleApiCall(
    (id, data) => companyService.updateCompany(id, data),
    [1, testData],
    "Modification d'Entreprise - Appel Unique"
  );
};

export default {
  testApiConnection,
  testCronCreation,
  testCronCreationWithDifferentPayloads
}; 