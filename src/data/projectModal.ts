import type { Project } from '../components/ProjectCard.vue'

export interface ProjectModalStat {
  label: string
  value: string
}

export interface ProjectModalCompetence {
  code: string
  label: string
}

export interface ProjectModalContent {
  title: string
  image: string
  subtitle: string
  tags: string[]
  context: string
  objective: string
  realization: string[]
  difficulty: string
  stats: ProjectModalStat[]
  competencies: ProjectModalCompetence[]
}

export const projectModalData: Record<string, ProjectModalContent> = {
  BlackJack: {
    title: 'BlackJack',
    image: '',
    subtitle: 'Jeu de cartes interactif avec compte joueur et classement.',
    tags: ['TypeScript', 'Chart.js', 'Tailwind'],
    context: 'Projet développé dans un cadre scolaire pour concevoir une application ludique avec logique de score, gestion utilisateur et interface immersive.',
    objective: 'Créer une expérience de jeu simple à prendre en main, avec des jetons virtuels, un suivi des parties et une progression claire pour l’utilisateur.',
    realization: [
      'Interface en Vue.js et composants réactifs.',
      'Gestion des parties et des scores côté application.',
      'Intégration d’un classement et d’un système de compte.',
    ],
    difficulty: 'Gestion des règles de jeu, synchronisation de l’état des manches et équilibrage de l’expérience utilisateur.',
    stats: [
      { label: 'Type', value: 'Jeu web' },
      { label: 'Stack', value: 'TypeScript / Chart.js' },
    ],
    competencies: [
      { code: '', label: 'Déployer un service' },
      { code: '', label: 'Mettre en place son environnement dapprentissage personnel' },
      { code: '', label: 'Planifier les activités' },
      { code: '', label: 'Gérer des sauvegardes' },
    ],
  },
  GitlabEventsHook: {
    title: 'GitlabEventsHook',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    subtitle: 'Backend d\'intégration IA pour automatiser le traitement des événements GitLab.',
    tags: ['Java 21', 'Spring Boot', 'Kafka', 'Docker', 'Kubernetes', 'GitLab CI/CD', 'Maven'],
    context: 'Stage chez Michelin - Software Engineering Platform. Intégration IA dans GitLab avec traitement événementiel des issues et merge requests via Kafka.',
    objective: 'Implémenter un backend scalable pour traiter les événements GitLab et déclencher automatiquement les pipelines IA, avec un cycle de release automatisé.',
    realization: [
      'Consumers Kafka pour issues et merge requests avec traitement et transmission aux services IA.',
      'Maven Release Plugin configuré pour automatiser versioning, tagging Git et releases.',
      'Pipeline CI/CD complet : build Maven → Docker → Artifactory → déploiement Kubernetes.',
    ],
    difficulty: 'Synchronisation des flux Kafka, coordination multi-services (Kafka, Docker, Kubernetes, CI/CD), gestion du cycle de release automatisé.',
    stats: [
      { label: 'Type', value: 'Backend / Infrastructure' },
      { label: 'Stack', value: 'Java 21 / Spring Boot / Kafka / Docker / Kubernetes' },
      { label: 'Entreprise', value: 'Michelin' },
      { label: 'Domaine', value: 'Software Engineering Platform' },
    ],
    competencies: [
      { code: '', label: 'Gérer des sauvegardes' },
      { code: '', label: 'Participer à lévolution dun site Web exploitant les données de lorganisation' },
      { code: '', label: 'Planifier les activités' },
      { code: '', label: 'Réaliser les tests dintégration et dacceptation dun service' },
      { code: '', label: 'Déployer un service' },
    ],
  },
}

export const getProjectModalContent = (project: Project): ProjectModalContent => {
  const existingContent = projectModalData[project.title.trim()]
  if (existingContent) {
    return {
      ...existingContent,
      image: existingContent.image || project.image,
      tags: existingContent.tags.length ? existingContent.tags : project.tags,
    }
  }

  return {
    title: project.title,
    image: project.image,
    subtitle: 'Projet favori présenté avec une fiche détaillée.',
    tags: project.tags,
    context: project.description,
    objective: 'Mettre en avant le projet de façon claire, visuelle et lisible dans une popup immersive.',
    realization: project.tags.map((tag) => `Technologie / thème : ${tag}`),
    difficulty: 'Adapter le contenu à partir des données disponibles du projet tout en conservant une présentation cohérente.',
    stats: [
      { label: 'Tags', value: `${project.tags.length}` },
      { label: 'Lien code', value: project.codeUrl ? 'Disponible' : 'Non fourni' },
    ],
    competencies: [
      { code: 'D.0', label: 'Travailler en mode projet' },
      { code: 'B.0', label: 'Répondre aux incidents et demandes' },
    ],
  }
}
