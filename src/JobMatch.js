import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const JobMatch = () => {
  const { t } = useTranslation();
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    // In a real application, you would make an API call to a backend service
    // that then calls the Gemini API. For this example, we will simulate the call.
    
    const simulatedAnalysis = t('jobMatch.simulatedAnalysis');

    setTimeout(() => {
        setAnalysisResult(simulatedAnalysis);
        setIsLoading(false);
    }, 2000); // Simulate network delay

  };

  return (
    <section>
      <h2>{t('jobMatch.title')}</h2>
      <p>{t('jobMatch.description')}</p>
      <textarea 
        rows="10" 
        style={{width: '100%', padding: '10px', boxSizing: 'border-box'}}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder={t('jobMatch.placeholder')}
      />
      <button onClick={handleAnalyze} disabled={isLoading}>
        {isLoading ? t('jobMatch.loading') : t('jobMatch.button')}
      </button>
      {analysisResult && (
        <div style={{marginTop: '20px', whiteSpace: 'pre-wrap'}}>
          <h3>{t('jobMatch.resultTitle')}</h3>
          <p>{analysisResult}</p>
        </div>
      )}
    </section>
  );
};

export default JobMatch;