import type { Project } from '../components/ProjectCard.vue'

export const projects: Project[] = [
  {
    title: 'Application E-commerce',
    description: 'Plateforme de vente en ligne complète avec panier, système de paiement et gestion des stocks.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    tags: ['React', 'Node.js', 'MongoDB'],
    codeUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'Dashboard Analytics',
    description: 'Tableau de bord interactif pour visualiser des données en temps réel avec graphiques et statistiques.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    tags: ['TypeScript', 'Chart.js', 'Tailwind'],
    codeUrl: '#',
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
