<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import type { ProjectModalContent } from '../data/projectModal'

defineProps<{ content: ProjectModalContent | null }>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const onOverlayClick = (event: MouseEvent) => {
  if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
    emit('close')
  }
}

const onKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="content"
        class="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        @click="onOverlayClick"
      >
        <div class="modal-backdrop absolute inset-0"></div>

        <article class="modal-card relative w-full max-w-6xl overflow-hidden rounded-2xl text-white">
          <div class="scanlines absolute inset-0 pointer-events-none z-10"></div>

          <header class="modal-header relative flex items-center justify-between px-6 py-4 border-b border-[#2ecc71]/20">
            <div class="flex items-center gap-3">
              <div class="flex gap-1.5">
                <span class="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
                <span class="w-3 h-3 rounded-full bg-[#febc2e]"></span>
                <span class="w-3 h-3 rounded-full bg-[#2ecc71]"></span>
              </div>
              <span class="font-mono text-xs text-white/30 tracking-widest uppercase">projet.exe</span>
            </div>
            <button
              class="close-btn flex items-center gap-2 font-mono text-xs text-white/30 hover:text-[#2ecc71] transition-colors duration-200"
              @click="emit('close')"
              aria-label="Fermer"
            >
              <span class="tracking-widest">[ESC]</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </header>

          <div class="modal-body grid grid-cols-1 lg:grid-cols-[0.9fr_1.7fr] h-[85vh] overflow-hidden">
            <div class="modal-left relative flex flex-col overflow-hidden border-r border-[#2ecc71]/10">
              <div class="relative h-52 lg:h-64 overflow-hidden shrink-0">
                <img
                  v-if="content.image"
                  :src="content.image"
                  :alt="content.title"
                  class="h-full w-full object-cover opacity-60 scale-105"
                />
                <div class="absolute inset-0 bg-linear-to-b from-transparent via-[#070d09]/60 to-[#070d09]"></div>
                <div class="grid-overlay absolute inset-0"></div>
              </div>

              <div class="flex flex-col gap-5 p-6 flex-1">
                <div class="reveal-item" style="--delay: 0.05s">
                  <p class="font-mono text-[10px] tracking-[0.35em] text-[#2ecc71]/60 uppercase mb-2">// identifiant</p>
                  <h2 class="font-mono text-2xl font-bold leading-tight tracking-tight text-white">
                    {{ content.title }}
                  </h2>
                  <p class="mt-3 font-mono text-xs leading-6 text-white/60">
                    {{ content.subtitle }}
                  </p>
                </div>

                <div class="reveal-item" style="--delay: 0.1s">
                  <p class="font-mono text-[10px] tracking-[0.35em] text-[#2ecc71]/60 uppercase mb-2">// stack</p>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="tag in content.tags"
                      :key="tag"
                      class="tag font-mono text-[11px] px-2.5 py-1 rounded border border-[#2ecc71]/25 bg-[#2ecc71]/8 text-[#7dffab]"
                    >{{ tag }}</span>
                  </div>
                </div>

                <div class="reveal-item mt-auto" style="--delay: 0.15s">
                  <div class="stat-grid grid grid-cols-2 gap-2">
                    <div
                      v-for="stat in content.stats"
                      :key="stat.label"
                      class="stat-cell rounded-lg border border-white/8 bg-white/3 p-3"
                    >
                      <p class="font-mono text-[9px] tracking-widest text-white/30 uppercase">{{ stat.label }}</p>
                      <p class="font-mono text-sm font-semibold text-white/80 mt-1">{{ stat.value }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-right overflow-y-auto overflow-x-hidden p-6 sm:p-8 space-y-6 scrollbar-thin flex-1">
              <section class="reveal-item content-block" style="--delay: 0.1s">
                <div class="section-label">
                  <span class="font-mono text-[10px] tracking-[0.35em] text-[#2ecc71]/60 uppercase">01 — contexte</span>
                  <div class="section-line"></div>
                </div>
                <p class="font-mono text-sm leading-7 text-white/65 mt-3">
                  {{ content.context }}
                </p>
              </section>

              <section class="reveal-item content-block" style="--delay: 0.15s">
                <div class="section-label">
                  <span class="font-mono text-[10px] tracking-[0.35em] text-[#2ecc71]/60 uppercase">02 — objectifs</span>
                  <div class="section-line"></div>
                </div>
                <p class="font-mono text-sm leading-7 text-white/65 mt-3">
                  {{ content.objective }}
                </p>
              </section>

              <section class="reveal-item content-block" style="--delay: 0.2s">
                <div class="section-label">
                  <span class="font-mono text-[10px] tracking-[0.35em] text-[#2ecc71]/60 uppercase">03 — réalisation</span>
                  <div class="section-line"></div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                  <div
                    v-for="(item, i) in content.realization"
                    :key="i"
                    class="tech-card rounded-xl border border-white/8 bg-white/2 p-4"
                  >
                    <p class="font-mono text-[9px] tracking-widest text-[#2ecc71]/50 uppercase">Point {{ i + 1 }}</p>
                    <p class="font-mono text-xs text-white/75 mt-2 leading-5">{{ item }}</p>
                  </div>
                </div>
              </section>

              <section v-if="content.title === 'GitlabEventsHook'" class="reveal-item content-block" style="--delay: 0.25s">
                <div class="section-label">
                  <span class="font-mono text-[10px] tracking-[0.35em] text-[#2ecc71]/60 uppercase">04 — architecture</span>
                  <div class="section-line"></div>
                </div>
                <div class="mt-6 space-y-6">
                  <!-- Before Architecture -->
                  <div>
                    <p class="font-mono text-[9px] text-red-400/70 uppercase mb-3">❌ Avant - Webhooks directs</p>
                    <svg viewBox="0 0 500 80" class="w-full h-auto">
                      <!-- GitLab -->
                      <rect x="20" y="10" width="80" height="60" rx="4" fill="#1f2937" stroke="#ff6b6b" stroke-width="2"/>
                      <text x="60" y="45" text-anchor="middle" class="text-[12px] fill-white font-bold" font-family="monospace">GitLab</text>
                      
                      <!-- Arrow -->
                      <path d="M 110 40 L 130 40" stroke="#ff6b6b" stroke-width="2" fill="none" marker-end="url(#arrowred)"/>
                      
                      <!-- Webhooks -->
                      <rect x="140" y="10" width="100" height="60" rx="4" fill="#7c2d12" stroke="#fb923c" stroke-width="2"/>
                      <text x="190" y="35" text-anchor="middle" class="text-[11px] fill-white font-bold" font-family="monospace">Webhooks</text>
                      <text x="190" y="55" text-anchor="middle" class="text-[9px] fill-orange-300" font-family="monospace">HTTPS</text>
                      
                      <!-- Arrow -->
                      <path d="M 250 40 L 270 40" stroke="#ff6b6b" stroke-width="2" fill="none" marker-end="url(#arrowred)"/>
                      
                      <!-- Backend -->
                      <rect x="280" y="10" width="80" height="60" rx="4" fill="#1e3a1f" stroke="#ff6b6b" stroke-width="2"/>
                      <text x="320" y="45" text-anchor="middle" class="text-[12px] fill-white font-bold" font-family="monospace">Backend</text>
                      
                      <!-- Marker -->
                      <defs>
                        <marker id="arrowred" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                          <path d="M0,0 L0,6 L9,3 z" fill="#ff6b6b"/>
                        </marker>
                      </defs>
                    </svg>
                    <p class="font-mono text-[9px] text-red-400/60 mt-2">⚠ Couplage direct, surcharge réseau, faible scalabilité</p>
                  </div>
                  
                  <!-- After Architecture -->
                  <div>
                    <p class="font-mono text-[9px] text-[#2ecc71]/70 uppercase mb-3">✓ Après - Architecture Kafka</p>
                    <svg viewBox="0 0 600 100" class="w-full h-auto">
                      <!-- GitLab -->
                      <rect x="10" y="20" width="70" height="60" rx="4" fill="#1f2937" stroke="#2ecc71" stroke-width="2"/>
                      <text x="45" y="55" text-anchor="middle" class="text-[11px] fill-white font-bold" font-family="monospace">GitLab</text>
                      
                      <!-- Arrow -->
                      <path d="M 90 50 L 105 50" stroke="#2ecc71" stroke-width="2" fill="none" marker-end="url(#arrowgreen)"/>
                      
                      <!-- Filehooks -->
                      <rect x="115" y="20" width="70" height="60" rx="4" fill="#155e75" stroke="#06b6d4" stroke-width="2"/>
                      <text x="150" y="55" text-anchor="middle" class="text-[11px] fill-white font-bold" font-family="monospace">Filehooks</text>
                      
                      <!-- Arrow -->
                      <path d="M 195 50 L 210 50" stroke="#2ecc71" stroke-width="2" fill="none" marker-end="url(#arrowgreen)"/>
                      
                      <!-- OpenTelemetry -->
                      <rect x="220" y="20" width="90" height="60" rx="4" fill="#155e75" stroke="#06b6d4" stroke-width="2"/>
                      <text x="265" y="55" text-anchor="middle" class="text-[10px] fill-white font-bold" font-family="monospace">OpenTelemetry</text>
                      
                      <!-- Arrow -->
                      <path d="M 320 50 L 335 50" stroke="#2ecc71" stroke-width="2" fill="none" marker-end="url(#arrowgreen)"/>
                      
                      <!-- Kafka -->
                      <rect x="345" y="20" width="70" height="60" rx="4" fill="#b45309" stroke="#fbbf24" stroke-width="2"/>
                      <text x="380" y="55" text-anchor="middle" class="text-[11px] fill-white font-bold" font-family="monospace">Kafka</text>
                      
                      <!-- Arrow -->
                      <path d="M 425 50 L 440 50" stroke="#2ecc71" stroke-width="2" fill="none" marker-end="url(#arrowgreen)"/>
                      
                      <!-- Backend IA -->
                      <rect x="450" y="20" width="80" height="60" rx="4" fill="#1e3a1f" stroke="#2ecc71" stroke-width="2"/>
                      <text x="490" y="50" text-anchor="middle" class="text-[11px] fill-white font-bold" font-family="monospace">Backend</text>
                      <text x="490" y="65" text-anchor="middle" class="text-[9px] fill-[#7dffab]" font-family="monospace">IA</text>
                      
                      <!-- Marker -->
                      <defs>
                        <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                          <path d="M0,0 L0,6 L9,3 z" fill="#2ecc71"/>
                        </marker>
                      </defs>
                    </svg>
                    <p class="font-mono text-[9px] text-[#2ecc71]/60 mt-2">✨ Découplé, scalable, événementiel</p>
                  </div>
                </div>
              </section>

              <section class="reveal-item content-block" style="--delay: 0.3s">
                <div class="section-label">
                  <span class="font-mono text-[10px] tracking-[0.35em] text-[#2ecc71]/60 uppercase">{{ content.title === 'GitlabEventsHook' ? '05 — difficultés' : '04 — difficultés' }}</span>
                  <div class="section-line"></div>
                </div>
                <p class="font-mono text-sm leading-7 text-white/65 mt-3">
                  {{ content.difficulty }}
                </p>
              </section>

              <section class="reveal-item content-block" style="--delay: 0.3s">
                <div class="section-label">
                  <span class="font-mono text-[10px] tracking-[0.35em] text-[#2ecc71]/60 uppercase">{{ content.title === 'GitlabEventsHook' ? '06 — compétences' : '05 — compétences' }}</span>
                  <div class="section-line"></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div
                    v-for="comp in content.competencies"
                    :key="comp.code"
                    class="comp-card group rounded-lg border border-[#2ecc71]/20 bg-gradient-to-br from-[#2ecc71]/8 to-[#2ecc71]/2 p-4 flex flex-col gap-2 hover:shadow-md"
                  >
                    <div class="flex items-start gap-2.5">
                      <div v-if="comp.code" class="flex-shrink-0">
                        <span class="font-mono text-xs font-bold text-[#2ecc71] bg-[#2ecc71]/15 px-2 py-1 rounded">{{ comp.code }}</span>
                      </div>
                      <span class="font-mono text-xs text-white/70 leading-5 flex-1">{{ comp.label }}</span>
                    </div>
                  </div>
                </div>
              </section>

              <div class="reveal-item pt-2" style="--delay: 0.35s">
                <button
                  class="cta-btn w-full font-mono text-sm font-bold tracking-widest uppercase py-3.5 rounded-xl transition-all duration-300"
                  @click="emit('close')"
                >
                  <span>Fermer la fiche _</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');

.modal-backdrop {
  background: radial-gradient(ellipse at 40% 30%, rgba(46, 204, 113, 0.06) 0%, transparent 60%),
              rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
}

.modal-card {
  background: #070d09;
  border: 1px solid rgba(46, 204, 113, 0.18);
  box-shadow:
    0 0 0 1px rgba(46, 204, 113, 0.05),
    0 40px 120px rgba(0, 0, 0, 0.7),
    0 0 80px rgba(46, 204, 113, 0.04) inset;
  font-family: 'JetBrains Mono', monospace;
}

.modal-header {
  background: rgba(46, 204, 113, 0.03);
}

.scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  opacity: 0.4;
}

