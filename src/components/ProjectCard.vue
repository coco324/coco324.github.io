<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  codeUrl?: string
  demoUrl?: string
}

export default defineComponent({
  name: 'ProjectCard',
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true
    }
  }
})
</script>

<template>
  <div class="bg-[#0d0d0d] border border-[#262626] rounded-xl overflow-hidden flex flex-col h-full hover:border-[#2ecc71]/40 transition-colors duration-300">
    <div class="h-44 overflow-hidden relative group">
      <img 
        :src="project.image" 
        :alt="project.title" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#161616] to-transparent opacity-60"></div>
    </div>

    <div class="p-5 flex flex-col flex-1 gap-3">
      <h3 class="text-white font-bold text-lg tracking-tight">{{ project.title }}</h3>
      <p class="text-sm text-[#888] leading-relaxed line-clamp-3">{{ project.description }}</p>

      <div class="flex flex-wrap gap-2 my-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="text-xs px-2.5 py-1 rounded-md bg-[#262626] text-[#2ecc71] font-medium border border-[#2ecc71]/20"
        >
          {{ tag }}
        </span>
      </div>

      <div class="flex gap-4 mt-auto pt-4 border-t border-[#262626]">
        <a
          v-if="project.codeUrl"
          :href="project.codeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:text-[#2ecc71] transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          Code
        </a>
        <a
          v-if="project.demoUrl"
          :href="project.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:text-[#2ecc71] transition-colors"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Demo
        </a>
      </div>
    </div>
  </div>
</template>

