import { GEMINI_CONFIG, getResumeContext, getAnalysisPrompt } from '../config/gemini.js';

export class GeminiService {
  static async analyzeJobMatch(jobDescription, language = 'fr') {
    console.log('🔍 Vérification de la clé API...', {
      hasKey: !!GEMINI_CONFIG.apiKey,
      keyLength: GEMINI_CONFIG.apiKey ? GEMINI_CONFIG.apiKey.length : 0,
      keyStart: GEMINI_CONFIG.apiKey ? GEMINI_CONFIG.apiKey.substring(0, 10) + '...' : 'Non définie',
      language: language
    });

    if (!GEMINI_CONFIG.apiKey) {
      throw new Error('Clé API Gemini manquante. Veuillez configurer REACT_APP_GEMINI_API_KEY dans votre fichier .env');
    }

    if (GEMINI_CONFIG.apiKey.length < 20) {
      throw new Error('Clé API Gemini invalide. Vérifiez que votre clé API est complète dans le fichier .env');
    }

    const prompt = getAnalysisPrompt(jobDescription, language);
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

    console.log('🚀 Envoi de la requête à Gemini...', {
      url: GEMINI_CONFIG.apiUrl,
      hasContent: !!requestBody.contents[0].parts[0].text
    });

    try {
      const response = await fetch(`${GEMINI_CONFIG.apiUrl}?key=${GEMINI_CONFIG.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('📡 Réponse reçue:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Erreur API détaillée:', errorData);
        
        if (response.status === 403) {
          throw new Error('Clé API invalide ou quota dépassé. Vérifiez votre clé sur Google AI Studio.');
        } else if (response.status === 429) {
          throw new Error('Trop de requêtes. Attendez quelques minutes avant de réessayer.');
        } else {
          throw new Error(`Erreur API Gemini (${response.status}): ${errorData.error?.message || 'Erreur inconnue'}`);
        }
      }

      const data = await response.json();
      console.log('✅ Données reçues:', {
        hasCandidates: !!data.candidates,
        candidatesLength: data.candidates?.length || 0
      });
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error('❌ Structure de réponse invalide:', data);
        throw new Error('Réponse invalide de l\'API Gemini');
      }

      const result = data.candidates[0].content.parts[0].text;
      console.log('🎉 Analyse terminée avec succès!');
      return result;
      
    } catch (error) {
      console.error('💥 Erreur lors de l\'appel à Gemini:', error);
      throw error;
    }
  }

  static getSimulatedAnalysis(language = 'fr') {
    const analyses = {
      'fr': `**Partie 1 : Points forts du profil par rapport à la description de poste**

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

Les points d'amélioration concernent principalement la nécessité de davantage détailler ses réalisations techniques concrètes et de quantifier ses impacts. Dans l'ensemble, c'est un candidat avec un potentiel élevé, particulièrement adapté pour des rôles qui nécessitent à la fois expertise technique et intelligence relationnelle.`,

      'en': `**Part 1: Strengths of the Profile in Relation to the Job Description**

• **Human Resources and Psychology Expertise:** Bruno has solid training in work psychology and practical HR experience, giving him deep understanding of human dynamics in business.

• **Mediation and Counseling Skills:** His experience as a mediator at VDAB demonstrates his ability to facilitate professional relationships and analyze client needs.

• **Successful Technology Transition:** His career shift to ChatGPT development and mobile applications shows great adaptability and curiosity for new technologies.

• **Multilingual:** Mastery of 4 languages (French, Italian, English, Dutch) - a major asset for multicultural environments.

• **Diverse Practical Experience:** From 3D printing to application development, Bruno has proven his ability to evolve across different technical domains.

**Part 2: Areas of Concern or Weaknesses of the Profile in Relation to the Job Description**

• **Lack of Technical Details:** Experience descriptions sometimes lack precision on specific technologies used and quantifiable achievements.

• **Recent Development Experience:** Although he has been a ChatGPT developer since 2022, the experience remains relatively short for senior technical positions.

• **Diversity of Experiences:** The variety of expertise domains could be perceived as a lack of deep specialization in a particular area.

**Part 3: Score out of 100 for the Profile**

**Score: 85/100**

**Evaluation Summary:**
Bruno Mineo presents a unique and very interesting profile that combines relational excellence and emerging technical skills. His psychology training and HR experience give him rare understanding of the human aspects of work, complemented by his successful transition to modern technologies.

His journey demonstrates great adaptability and continuous learning capacity. Language skills are a real asset for international companies.

Areas for improvement mainly concern the need to provide more detail on concrete technical achievements and quantify his impacts. Overall, he is a candidate with high potential, particularly suited for roles requiring both technical expertise and relational intelligence.`,

      'nl': `**Deel 1: Sterke punten van het profiel in relatie tot de functiebeschrijving**

• **HR en Psychologie Expertise:** Bruno heeft een solide opleiding in arbeidspsychologie en praktische HR-ervaring, wat hem diep inzicht geeft in menselijke dynamiek in bedrijven.

• **Bemiddelings- en Adviesvaardigheden:** Zijn ervaring als bemiddelaar bij de VDAB toont zijn vermogen om professionele relaties te faciliteren en klantbehoeften te analyseren.

• **Succesvolle Technologie Transitie:** Zijn carrièreswitch naar ChatGPT-ontwikkeling en mobiele applicaties toont grote aanpassingsvermogen en nieuwsgierigheid naar nieuwe technologieën.

• **Meertalig:** Beheersing van 4 talen (Frans, Italiaans, Engels, Nederlands) - een grote troef voor multiculturele omgevingen.

• **Diverse Praktische Ervaring:** Van 3D-printen tot applicatieontwikkeling, Bruno heeft bewezen in staat te zijn te evolueren in verschillende technische domeinen.

**Deel 2: Aandachtspunten of zwakke punten van het profiel in relatie tot de functiebeschrijving**

• **Gebrek aan Technische Details:** Ervaringsbeschrijvingen missen soms precisie over specifieke gebruikte technologieën en kwantificeerbare prestaties.

• **Recente Ontwikkelervaring:** Hoewel hij sinds 2022 ChatGPT-ontwikkelaar is, blijft de ervaring relatief kort voor senior technische posities.

• **Diversiteit van Ervaringen:** De variëteit aan expertisegebieden zou kunnen worden gezien als een gebrek aan diepe specialisatie in een bepaald gebied.

**Deel 3: Score van 100 voor het profiel**

**Score: 85/100**

**Evaluatie Samenvatting:**
Bruno Mineo presenteert een uniek en zeer interessant profiel dat relationele excellentie combineert met opkomende technische vaardigheden. Zijn psychologie opleiding en HR-ervaring geven hem zeldzaam begrip van de menselijke aspecten van werk, aangevuld met zijn succesvolle overgang naar moderne technologieën.

Zijn traject toont grote aanpassingsvermogen en continue leercapaciteit. Taalvaardigheden zijn een echte troef voor internationale bedrijven.

Verbeterpunten betreffen voornamelijk de noodzaak om meer detail te geven over concrete technische prestaties en zijn impact te kwantificeren. Over het algemeen is hij een kandidaat met hoog potentieel, bijzonder geschikt voor rollen die zowel technische expertise als relationele intelligentie vereisen.`
    };

    return analyses[language] || analyses['fr'];
  }
}