.grid-overlay {
  background-image:
    linear-gradient(rgba(46, 204, 113, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(46, 204, 113, 0.05) 1px, transparent 1px);
  background-size: 32px 32px;
}

.modal-left {
  background: linear-gradient(180deg, rgba(46, 204, 113, 0.02) 0%, transparent 50%);
}

.section-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(46, 204, 113, 0.3), transparent);
}

.reveal-item {
  opacity: 0;
  transform: translateY(10px);
  animation: revealUp 0.6s ease forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes revealUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tech-card,
.comp-card,
.stat-cell {
  transition: all 0.25s ease;
}

.tech-card:hover,
.stat-cell:hover {
  transform: translateY(-2px);
  border-color: rgba(46, 204, 113, 0.25);
  background: rgba(255, 255, 255, 0.04);
}

.comp-card {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-color: rgba(46, 204, 113, 0.2);
}

.comp-card:hover {
  transform: translateY(-3px);
  border-color: rgba(46, 204, 113, 0.4);
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.12), rgba(46, 204, 113, 0.06));
  box-shadow: 0 8px 24px rgba(46, 204, 113, 0.15);
}

.cta-btn {
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.12), rgba(46, 204, 113, 0.05));
  border: 1px solid rgba(46, 204, 113, 0.2);
  color: #7dffab;
}

.cta-btn:hover {
  background: rgba(46, 204, 113, 0.18);
  border-color: rgba(46, 204, 113, 0.4);
  box-shadow: 0 0 20px rgba(46, 204, 113, 0.12);
  transform: translateY(-1px);
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(46, 204, 113, 0.25);
  border-radius: 999px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(46, 204, 113, 0.45);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.35s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-card,
.modal-fade-leave-active .modal-card {
  transition: transform 0.35s ease;
}

.modal-fade-enter-from .modal-card,
.modal-fade-leave-to .modal-card {
  transform: scale(0.96) translateY(20px);
}
</style>
