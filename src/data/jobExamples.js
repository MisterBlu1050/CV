// Exemples de descriptions de postes pour tester l'AI Job Matching

export const jobExamples = {
  "Développeur Full Stack": `Développeur Full Stack Senior
  
  Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe.
  
  Responsabilités:
  - Développement d'applications web modernes avec React/Node.js
  - Collaboration avec les équipes UX/UI pour implémenter des interfaces utilisateur
  - Maintenance et optimisation des bases de données
  - Participation aux revues de code et amélioration continue
  
  Compétences requises:
  - 3+ années d'expérience en développement web
  - Maîtrise de JavaScript, React, Node.js
  - Expérience avec les bases de données SQL/NoSQL
  - Connaissance des outils DevOps (Git, CI/CD)
  - Excellentes compétences en communication
  - Capacité à travailler en équipe agile`,

  "Consultant RH": `Consultant en Ressources Humaines
  
  Nous cherchons un consultant RH passionné pour accompagner nos clients dans leurs défis de gestion des talents.
  
  Mission:
  - Conseil en stratégie RH et transformation organisationnelle
  - Accompagnement des processus de recrutement
  - Formation des managers et équipes RH
  - Analyses psychométriques et évaluations de compétences
  - Médiation et résolution de conflits
  
  Profil recherché:
  - Formation en psychologie du travail ou RH
  - 5+ années d'expérience en conseil RH
  - Maîtrise des outils d'évaluation et de recrutement
  - Excellentes compétences relationnelles et d'écoute
  - Capacité d'adaptation et de gestion du changement
  - Maîtrise de plusieurs langues appréciée`,

  "Chef de Projet Digital": `Chef de Projet Digital - Innovation Technologique
  
  Rejoignez notre équipe d'innovation pour piloter des projets digitaux ambitieux.
  
  Votre rôle:
  - Pilotage de projets digitaux de bout en bout
  - Coordination des équipes techniques et créatives
  - Gestion des budgets et plannings
  - Interface avec les clients et stakeholders
  - Veille technologique et innovation
  
  Compétences attendues:
  - Formation supérieure en management/ingénierie
  - 3-5 années d'expérience en gestion de projet digital
  - Connaissance des méthodologies agiles (Scrum, Kanban)
  - Compétences en communication et leadership
  - Curiosité pour les nouvelles technologies (IA, mobile, web)
  - Esprit analytique et résolution de problèmes`,

  "Psychologue Clinicien": `Psychologue Clinicien - Centre de Santé Mentale
  
  Nous recherchons un psychologue clinicien pour notre centre spécialisé.
  
  Missions:
  - Évaluations psychologiques et diagnostics
  - Thérapies individuelles et de groupe
  - Collaboration avec équipe pluridisciplinaire
  - Rédaction de rapports et comptes-rendus
  - Participation aux réunions cliniques
  
  Exigences:
  - Master en psychologie clinique
  - Expérience en psychothérapie et évaluation
  - Connaissance des troubles anxio-dépressifs
  - Empathie et capacités d'écoute exceptionnelles  
  - Rigueur dans le suivi des dossiers
  - Formation continue en psychothérapie appréciée`
};

export const getRandomJobExample = () => {
  const keys = Object.keys(jobExamples);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return { title: randomKey, description: jobExamples[randomKey] };
};
