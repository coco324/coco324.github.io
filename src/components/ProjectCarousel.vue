<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, type ComponentPublicInstance } from 'vue'
import ProjectCard, { type Project } from './ProjectCard.vue'

const props = defineProps<{
  projects: Project[]
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const cardElements    = ref<HTMLElement[]>([])
const isGrabbing      = ref(false)   // curseur grab actif
let layoutRaf   = 0
let scrollEndTimer = 0
let jumpLocked  = false

// ── drag state (module-level, jamais exposé aux enfants) ──────────────────────
let dragActive    = false   // on est en train de dragger
let dragStartX    = 0
let dragStartLeft = 0
let dragMoved     = false   // a-t-on vraiment bougé (> seuil) ?

// ── clone list ────────────────────────────────────────────────────────────────
const carouselProjects = computed(() => {
  if (props.projects.length <= 1) return props.projects
  return [props.projects[props.projects.length - 1]!, ...props.projects, props.projects[0]!]
})

const setCardRef = (index: number, el: Element | ComponentPublicInstance | null) => {
  const node = el instanceof HTMLElement ? el : (el as any)?.$el
  if (node instanceof HTMLElement) cardElements.value[index] = node
}

// ── scroll helpers ────────────────────────────────────────────────────────────
const cardScrollLeft = (i: number) => {
  const c = scrollContainer.value!
  const card = cardElements.value[i]!
  return card.offsetLeft - c.clientWidth / 2 + card.offsetWidth / 2
}

const scrollToCard = (i: number, smooth = false) =>
  scrollContainer.value?.scrollTo({ left: cardScrollLeft(i), behavior: smooth ? 'smooth' : 'instant' })

const centeredIndex = () => {
  const c = scrollContainer.value
  if (!c || !cardElements.value.length) return 1
  const center = c.scrollLeft + c.clientWidth / 2
  return cardElements.value.reduce((best, card, i) => {
    const d    = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center)
    const dBest = Math.abs(cardElements.value[best]!.offsetLeft + cardElements.value[best]!.offsetWidth / 2 - center)
    return d < dBest ? i : best
  }, 1)
}

// ── layout ────────────────────────────────────────────────────────────────────
const updateLayout = () => {
  const c = scrollContainer.value
  if (!c) return
  const center  = c.scrollLeft + c.clientWidth / 2
  const maxDist = c.clientWidth / 2 || 1

  cardElements.value.forEach((card, i) => {
    const delta = (card.offsetLeft + card.offsetWidth / 2 - center) / maxDist
    const dist  = Math.abs(delta)
    const scale = Math.max(0.74, 1.12 - dist * 0.36)
    const lift  = (i % 2 === 0 ? 1 : -1) * Math.min(26, dist * 18)
    card.style.transform     = `translateY(${lift}px) scale(${scale}) translateZ(0)`
    card.style.opacity       = `${Math.max(0.45, 1 - dist * 0.4)}`
    card.style.zIndex        = `${Math.round(200 - dist * 100)}`
    // cartes hors-centre invisibles → ne bloquent JAMAIS les clics
    card.style.pointerEvents = dist < 0.3 ? 'auto' : 'none'
  })
}

const normalizeScroll = () => {
  const c = scrollContainer.value
  if (!c || props.projects.length <= 1 || jumpLocked) return
  const { scrollLeft, scrollWidth, clientWidth } = c
  const maxScroll = scrollWidth - clientWidth
  const total     = props.projects.length
  if (scrollLeft <= 2) {
    jumpLocked = true; scrollToCard(total)
    requestAnimationFrame(() => { jumpLocked = false })
  } else if (scrollLeft >= maxScroll - 2) {
    jumpLocked = true; scrollToCard(1)
    requestAnimationFrame(() => { jumpLocked = false })
  }
}

const scheduleLayout = () => {
  cancelAnimationFrame(layoutRaf)
  layoutRaf = requestAnimationFrame(() => { normalizeScroll(); updateLayout() })
}

// ── navigation buttons ────────────────────────────────────────────────────────
const goToStep = (step: number) => {
  if (props.projects.length <= 1) return
  scrollToCard(centeredIndex() + step, true)
  setTimeout(scheduleLayout, 350)
}

// ── scroll snap (quand pas en drag) ──────────────────────────────────────────
const onScroll = () => {
  scheduleLayout()
  if (dragActive) return          // pendant le drag on ne snappe pas
  clearTimeout(scrollEndTimer)
  scrollEndTimer = window.setTimeout(() => {
    scrollToCard(centeredIndex(), true)
    setTimeout(updateLayout, 350)
  }, 80)
}

