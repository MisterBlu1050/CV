import { GEMINI_CONFIG, getResumeContext, getAnalysisPrompt } from '../config/gemini.js';

export class GeminiService {
  static async analyzeJobMatch(jobDescription) {
    if (!GEMINI_CONFIG.apiKey) {
      throw new Error('Clé API Gemini manquante. Veuillez configurer REACT_APP_GEMINI_API_KEY dans votre fichier .env');
    }

    const prompt = getAnalysisPrompt(jobDescription);
    const resumeContext = getResumeContext();
    
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${resumeContext}\n\n${prompt}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    };

    try {
      const response = await fetch(`${GEMINI_CONFIG.apiUrl}?key=${GEMINI_CONFIG.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Erreur API Gemini: ${response.status} - ${errorData.error?.message || 'Erreur inconnue'}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Réponse invalide de l\'API Gemini');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Erreur lors de l\'appel à Gemini:', error);
      throw error;
    }
  }

  static getSimulatedAnalysis() {
    return `**Partie 1 : Points forts du profil par rapport à la description de poste**

• **Expertise en ressources humaines et psychologie :** Bruno possède une formation solide en psychologie du travail et une expérience pratique en RH, ce qui lui donne une compréhension approfondie des dynamiques humaines en entreprise.

• **Compétences en médiation et conseil :** Son expérience comme médiateur au VDAB démontre ses capacités à faciliter les relations professionnelles et à analyser les besoins des clients.

• **Transition technologique réussie :** Sa reconversion vers le développement ChatGPT et les applications mobiles montre une grande adaptabilité et une curiosité pour les nouvelles technologies.

• **Polyglotte :** Maîtrise de 4 langues (français, italien, anglais, néerlandais) - un atout majeur pour les environnements multiculturels.

• **Expérience pratique variée :** De l'impression 3D au développement d'applications, Bruno a prouvé sa capacité à évoluer dans différents domaines techniques.

**Partie 2 : Points de préoccupation ou faiblesses du profil par rapport à la description de poste**

• **Manque de détails techniques :** Les descriptions d'expérience manquent parfois de précisions sur les technologies spécifiques utilisées et les réalisations quantifiables.

• **Expérience récente en développement :** Bien qu'il soit développeur ChatGPT depuis 2022, l'expérience reste relativement courte pour des postes techniques senior.

• **Diversité des expériences :** La variété des domaines d'expertise pourrait être perçue comme un manque de spécialisation approfondie dans un domaine particulier.

**Partie 3 : Score sur 100 pour le profil**

**Score : 85/100**

**Résumé de l'évaluation :**
Bruno Mineo présente un profil unique et très intéressant qui combine excellence relationnelle et compétences techniques émergentes. Sa formation en psychologie et son expérience en RH lui donnent une compréhension rare des aspects humains du travail, complétée par sa transition réussie vers les technologies modernes. 

Son parcours démontre une grande capacité d'adaptation et d'apprentissage continu. Les compétences linguistiques sont un véritable atout pour les entreprises internationales. 

Les points d'amélioration concernent principalement la nécessité de davantage détailler ses réalisations techniques concrètes et de quantifier ses impacts. Dans l'ensemble, c'est un candidat avec un potentiel élevé, particulièrement adapté pour des rôles qui nécessitent à la fois expertise technique et intelligence relationnelle.`;
  }
}
