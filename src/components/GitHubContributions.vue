<template>
  <div
    :class="[
      'relative inline-block min-w-180 rounded-md border p-4 text-xs font-sans',
      isDark ? 'bg-[#0d0d0d] border-[#30363d] text-[#c9d1d9]' : 'bg-white border-[#d0d7de] text-[#1f2328]'
    ]"
  >
    <div class="mb-3">
      <div class="flex items-center gap-3">
        <img
          :src="`https://github.com/${username}.png`"
          :alt="username"
          :class="[
            'h-12 w-12 rounded-full border',
            isDark ? 'border-[#30363d]' : 'border-[#d0d7de]'
          ]"
        />
        <div>
          <h2 :class="['mb-0.5 text-base font-semibold', isDark ? 'text-[#f0f6fc]' : 'text-[#1f2328]']">{{ username }}</h2>
          <p :class="['m-0 text-xs', isDark ? 'text-[#8b949e]' : 'text-[#57606a]']">
            <span :class="['font-semibold', isDark ? 'text-[#f0f6fc]' : 'text-[#1f2328]']">{{ totalContributions }}</span>
            contributions cette année
          </p>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <div v-if="loading" class="px-0 pb-2 pl-7 pt-5">
        <div class="flex gap-0.75">
          <div v-for="col in 53" :key="col" class="flex flex-col gap-0.75">
            <div
              v-for="row in 7"
              :key="row"
              :style="{ animationDelay: `${(col * 7 + row) * 8}ms` }"
              :class="[
                'h-2.75 w-2.75 animate-pulse rounded-xs',
                isDark ? 'bg-[#161b22]' : 'bg-[#ebedf0]'
              ]"
            />
          </div>
        </div>
      </div>

      <div v-else-if="error" class="flex items-center gap-2 py-5 text-[#cf222e]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <p>Impossible de charger les contributions</p>
      </div>

      <div v-else class="flex flex-col gap-1">
        <div class="relative ml-7 h-4">
          <span
            v-for="(month, i) in monthLabels"
            :key="i"
            :style="{ left: month.left + 'px' }"
            :class="[
              'absolute whitespace-nowrap text-[11px]',
              isDark ? 'text-[#8b949e]' : 'text-[#57606a]'
            ]"
          >{{ month.name }}</span>
        </div>

        <div class="flex gap-1">
          <div class="grid w-6 shrink-0 grid-rows-7 gap-0.75">
            <span :class="['text-right text-[10px] leading-2.75', isDark ? 'text-[#8b949e]' : 'text-[#57606a]']" style="grid-row: 2">Lun</span>
            <span :class="['text-right text-[10px] leading-2.75', isDark ? 'text-[#8b949e]' : 'text-[#57606a]']" style="grid-row: 4">Mer</span>
            <span :class="['text-right text-[10px] leading-2.75', isDark ? 'text-[#8b949e]' : 'text-[#57606a]']" style="grid-row: 6">Ven</span>
          </div>

          <div class="flex gap-0.75" @mouseleave="tooltip.visible = false">
            <div v-for="(week, wi) in weeks" :key="wi" class="flex flex-col gap-0.75">
              <div
                v-for="(day, di) in week"
                :key="di"
                :class="dayCellClass(day)"
                :title="day ? `${day.count} contributions le ${formatDate(day.date)}` : ''"
                @mouseenter="showTooltip($event, day)"
              />
            </div>
          </div>
        </div>

        <div class="mt-1 flex items-center justify-end gap-1">
          <span :class="['text-[11px]', isDark ? 'text-[#8b949e]' : 'text-[#57606a]']">Moins</span>
          <div :class="legendCellClass(0)" />
          <div :class="legendCellClass(1)" />
          <div :class="legendCellClass(2)" />
          <div :class="legendCellClass(3)" />
          <div :class="legendCellClass(4)" />
          <span :class="['text-[11px]', isDark ? 'text-[#8b949e]' : 'text-[#57606a]']">Plus</span>
        </div>
      </div>
    </div>

    <div
      v-if="tooltip.visible && tooltip.day"
      class="pointer-events-none absolute z-100 flex -translate-x-1/2 flex-col items-center gap-0.5 whitespace-nowrap rounded-md bg-[#1b1f23] px-2.5 py-1.5 text-[11px] text-white shadow"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
    >
      <strong>{{ tooltip.day.count }} contribution{{ tooltip.day.count !== 1 ? 's' : '' }}</strong>
      <span>{{ formatDateFull(tooltip.day.date) }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  username: {
    type: String,
    default: 'octocat'
  },
  theme: {
    type: String,
    default: 'light'
  }
})

