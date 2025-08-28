<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-semibold text-gray-800">{{ t('header.title') }}</h1>
      <div class="flex items-center gap-4">
        <!-- 固定高度开关 -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">{{ t('header.fixedHeight') }}</span>
          <button
            @click="cardStore.fixedHeight = !cardStore.fixedHeight"
            :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              cardStore.fixedHeight ? 'bg-blue-600' : 'bg-gray-300'
            ]"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                cardStore.fixedHeight ? 'translate-x-6' : 'translate-x-1'
              ]"
            />
          </button>
        </div>

        <!-- 黑白模式开关 -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">{{ t('header.bwMode') }}</span>
          <button
            @click="cardStore.bwPreview = !cardStore.bwPreview"
            :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              cardStore.bwPreview ? 'bg-blue-600' : 'bg-gray-300'
            ]"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                cardStore.bwPreview ? 'translate-x-6' : 'translate-x-1'
              ]"
            />
          </button>
        </div>

        <!-- 语言切换 -->
        <div class="flex items-center gap-2">
          <button
            @click="toggleLang"
            class="px-4 py-2 border border-gray-300 rounded font-medium hover:bg-gray-50 text-gray-700 transition-colors duration-200 flex items-center"
            :aria-label="t('header.langSwitch')"
            :title="t('header.langSwitch')"
          >
            {{ t('header.langSwitch') }}
          </button>
        </div>

        <!-- 导出图片按钮 -->
        <div class="flex items-center gap-2">
          <button 
            @click="handleExportClick"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            {{ t('header.exportImage') }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCardStore } from '@/stores/cardStore'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const cardStore = useCardStore()
const { t, locale } = useI18n()

const emit = defineEmits<{
  exportImage: []
}>()

const handleExportClick = () => {
  emit('exportImage')
}

const toggleLang = () => {
  const next = (locale.value as 'zh' | 'en') === 'zh' ? 'en' : 'zh'
  setLocale(next)
}
</script>
