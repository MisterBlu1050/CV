import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GeminiService } from './services/GeminiService';
import { jobExamples } from './data/jobExamples';
import './JobMatch.css';

const JobMatch = () => {
  const { t } = useTranslation();
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoadExample = (exampleKey) => {
    setJobDescription(jobExamples[exampleKey]);
    setError('');
    setAnalysisResult('');
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Veuillez entrer une description de poste ou un titre.');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysisResult('');

    try {
      // Try to use the real Gemini API first
      const analysis = await GeminiService.analyzeJobMatch(jobDescription);
      setAnalysisResult(analysis);
    } catch (error) {
      console.warn('Erreur avec l\'API Gemini, utilisation de l\'analyse simulée:', error.message);
      
      // Fallback to simulated analysis if API fails
      const simulatedAnalysis = GeminiService.getSimulatedAnalysis();
      setAnalysisResult(simulatedAnalysis);
      
      // Show a warning to the user about using simulated analysis
      setError(`Mode démo: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="job-match-container">
      <h2 className="job-match-title">{t('jobMatch.title')}</h2>
      <p className="job-match-description">{t('jobMatch.description')}</p>
      
      <div style={{ marginBottom: '20px' }}>
        <div className="job-match-examples">
          <strong>Exemples rapides :</strong>
          {Object.keys(jobExamples).map((key) => (
            <button
              key={key}
              onClick={() => handleLoadExample(key)}
              className="job-match-example-button"
            >
              {key}
            </button>
          ))}
        </div>
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