// ── DRAG ─────────────────────────────────────────────────────────────────────
// Règle absolue : si le mousedown vient d'un <a> ou <button>, on ne démarre
// JAMAIS le drag. Ces éléments gardent un comportement 100% natif.

const startDrag = (e: MouseEvent) => {
  // Ignorer clic droit / molette
  if (e.button !== 0) return
  // Si on clique sur un lien ou bouton → on laisse le browser gérer
  if ((e.target as HTMLElement).closest('a, button')) return

  dragActive    = true
  dragMoved     = false
  dragStartX    = e.clientX
  dragStartLeft = scrollContainer.value!.scrollLeft
  isGrabbing.value = true

  // Listeners sur window → pas de capture, pas d'interférence avec les enfants
  window.addEventListener('mousemove', moveDrag)
  window.addEventListener('mouseup',   endDrag)
}

const moveDrag = (e: MouseEvent) => {
  if (!dragActive) return
  const dx = e.clientX - dragStartX
  if (!dragMoved && Math.abs(dx) < 5) return
  dragMoved = true
  scrollContainer.value!.scrollLeft = dragStartLeft - dx
  scheduleLayout()
}

const endDrag = () => {
  window.removeEventListener('mousemove', moveDrag)
  window.removeEventListener('mouseup',   endDrag)
  isGrabbing.value = false

  if (dragMoved) {
    scrollToCard(centeredIndex(), true)
    setTimeout(updateLayout, 350)
  }

  // On reset dragActive APRÈS un tick pour que le click event
  // suivant puisse lire dragMoved avant qu'il soit reset
  requestAnimationFrame(() => {
    dragActive = false
    dragMoved  = false
  })
}

// Bloquer le click qui suit un drag (mais jamais sur a/button)
const onClickCapture = (e: MouseEvent) => {
  if (!dragMoved) return
  if ((e.target as HTMLElement).closest('a, button')) return
  e.preventDefault()
  e.stopPropagation()
}

// ── lifecycle ─────────────────────────────────────────────────────────────────
onMounted(() => {
  nextTick(() => {
    const c = scrollContainer.value
    if (!c) return
    c.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', scheduleLayout)
    if (props.projects.length > 1) scrollToCard(1)
    updateLayout()
  })
})

onBeforeUnmount(() => {
  scrollContainer.value?.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', scheduleLayout)
  window.removeEventListener('mousemove', moveDrag)
  window.removeEventListener('mouseup',   endDrag)
  cancelAnimationFrame(layoutRaf)
  clearTimeout(scrollEndTimer)
})
</script>

<template>
  <div class="relative h-160">
    <!-- Prev -->
    <button
      type="button"
      class="absolute left-0 top-1/2 z-30 -translate-x-[65%] -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-4 text-white backdrop-blur-md transition hover:border-[#2ecc71]/50 hover:bg-black/80 md:-left-10"
      aria-label="Projet précédent"
      @click="goToStep(-1)"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>

    <!-- Next -->
    <button
      type="button"
      class="absolute right-0 top-1/2 z-30 translate-x-[65%] -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-4 text-white backdrop-blur-md transition hover:border-[#2ecc71]/50 hover:bg-black/80 md:-right-10"
      aria-label="Projet suivant"
      @click="goToStep(1)"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>

    <!-- Track -->
    <div
      ref="scrollContainer"
      class="flex h-full select-none items-center overflow-x-auto px-[18vw]
             [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      :class="isGrabbing ? 'cursor-grabbing' : 'cursor-grab'"
      style="touch-action: pan-x;"
      @mousedown="startDrag"
      @click.capture="onClickCapture"
    >
      <div
        v-for="(project, index) in carouselProjects"
        :key="project.title + index"
        :ref="(el) => setCardRef(index, el)"
        class="w-[min(34rem,82vw)] shrink-0 mx-6 md:mx-10 transition-[transform,opacity] duration-300 ease-out"
      >
        <ProjectCard :project="project" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Les liens et boutons dans les cartes ont toujours cursor:pointer,
   même quand le conteneur est en mode grab */
.cursor-grab a,
.cursor-grab button,
.cursor-grabbing a,
.cursor-grabbing button {
  cursor: pointer !important;
}
</style>