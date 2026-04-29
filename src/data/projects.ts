import type { Project } from '../components/ProjectCard.vue'
import vibzImage from '../assets/img/vibz.jpg'
import blackJackImage from '../assets/img/BlackJack_acceuil.jpg'
import Glpi from '../assets/img/Glpi.png'
import sportSio from '../assets/img/sportSio.jpg'

export const projects: Project[] = [
  {
    title: 'Vibz',
    description: "Vibz est une application web moderne qui vous permet de découvrir et d'écouter le Top 20 des musiques les plus populaires de la semaine sur youtube.",
    image: vibzImage,
    tags: ['Vue', 'Node.js', 'Sql','Tailwind'],
    codeUrl: 'https://github.com/AdrienMttn/music_charts',
    demoUrl: 'https://vibz-music.netlify.app/',
  },
  {
    title: 'GLPI (Gestionnaire Libre de Parc Informatique)',
    description: "Dans le cadre de l'améliorations de la gestion informatique, j'ai travailler sue le déploiement et l'administration de l'outil GLPI (Gestionnaire Libre de Parc Informatique). L'objectif était de centraliser l'inventaire matérielle et logicielle tout en offrant un système de tickets pour le support utilisateur. ",
    image: Glpi,
    tags: ['GLPI', 'Inventaire', 'Support IT'], 
    codeUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'Application- Sport SIO',
    description: "Réalisation d'une application Form en C#, afin de gérer des sportifs, l'application permet d'en ajouter, d'en supprimer et de leur attribuer un sport.",
    image: sportSio,
    tags: ['C#', 'Windows Forms', 'Gestion de données'],
    codeUrl: 'https://github.com/coco324/AppliSportSio',
    demoUrl: '#',
  },
  {
    title: 'Projet 6',
    description: 'Description du projet 6.',
    image: 'https://images.unsplash.com/photo-1497366750009-60f360e2468a?w=800&q=80',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    codeUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'BlackJack',
    description: 'Création d’une application de BlackJack offrant la possibilité de miser avec des jetons virtuels, d’ouvrir un compte utilisateur et d’accéder à un classement des joueurs.',
    image: blackJackImage,
    tags: ['TypeScript', 'Chart.js', 'Tailwind'],
    codeUrl: 'https://github.com/coco324/blackJack',
    demoUrl: '#',
  },
  {
    title: 'GitlabEventsHook',
    description: "Ce backend a pour but d'intégrer des feature IA au seins du gitlab entreprise",
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    tags: ['kubernetes', 'docker', 'java','kafka'],
    codeUrl: '#',
    demoUrl: '#',
  },
]