const isDark = computed(() => props.theme === 'dark')

const LIGHT_LEVEL_CLASSES = {
  0: 'bg-[#ebedf0]',
  1: 'bg-[#9be9a8]',
  2: 'bg-[#40c463]',
  3: 'bg-[#30a14e]',
  4: 'bg-[#216e39]'
}

const DARK_LEVEL_CLASSES = {
  0: 'bg-[#161b22]',
  1: 'bg-[#0e4429]',
  2: 'bg-[#006d32]',
  3: 'bg-[#26a641]',
  4: 'bg-[#39d353]'
}

const loading = ref(true)
const error = ref(false)
const contributions = ref([])
const totalContributions = ref(0)
const tooltip = ref({ visible: false, x: 0, y: 0, day: null })

const MONTHS_FR = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
const DAYS_FR = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
const CELL_SIZE = 11
const CELL_GAP = 3

// Construit les semaines (colonnes de 7 cases dim→sam)
const weeks = computed(() => {
  if (!contributions.value.length) return []

  const map = {}
  contributions.value.forEach(d => { map[d.date] = d })

  // On prend les 365 derniers jours
  const end = new Date()
  end.setHours(0,0,0,0)
  const start = new Date(end)
  start.setFullYear(end.getFullYear() - 1)
  start.setDate(start.getDate() + 1)

  // Recule au dimanche précédent
  const startDay = new Date(start)
  startDay.setDate(startDay.getDate() - startDay.getDay())

  const cols = []
  let current = new Date(startDay)

  while (current <= end) {
    const week = []
    for (let d = 0; d < 7; d++) {
      const dateStr = toDateStr(current)
      const entry = map[dateStr]
      if (current < start || current > end) {
        week.push(null)
      } else if (entry) {
        week.push({ date: dateStr, count: entry.count, level: entry.level })
      } else {
        week.push({ date: dateStr, count: 0, level: 0 })
      }
      current.setDate(current.getDate() + 1)
    }
    cols.push(week)
  }
  return cols
})

const monthLabels = computed(() => {
  const labels = []
  const seen = new Set()
  weeks.value.forEach((week, wi) => {
    week.forEach(day => {
      if (!day) return
      const d = new Date(day.date)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      if (!seen.has(key) && d.getDate() <= 7) {
        seen.add(key)
        labels.push({
          name: MONTHS_FR[d.getMonth()],
          left: wi * (CELL_SIZE + CELL_GAP)
        })
      }
    })
  })
  return labels
})

function toDateStr(d) {
  return d.toISOString().split('T')[0]
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return `${DAYS_FR[d.getDay()]} ${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`
}

function formatDateFull(dateStr) {
  return formatDate(dateStr)
}

function showTooltip(event, day) {
  if (!day) return
  const rect = event.target.getBoundingClientRect()
  const container = event.target.closest('.github-contributions').getBoundingClientRect()
  tooltip.value = {
    visible: true,
    x: rect.left - container.left + CELL_SIZE / 2,
    y: rect.top - container.top - 52,
    day
  }
}

function dayCellClass(day) {
  const base = 'h-2.75 w-2.75 rounded-xs transition-opacity duration-100'
  if (!day) return `${base} invisible`

  const palette = isDark.value ? DARK_LEVEL_CLASSES : LIGHT_LEVEL_CLASSES
  return `${base} cursor-pointer hover:opacity-75 ${palette[day.level] || palette[0]}`
}

function legendCellClass(level) {
  const palette = isDark.value ? DARK_LEVEL_CLASSES : LIGHT_LEVEL_CLASSES
  return `h-2.75 w-2.75 rounded-xs ${palette[level] || palette[0]}`
}

async function fetchContributions() {
  try {
    loading.value = true
    error.value = false
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${props.username}?y=last`
    )
    if (!res.ok) throw new Error('Fetch failed')
    const data = await res.json()
    contributions.value = data.contributions
    const year = new Date().getFullYear()
    totalContributions.value = data.total[year] ?? data.total['lastYear'] ?? 0
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(fetchContributions)
</script>
