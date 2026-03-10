<script lang="ts">
import { defineComponent } from 'vue'
import ProjectCard, { type Project } from './components/ProjectCard.vue'
import EducationTimeline, { type Education } from './components/EducationTimeline.vue'

export default defineComponent({
  name: 'App',

  components: { ProjectCard, EducationTimeline },

  data() {
    return {
      navLinks: [
        { label: 'Accueil',  href: '#accueil'  },
        { label: 'À propos', href: '#propos'   },
        { label: 'Parcours', href: '#parcours' },
        { label: 'Projets',  href: '#projets'  },
        { label: 'Contact',  href: '#contact'  },
      ],

      projects: [
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
      ] as Project[],

      education: [
        {
          period: '2023 - 2026',
          degree: 'Licence Informatique',
          school: 'Université de [Ville]',
          description: 'Spécialisation en développement web et génie logiciel.',
          tags: ['React', 'Node.js', 'Architecture logicielle', 'Gestion de projet', 'UML'],
        },
        {
          period: '2021 - 2023',
          degree: 'DUT Informatique',
          school: 'IUT [Ville]',
          description: "Formation aux bases de l'informatique, algorithmique et développement logiciel.",
          tags: ['Java', 'SQL', 'Algorithmique', 'Réseaux'],
        },
        {
          period: '2021',
          degree: 'Baccalauréat Scientifique',
          school: 'Lycée [Ville]',
          description: 'Mention Bien, spécialité Mathématiques et NSI.',
          tags: ['Mathématiques', 'NSI', 'Physique'],
        },
      ] as Education[],

      skills: [
        {
          title: 'Développement Frontend',
          sub: 'React, TypeScript, Tailwind CSS',
          icon: `<svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
        },
        {
          title: 'Backend & Bases de données',
          sub: 'Node.js, Python, SQL, MongoDB',
          icon: `<svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><ellipse cx="12" cy="7" rx="9" ry="3" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10c0 1.66 3.58 3 9 3s9-1.34 9-3V7"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12c0 1.66 3.58 3 9 3s9-1.34 9-3"/></svg>`,
        },
        {
          title: 'Web Design',
          sub: 'UI/UX, Design responsive, Figma',
          icon: `<svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>`,
        },
      ],

      contacts: [
        {
          label: 'Email',
          value: 'prenom.nom@email.com',
          href: 'mailto:prenom.nom@email.com',
          icon: `<svg width="28" height="28" fill="none" stroke="#2ecc71" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
        },
        {
          label: 'GitHub',
          value: 'github.com/username',
          href: 'https://github.com/username',
          icon: `<svg width="28" height="28" fill="#2ecc71" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.57v-2.24c-3.02.55-3.8-.73-4.04-1.41-.13-.34-.72-1.41-1.23-1.7-.42-.22-1.02-.78-.01-.79.94-.01 1.62.87 1.84 1.23 1.08 1.82 2.81 1.31 3.5.99.1-.78.42-1.31.76-1.61-2.67-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.53.12-3.18 0 0 1-.31 3.3 1.23a11.5 11.5 0 016 0c2.3-1.54 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.76.84 1.23 1.9 1.23 3.22 0 4.6-2.81 5.62-5.48 5.92.44.38.81 1.1.81 2.22v3.3c0 .32.22.69.83.57A12.02 12.02 0 0024 12C24 5.37 18.63 0 12 0z"/></svg>`,
        },
        {
          label: 'LinkedIn',
          value: 'linkedin.com/in/username',
          href: 'https://linkedin.com/in/username',
          icon: `<svg width="28" height="28" fill="#2ecc71" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z"/></svg>`,
        },
      ],
    }
  },
})
</script>

