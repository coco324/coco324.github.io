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
      { code: 'D.0', label: 'Travailler en mode projet' },
      { code: 'B.0', label: 'Répondre aux incidents et demandes' },
    ],
  },
  GitlabEventsHook: {
    title: 'GitlabEventsHook',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    subtitle: 'Backend d’intégration pour automatiser des événements GitLab.',
    tags: ['kubernetes', 'docker', 'java', 'kafka'],
    context: 'Ce projet a été conçu pour centraliser et automatiser des traitements autour du GitLab d’entreprise, avec une logique tournée vers l’IA et l’orchestration.',
    objective: 'Déclencher et traiter des événements techniques de manière fiable, tout en gardant une architecture claire et maintenable.',
    realization: [
      'Traitement backend orienté événements.',
      'Conteneurisation avec Docker et déploiement Kubernetes.',
      'Intégration de services Java et Kafka.',
    ],
    difficulty: 'Organisation des flux d’événements, fiabilité des traitements et coordination entre plusieurs services.',
    stats: [
      { label: 'Type', value: 'Backend' },
      { label: 'Stack', value: 'Java / Kafka / Docker' },
    ],
    competencies: [
      { code: 'A.5', label: 'Gérer le patrimoine informatique' },
      { code: 'F.0', label: 'Organiser son développement professionnel' },
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
