import type { Project } from '../components/ProjectCard.vue'
import vibzImage from '../assets/img/vibz.jpg'
import blackJackImage from '../assets/img/BlackJack_acceuil.jpg'
import Glpi from '../assets/img/Glpi.png'
import sportSio from '../assets/img/sportSio.jpg'
import projetJeux from '../assets/img/ProjetJeux.png'
import ProjetCalcul from '../assets/img/ProjetCalcul.jpg'
import Cannrd from '../assets/img/Cannard.png'
import zenGarden from '../assets/img/zengarden.jpg'

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
    title: 'Stage développeur web',
    description: "Développement d'une application web avec Angular (interne a Michelin) qui a pour but d'aider les développeurs au quotidien notamment en leurs proposant des modèles ou de la documentation.",
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    tags: ['Angular', 'Web', 'Typescript'],
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
  {
    title: 'AP Maintenance corrective et/ou évolution de jeux',
    description: "Ce projet en C# regroupe trois jeux classiques réunis dans une même application avec interface graphique. Il propose le Pendu, Mastermind et le Morpion, accessibles depuis un menu commun. L’ensemble offre une expérience simple et intuitive, permettant de jouer à ces jeux emblématiques dans une version modernisée. Le projet met en avant la structuration du code, la gestion des interactions et la création d’une interface claire.",
    image: projetJeux,
    tags: ['C#', 'Windows Forms', 'Jeux classiques'],
    codeUrl: 'https://github.com/coco324/ProjetJeux',
    demoUrl: '#',
  },
  {
    title: 'Logiciel Apprentissage calcul',
    description: "Cette application propose un entraînement simple et rapide aux opérations mathématiques essentielles. Elle met à disposition des exercices d’addition, de soustraction et de multiplication pour renforcer la maîtrise des calculs de base. L’interface est pensée pour être accessible et intuitive. L’objectif est d’aider l’utilisateur à améliorer sa rapidité et sa précision en mathématiques.",
    image: ProjetCalcul,
    tags: ['C#', 'Windows Forms', 'Apprentissage'],
    codeUrl: 'https://github.com/coco324/CalculEnfant',
    demoUrl: '#',
  },
  {
    title: 'Journal - Canard Connecté ',
    description: "Chaque semaine au début de notre année, un groupe de 4 personne présenté des informations d'actualité sur l'informatique en général. On pouvais parler du sujet de notre choix.",
    image: Cannrd,
    tags: ['veille technologique', 'actualité', 'communication'],
    codeUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'CSS Zen Garden',
    description: "Le site CSS Zen Garden présente un fichier HTML fixe dont l’apparence est entièrement transformée grâce au CSS. L’objectif est de montrer comment une simple feuille de style peut modifier complètement l’ambiance du site sans toucher au contenu.",
    image: zenGarden,
    tags: ['css', 'design', 'web'],
    codeUrl: 'https://github.com/coco324/ZenGarden',
    demoUrl: '#',
  }
]
