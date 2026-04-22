<script lang="ts">
import { defineComponent } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
import EducationTimeline from './components/EducationTimeline.vue'
import GitHubContributions from './components/GitHubContributions.vue'
import { navLinks } from './data/navLinks'
import { projects } from './data/projects'
import { education } from './data/education'
import { skills } from './data/skills'
import { contacts } from './data/contacts'

export default defineComponent({
  name: 'App',

  components: { ProjectCard, EducationTimeline, GitHubContributions },

  data() {
    return {
      navLinks,
      projects,
      education,
      skills,
      contacts,
    }
  },
})
</script>

<template>
  <div class="h-screen overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth scroll-pt-24 bg-[#0d0d0d] text-white font-sans relative">
    <div class="relative z-10">
      <!-- NAV -->
      <nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 bg-[#0d0d0d]/90 backdrop-blur border-b border-[#1e1e1e]">
        <span class="font-extrabold text-lg tracking-tight">
          C<span class="text-[#2ecc71]">A</span>
        </span>
        <div class="hidden md:flex gap-8 text-sm text-[#aaa]">
          <a v-for="link in navLinks" :key="link.label" :href="link.href" class="hover:text-white ">
            {{ link.label }}
          </a>
        </div>
      </nav>

      <!-- HERO -->
      <section id="accueil" class="min-h-screen flex flex-col items-center pt-32 md:pt-48 text-center px-6">
      <h1 class="text-8xl md:text-8xl font-extrabold tracking-tight mb-6">
        Corantin <span class="text-[#2ecc71]">Antony</span>
      </h1>
      <p class="text-[#888] text-3xl mb-8">Étudiant en Informatique</p>
      <p class="text-[#666] text-xl leading-relaxed max-w-2xl mb-12">
        Passionné par le développement web et les nouvelles technologies.
        Je crée des expériences numériques innovantes et élégantes.
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-8 py-4 bg-[#2ecc71] text-black text-lg font-bold rounded-lg hover:opacity-90 transition-opacity">
          Mon CV
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text" aria-hidden="true"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
        </a>
        <a href="#projets" class="px-8 py-4 border border-[#2ecc71] text-[#2ecc71] text-lg font-bold rounded-lg hover:bg-[#2ecc71]/10 transition-colors">
          Voir mes projets.
        </a>
      </div>
      <div class="pt-10"><GitHubContributions username="coco324" theme="dark" /></div>
      <div class="mt-20 text-[#333]">
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </section>

    <!-- À PROPOS -->
    <div class="relative w-full overflow-hidden">
      
      <section id="propos" class="max-w-6xl mx-auto px-6 py-10 relative z-10">
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
        <div v-for="skill in skills" :key="skill.title" class="bg-[#161616] border border-[#262626] rounded-xl p-8 hover:border-[#2ecc71]/40 transition-colors">
          <span class="block mb-3 text-[#2ecc71]" v-html="skill.icon" />
          <h4 class="text-white font-bold text-sm mb-1">{{ skill.title }}</h4>
          <p class="text-[#666] text-xs">{{ skill.sub }}</p>
        </div>
      </div>
      
    </section>
    </div> <!-- Fin du wrapper de la section À propos -->

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
    <section id="contact" class="max-w-3xl mx-auto px-6 py-24 pt-30 text-center">
      <h2 class="text-4xl font-extrabold tracking-tight mb-4 ">
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
          target="blank"
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
  </div>
</template>

