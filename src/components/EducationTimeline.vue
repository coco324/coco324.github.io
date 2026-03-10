<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export interface Education {
  period: string
  degree: string
  school: string
  description: string
  tags: string[]
}

export default defineComponent({
  name: 'EducationTimeline',
  props: {
    items: {
      type: Array as PropType<Education[]>,
      required: true
    }
  }
})
</script>

<template>
  <div class="relative flex flex-col gap-7">

    <!-- Ligne verticale -->
    <div class="absolute left-8 top-8 bottom-8 w-px bg-[#2ecc71]/20" />

    <div v-for="(item, index) in items" :key="index" class="flex gap-5 items-start">

      <!-- Icône -->
      <div class="relative z-10 shrink-0 w-16 h-16 rounded-full border-2 border-[#2ecc71]/50 bg-[#0d0d0d] flex items-center justify-center text-[#2ecc71]">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l6.16-3.42a12.08 12.08 0 01.67 6.48A11.95 11.95 0 0112 20.05a11.95 11.95 0 01-6.82-3 12.08 12.08 0 01.66-6.48L12 14z"/>
        </svg>
      </div>

      <!-- Carte -->
      <div class="flex-1 bg-[#161616] border border-[#262626] rounded-xl p-6 flex flex-col gap-2">

        <div class="flex items-center gap-2 text-[#2ecc71] text-sm font-semibold">
          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          {{ item.period }}
        </div>

        <h3 class="text-white font-bold text-lg">{{ item.degree }}</h3>
        <p class="text-[#aaa] text-sm">{{ item.school }}</p>
        <p class="text-[#666] text-sm leading-relaxed">{{ item.description }}</p>

        <div class="flex flex-wrap gap-2 mt-1">
          <span
            v-for="tag in item.tags"
            :key="tag"
            class="text-xs px-3 py-1 rounded-full border border-[#2ecc71]/40 text-[#2ecc71]"
          >
            {{ tag }}
          </span>
        </div>

      </div>
    </div>

  </div>
</template>