<template>
  <div class="min-h-screen bg-[#0d0d0d] text-white font-sans">
    <!-- NAV -->
    <nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 bg-[#0d0d0d]/90 backdrop-blur border-b border-[#1e1e1e]">
      <span class="font-extrabold text-lg tracking-tight">
        P<span class="text-[#2ecc71]">N</span>
      </span>
      <div class="hidden md:flex gap-8 text-sm text-[#aaa]">
        <a v-for="link in navLinks" :key="link.label" :href="link.href" class="hover:text-white transition-colors">
          {{ link.label }}
        </a>
      </div>
    </nav>

    <!-- HERO -->
    <section id="accueil" class="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
      <h1 class="text-8xl md:text-8xl font-extrabold tracking-tight mb-6">
        Corantin <span class="text-[#2ecc71]">Antony</span>
      </h1>
      <p class="text-[#888] text-3xl mb-8">Étudiant en Informatique</p>
      <p class="text-[#666] text-xl leading-relaxed max-w-2xl mb-12">
        Passionné par le développement web et les nouvelles technologies.
        Je crée des expériences numériques innovantes et élégantes.
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="#" class="flex items-center gap-3 px-8 py-4 bg-[#2ecc71] text-black text-lg font-bold rounded-lg hover:opacity-90 transition-opacity">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Télécharger mon CV
        </a>
        <a href="#projets" class="px-8 py-4 border border-[#2ecc71] text-[#2ecc71] text-lg font-bold rounded-lg hover:bg-[#2ecc71]/10 transition-colors">
          Voir mes projets
        </a>
        <a href="#contact" class="px-8 py-4 border border-[#333] text-[#bbb] text-lg font-bold rounded-lg hover:bg-white/5 transition-colors">
          Me contacter
        </a>
      </div>
      <div class="mt-20 text-[#333]">
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </section>

    <!-- À PROPOS -->
    <section id="propos" class="max-w-5xl mx-auto px-6 py-24">
      <h2 class="text-4xl font-extrabold text-center tracking-tight mb-14">
        À propos de <span class="text-[#2ecc71]">moi</span>
      </h2>

      <div class="grid md:grid-cols-2 gap-12 items-center mb-14">
        <div class="rounded-xl overflow-hidden border border-[#262626] h-64">
          <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80" alt="coding" class="w-full h-full object-cover" />
        </div>
        <div class="flex flex-col gap-4">
          <h3 class="text-xl font-bold">Développeur passionné</h3>
          <p class="text-sm text-[#888] leading-relaxed">
            Étudiant en informatique avec une forte passion pour le développement web et les technologies modernes.
            J'aime résoudre des problèmes complexes et créer des applications qui ont un impact réel.
          </p>
          <p class="text-sm text-[#888] leading-relaxed">
            Mon objectif est de devenir un développeur full-stack accompli, capable de créer des solutions innovantes et performantes.
          </p>
        </div>
      </div>

      <!-- Skills -->
      <div class="grid md:grid-cols-3 gap-4">
        <div v-for="skill in skills" :key="skill.title" class="bg-[#161616] border border-[#262626] rounded-xl p-5">
          <span class="block mb-3 text-[#2ecc71]" v-html="skill.icon" />
          <h4 class="text-white font-bold text-sm mb-1">{{ skill.title }}</h4>
          <p class="text-[#666] text-xs">{{ skill.sub }}</p>
        </div>
      </div>
    </section>

    <!-- PARCOURS -->
    <section id="parcours" class="max-w-3xl mx-auto px-6 py-24">
      <h2 class="text-5xl font-extrabold text-center tracking-tight mb-14">
        Parcours <span class="text-[#2ecc71]">scolaire</span>
      </h2>
      <EducationTimeline :items="education" />
    </section>

    <!-- PROJETS -->
    <section id="projets" class="max-w-5xl mx-auto px-6 py-24">
      <h2 class="text-4xl font-extrabold text-center tracking-tight mb-14">
        Mes <span class="text-[#2ecc71]">projets</span>
      </h2>
      <div class="grid md:grid-cols-3 gap-5">
        <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="max-w-3xl mx-auto px-6 py-24 text-center">
      <h2 class="text-4xl font-extrabold tracking-tight mb-4">
        Me <span class="text-[#2ecc71]">contacter</span>
      </h2>
      <p class="text-sm text-[#888] max-w-sm mx-auto mb-12">
        Je suis toujours ouvert à de nouvelles opportunités et collaborations. N'hésitez pas à me contacter !
      </p>
      <div class="grid md:grid-cols-3 gap-4">
        <a
          v-for="c in contacts"
          :key="c.label"
          :href="c.href"
          class="bg-[#161616] border border-[#262626] rounded-xl p-8 flex flex-col items-center gap-3 hover:border-[#2ecc71]/40 transition-colors"
        >
          <span v-html="c.icon" />
          <strong class="text-white text-sm font-bold">{{ c.label }}</strong>
          <span class="text-[#666] text-xs">{{ c.value }}</span>
        </a>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-[#1a1a1a] py-7 text-center text-xs text-[#444]">
      © 2026 Prénom Nom. Tous droits réservés.
    </footer>

  </div>
</template>

