<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, type ComponentPublicInstance } from 'vue'
import ProjectCard, { type Project } from './ProjectCard.vue'

const props = defineProps<{
  projects: Project[]
}>()

// ── DOM refs ──────────────────────────────────────────────────────────────────
const scrollContainer = ref<HTMLElement | null>(null)
const cardElements = ref<HTMLElement[]>([])

// ── Drag state ────────────────────────────────────────────────────────────────
const isDragging = ref(false)
let dragStartX = 0
let dragStartScrollLeft = 0
let pointerId: number | null = null
let suppressClick = false
let layoutRaf = 0
let jumpLocked = false

// ── Clone list for infinite loop ──────────────────────────────────────────────
const carouselProjects = computed(() => {
  if (props.projects.length <= 1) return props.projects
  return [props.projects.at(-1)!, ...props.projects, props.projects[0]!]
})

// ── Refs ──────────────────────────────────────────────────────────────────────
const setCardRef = (index: number, el: Element | ComponentPublicInstance | null) => {
  const node = el instanceof HTMLElement ? el : (el as any)?.$el
  if (node instanceof HTMLElement) cardElements.value[index] = node
}

// ── Scroll helpers ────────────────────────────────────────────────────────────
const cardScrollLeft = (index: number) => {
  const container = scrollContainer.value!
  const card = cardElements.value[index]!
  return card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2
}

const scrollToCard = (index: number, smooth = false) => {
  scrollContainer.value?.scrollTo({
    left: cardScrollLeft(index),
    behavior: smooth ? 'smooth' : 'instant',
  })
}

const centeredIndex = () => {
  const container = scrollContainer.value
  if (!container || !cardElements.value.length) return 1

  const center = container.scrollLeft + container.clientWidth / 2
  return cardElements.value.reduce((best, card, i) => {
    const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center)
    const bestDist = Math.abs(cardElements.value[best]!.offsetLeft + cardElements.value[best]!.offsetWidth / 2 - center)
    return dist < bestDist ? i : best
  }, 1)
}

// ── Visual layout (scale / rotate / opacity) ──────────────────────────────────
const updateLayout = () => {
  const container = scrollContainer.value
  if (!container) return

  const center = container.scrollLeft + container.clientWidth / 2
  const maxDist = container.clientWidth / 2 || 1

  cardElements.value.forEach((card, i) => {
    const delta = (card.offsetLeft + card.offsetWidth / 2 - center) / maxDist
    const dist = Math.abs(delta)
    const scale = Math.max(0.74, 1.12 - dist * 0.36)
    const lift = (i % 2 === 0 ? 1 : -1) * Math.min(26, dist * 18)
    // force a small 3D translate and preserve-3d to keep text sharp during transforms
    card.style.transform = `translateY(${lift}px) scale(${scale}) translateZ(0.1px)`
    card.style.transformStyle = 'preserve-3d'
    card.style.backfaceVisibility = 'hidden'
    card.style.opacity = `${Math.max(0.45, 1 - dist * 0.4)}`
    card.style.zIndex = `${Math.round(200 - dist * 100)}`
  })
}

// ── Infinite-loop normalisation ───────────────────────────────────────────────
const normalizeScroll = () => {
  const container = scrollContainer.value
  if (!container || props.projects.length <= 1 || jumpLocked) return

  const { scrollLeft, scrollWidth, clientWidth } = container
  const maxScroll = scrollWidth - clientWidth
  const total = props.projects.length

  if (scrollLeft <= 2) {
    jumpLocked = true
    scrollToCard(total)           // last real card
    requestAnimationFrame(() => { jumpLocked = false })
  } else if (scrollLeft >= maxScroll - 2) {
    jumpLocked = true
    scrollToCard(1)               // first real card
    requestAnimationFrame(() => { jumpLocked = false })
  }
}

const scheduleLayout = () => {
  cancelAnimationFrame(layoutRaf)
  layoutRaf = requestAnimationFrame(() => {
    normalizeScroll()
    updateLayout()
  })
}

// ── Navigation buttons ────────────────────────────────────────────────────────
const goToStep = (step: number) => {
  if (props.projects.length <= 1) return
  scrollToCard(centeredIndex() + step, true)
  // update visual after smooth scroll settles
  setTimeout(scheduleLayout, 350)
}

// ── Drag (pointer events) ─────────────────────────────────────────────────────
const onPointerDown = (e: PointerEvent) => {
  if (e.button !== 0) return
  const container = scrollContainer.value!
  // if the initial press is on a link, don't start a drag here so clicks work
  const target = e.target as HTMLElement | null
  if (target && typeof target.closest === 'function' && target.closest('a')) return

  pointerId = e.pointerId
  dragStartX = e.clientX
  dragStartScrollLeft = container.scrollLeft
  isDragging.value = false
  suppressClick = false
  container.setPointerCapture(e.pointerId)
}

const onPointerMove = (e: PointerEvent) => {
  if (e.pointerId !== pointerId) return
  const dx = e.clientX - dragStartX

  if (!isDragging.value) {
    if (Math.abs(dx) < 6) return
    isDragging.value = true
  }

  // Direct scroll — no extra interpolation, browser handles momentum
  scrollContainer.value!.scrollLeft = dragStartScrollLeft - dx
  scheduleLayout()
}

const onPointerUp = (e: PointerEvent) => {
  if (e.pointerId !== pointerId) return
  const container = scrollContainer.value!
  if (container.hasPointerCapture(e.pointerId)) container.releasePointerCapture(e.pointerId)

  if (isDragging.value) {
    suppressClick = true
    setTimeout(() => { suppressClick = false }, 0)
    // Snap to nearest card after drag ends
    scrollToCard(centeredIndex(), true)
    setTimeout(scheduleLayout, 350)
  }

  isDragging.value = false
  pointerId = null
}

const onContainerClick = (e: MouseEvent) => {
  if (!suppressClick) return

  // if the click originated inside a link, allow it (don't suppress)
  const target = e.target as HTMLElement | null
  if (target && typeof target.closest === 'function' && target.closest('a')) return

  e.preventDefault()
  e.stopPropagation()
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(() => {
  nextTick(() => {
    const container = scrollContainer.value
    if (!container) return
    container.addEventListener('scroll', scheduleLayout, { passive: true })
    window.addEventListener('resize', scheduleLayout)
    if (props.projects.length > 1) scrollToCard(1)
    updateLayout()
  })
})

onBeforeUnmount(() => {
  scrollContainer.value?.removeEventListener('scroll', scheduleLayout)
  window.removeEventListener('resize', scheduleLayout)
  cancelAnimationFrame(layoutRaf)
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
      class="flex h-full items-center overflow-x-auto px-[18vw] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      :class="isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'"
      style="touch-action: pan-y;"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @click.capture="onContainerClick"
    >
      <div
        v-for="(project, index) in carouselProjects"
        :key="project.title"
        :ref="(el) => setCardRef(index, el)"
        class="w-[min(34rem,82vw)] shrink-0 mx-6 md:mx-10 transition-[transform,opacity] duration-300 ease-out will-change-transform"
        style="transform-style:preserve-3d; backface-visibility:hidden; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;"
      >
        <ProjectCard :project="project" />
      </div>
    </div>
  </div>
</template>