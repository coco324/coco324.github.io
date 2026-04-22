import type { Project } from '../components/ProjectCard.vue'

export const projects: Project[] = [
  {
    title: 'Vibz',
    description: "Vibz est une application web moderne qui vous permet de découvrir et d'écouter le Top 20 des musiques les plus populaires de la semaine sur youtube.",
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    tags: ['Vue', 'Node.js', 'Sql','Tailwind'],
    codeUrl: 'https://github.com/AdrienMttn/music_charts',
    demoUrl: 'https://vibz-music.netlify.app/',
  },
  {
    title: 'BlackJack',
    description: 'Création d’une application de BlackJack offrant la possibilité de miser avec des jetons virtuels, d’ouvrir un compte utilisateur et d’accéder à un classement des joueurs.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    tags: ['TypeScript', 'Chart.js', 'Tailwind'],
    codeUrl: 'https://github.com/coco324/blackJack',
    demoUrl: '#',
  },
  {
    title: 'Gestionnaire de Tâches',
    description: "Application de productivité permettant de créer, organiser et suivre des tâches avec système de notifications.",
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    tags: ['React', 'Firebase', 'PWA'],
    codeUrl: '#',
    demoUrl: '#',
  },
]
