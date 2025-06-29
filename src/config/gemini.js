// Configuration for Gemini API
export const GEMINI_CONFIG = {
  apiKey: process.env.REACT_APP_GEMINI_API_KEY || '', // Set your API key in .env file
  apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent',
  model: 'gemini-2.0-flash-exp'
};

// Resume data context for the AI analysis
export const getResumeContext = () => {
  return `
CV de Bruno Mineo:

Informations personnelles:
- Nom: Bruno Mineo
- Poste: Développeur ChatGPT & Conseiller Psychologique
- Email: mineobruno@hotmail.com
- Téléphone: +32 473 330 525
- Adresse: Avenue de la Couronne 193, Ixelles 1050
- LinkedIn: https://www.linkedin.com/in/mineo-bruno/
- Portfolio: www.instagram.com/plasmeo3d/

Résumé professionnel:
Un professionnel dévoué et polyvalent avec une formation en psychologie et en ressources humaines, qui s'oriente maintenant vers la technologie avec un focus sur le développement ChatGPT et les applications mobiles. Capacité avérée à combler les lacunes de communication, à analyser les besoins et à créer des solutions efficaces dans les domaines tant humains que techniques.

Expérience professionnelle:
1. Développeur ChatGPT (Nov 2022 - Présent) - Indépendant complémentaire, Ixelles, Belgique
   - Développement de prompts sur ChatGPT et construction d'une application mobile dans le secteur du conseil psychologique

2. Médiateur (Bemiddelaar) (Fév 2023 - Déc 2023) - Le VDAB, Bruxelles, Belgique
   - Expertise dans la mise en relation des demandeurs d'emploi avec les postes vacants
   - Analyse des besoins des clients
   - Déploiement d'outils numériques
   - Promotion de relations de travail durables

3. Conseiller en fusion de résines de cire Formlabs (Juil 2019 - Oct 2023) - Plasmeo3D, Ixelles, Belgique

4. Créateur de bijoux (Juin 2015 - Oct 2023) - Plasmeo3D, Ixelles, Belgique

5. Technicien en impression 3D (Jan 2014 - Oct 2023) - Plasmeo3D, Ixelles, Belgique

6. Assistant RH (Jan 2009 - Juil 2014) - Travail & Vie ASBL, Bruxelles, Belgique

7. Coordinateur de projets (Nov 2007 - Jan 2009) - Badje ASBL, Bruxelles, Belgique

Formation:
- Master en psychologie du travail (2008-2009) - Université Libre de Bruxelles
- Bachelier en psychologie (2005-2008) - Université Libre de Bruxelles
- Certificat en ressources humaines (2004-2005) - Institut des Hautes Études des Communications Sociales

Compétences:
Langues: Français (Natif), Italien (Natif), Anglais (Professionnel), Néerlandais (Professionnel)
Professionnelles: Ressources Humaines, Administration, Recrutement, Traduction
Techniques: Impression 3D, Développement de Prompts ChatGPT, Développement d'Applications Mobiles
`;
};

export const getAnalysisPrompt = (jobDescription, language = 'fr') => {
  const languageInstructions = {
    'fr': 'Veuillez fournir votre analyse en français et la formater clairement avec des sections appropriées et des points de liste le cas échéant.',
    'en': 'Please provide your analysis in English and format it clearly with proper sections and bullet points where appropriate.',
    'nl': 'Gelieve uw analyse in het Nederlands te verstrekken en duidelijk te formatteren met de juiste secties en opsommingstekens waar van toepassing.'
  };

  return `You are a recruitment expert with a specialization in human resources, administrative work, and psycho-social support. You master all the techniques needed to find the ideal candidate. You are fully capable of evaluating an application according to specific needs, from CV analysis to conducting interviews.

You apply a modern approach to recruitment, guided by concepts such as employer branding and employee advocacy.

Based on the CV stored in your knowledge base, I would like your help in evaluating it. To do so, please provide me with a full analysis in four parts:

Part 1: The strengths of the profile in relation to my job description.
Part 2: Areas of concern or weaknesses of the profile in relation to my job description.
Part 3: A score out of 100 for the profile, along with a summary of your evaluation.

Here is the job description to analyze against:
${jobDescription}

${languageInstructions[language] || languageInstructions['fr']}`;
};
