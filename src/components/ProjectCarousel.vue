<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, type ComponentPublicInstance } from 'vue'
import ProjectCard, { type Project } from './ProjectCard.vue'

const props = defineProps<{
  projects: Project[]
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const cardElements = ref<HTMLElement[]>([])
let rafId = 0
let isJumping = false

const carouselProjects = computed(() => {
  if (props.projects.length <= 1) {
    return props.projects
  }

  const first = props.projects[0]!
  const last = props.projects[props.projects.length - 1]!

  return [last, ...props.projects, first]
})

const setCardRef = (index: number, element: Element | ComponentPublicInstance | null) => {
  if (element instanceof HTMLElement) {
    cardElements.value[index] = element
  } else if (element && '$el' in element && element.$el instanceof HTMLElement) {
    cardElements.value[index] = element.$el
  }
}

const scrollToCard = (index: number) => {
  const container = scrollContainer.value
  const card = cardElements.value[index]

  if (!container || !card) return

  container.scrollTo({
    left: card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2,
    behavior: 'auto',
  })
}

const getCenteredCardIndex = () => {
  const container = scrollContainer.value
  if (!container || cardElements.value.length === 0) {
    return 1
  }

  const containerCenter = container.scrollLeft + container.clientWidth / 2
  let closestIndex = 1
  let closestDistance = Number.POSITIVE_INFINITY

  cardElements.value.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const distance = Math.abs(cardCenter - containerCenter)

    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  return closestIndex
}

const goToStep = (step: number) => {
  const total = props.projects.length
  if (total <= 1) return

  const currentIndex = getCenteredCardIndex()
  scrollToCard(currentIndex + step)
  scheduleUpdate()
}

const updateLayout = () => {
  const container = scrollContainer.value
  if (!container) return

  const containerCenter = container.scrollLeft + container.clientWidth / 2
  const maxDistance = container.clientWidth / 2 || 1

  cardElements.value.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const delta = (cardCenter - containerCenter) / maxDistance
    const distance = Math.abs(delta)

    const scale = Math.max(0.74, 1 - distance * 0.24)
    const rotation = Math.max(-28, Math.min(28, delta * 24))
    const opacity = Math.max(0.45, 1 - distance * 0.4)
    const lift = Math.min(26, distance * 18)
    const depth = Math.round(200 - distance * 100)

    card.style.transform = `translateY(${index % 2 === 0 ? lift : -lift}px) scale(${scale}) rotateY(${rotation}deg)`
    card.style.opacity = `${opacity}`
    card.style.zIndex = `${depth}`
  })
}

const normalizeScroll = () => {
  const container = scrollContainer.value
  const total = props.projects.length

  if (!container || total <= 1 || isJumping) {
    return
  }

  const firstRealIndex = 1
  const lastRealIndex = total
  const firstCloneIndex = 0
  const lastCloneIndex = total + 1
  const threshold = 2

  if (container.scrollLeft <= threshold) {
    isJumping = true
    scrollToCard(lastRealIndex)
    requestAnimationFrame(() => {
      isJumping = false
    })
    return
  }

  const maxScrollLeft = container.scrollWidth - container.clientWidth
  if (container.scrollLeft >= maxScrollLeft - threshold) {
    isJumping = true
    scrollToCard(firstRealIndex)
    requestAnimationFrame(() => {
      isJumping = false
    })
    return
  }

  if (cardElements.value[firstCloneIndex] && cardElements.value[lastCloneIndex]) {
    updateLayout()
  }
}

const scheduleUpdate = () => {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    normalizeScroll()
    updateLayout()
  })
}

onMounted(() => {
  nextTick(() => {
    const container = scrollContainer.value
    if (!container) return

    container.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    if (props.projects.length > 1) {
      scrollToCard(1)
    }

    updateLayout()
  })
})

onBeforeUnmount(() => {
  const container = scrollContainer.value
  if (container) {
    container.removeEventListener('scroll', scheduleUpdate)
  }
  window.removeEventListener('resize', scheduleUpdate)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="relative h-160" style="perspective: 1200px;">
    <button
      type="button"
      class="absolute left-0 top-1/2 z-30 -translate-x-[65%] -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-4 text-white backdrop-blur-md transition hover:border-[#2ecc71]/50 hover:bg-black/80 md:-left-10"
      @click="goToStep(-1)"
      aria-label="Projet précédent"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>

    <button
      type="button"
      class="absolute right-0 top-1/2 z-30 translate-x-[65%] -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-4 text-white backdrop-blur-md transition hover:border-[#2ecc71]/50 hover:bg-black/80 md:-right-10"
      @click="goToStep(1)"
      aria-label="Projet suivant"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>

    <div
      ref="scrollContainer"
      class="flex h-full items-center overflow-x-auto px-[18vw] snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div
        v-for="(project, index) in carouselProjects"
        :key="project.title"
        :ref="(el) => setCardRef(index, el)"
        class="w-[min(34rem,82vw)] shrink-0 snap-center -ml-14 md:-ml-20 transition-transform duration-300 ease-out will-change-transform"
      >
        <ProjectCard :project="project" />
      </div>
    </div>
  </div>
</template>
