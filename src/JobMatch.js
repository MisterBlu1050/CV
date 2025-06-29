import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GeminiService } from './services/GeminiService';
import './JobMatch.css';

const JobMatch = () => {
  const { t } = useTranslation();
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Veuillez entrer une description de poste ou un titre.');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysisResult('');

    try {
      console.log('🔄 Démarrage de l\'analyse...');
      // Try to use the real Gemini API first
      const analysis = await GeminiService.analyzeJobMatch(jobDescription);
      setAnalysisResult(analysis);
      console.log('✅ Analyse terminée avec succès via Gemini API');
    } catch (error) {
      console.warn('⚠️ Erreur avec l\'API Gemini, utilisation de l\'analyse simulée:', error.message);
      
      // Fallback to simulated analysis if API fails
      const simulatedAnalysis = GeminiService.getSimulatedAnalysis();
      setAnalysisResult(simulatedAnalysis);
      
      // Show a warning to the user about using simulated analysis
      setError(`Mode démo: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDebugInfo = () => {
    setShowDebugInfo(!showDebugInfo);
  };

  return (
    <section className="job-match-container">
      <h2 className="job-match-title">{t('jobMatch.title')}</h2>
      <p className="job-match-description">{t('jobMatch.description')}</p>
      
      <div style={{ marginBottom: '20px' }}>
        <textarea 
          rows="8" 
          className="job-match-textarea"
          value={jobDescription}
          onChange={(e) => {
            setJobDescription(e.target.value);
            setError(''); // Clear error when user starts typing
          }}
          placeholder={t('jobMatch.placeholder')}
        />
      </div>

      <button 
        onClick={handleAnalyze} 
        disabled={isLoading || !jobDescription.trim()}
        className={`job-match-button ${isLoading ? 'loading' : ''}`}
      >
        {isLoading ? t('jobMatch.loading') : t('jobMatch.button')}
      </button>

      {error && (
        <div className="job-match-error">
          ⚠️ {error}
          <button 
            onClick={handleDebugInfo}
            style={{ 
              marginLeft: '10px', 
              padding: '4px 8px', 
              fontSize: '12px',
              background: 'transparent',
              border: '1px solid #856404',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showDebugInfo ? 'Masquer' : 'Debug'}
          </button>
        </div>
      )}

      {showDebugInfo && (
        <div style={{
          padding: '12px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '12px',
          fontFamily: 'monospace'
        }}>
          <strong>Informations de debug :</strong><br/>
          • Clé API définie : {process.env.REACT_APP_GEMINI_API_KEY ? 'Oui' : 'Non'}<br/>
          • Longueur de la clé : {process.env.REACT_APP_GEMINI_API_KEY?.length || 0} caractères<br/>
          • Début de la clé : {process.env.REACT_APP_GEMINI_API_KEY?.substring(0, 15) || 'Non définie'}...<br/>
          • URL API : {process.env.NODE_ENV === 'development' ? 'Mode développement' : 'Mode production'}<br/>
          <br/>
          <strong>Solutions :</strong><br/>
          1. Vérifiez que le fichier .env existe à la racine du projet<br/>
          2. Redémarrez l'application après avoir modifié .env<br/>
          3. Vérifiez votre clé API sur <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a>
        </div>
      )}

      {analysisResult && (
        <div className="job-match-result">
          <h3 className="job-match-result-title">{t('jobMatch.resultTitle')}</h3>
          <div className="job-match-result-content">
            {analysisResult}
          </div>
        </div>
      )}
    </section>
  );
};

export default JobMatch;