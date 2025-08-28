<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from './components/AppHeader.vue'
import CardPreview from './components/CardPreview.vue'
import CardSettings from './components/CardSettings.vue'
import { useCardStore } from './stores/cardStore'
import * as htmlToImage from 'html-to-image'

import logoUrl from '/logo.svg'

const cardStore = useCardStore()
const { t } = useI18n()
const cardPreviewRef = ref<InstanceType<typeof CardPreview>>()

const handleExportImage = async () => {
  try {
    const stage = cardPreviewRef.value?.stageEl
    if (!stage) {
      alert(t('alerts.previewNotFound'))
      return
    }

    // 等待字体加载完成
    if (document.fonts?.ready) {
      try {
        await document.fonts.ready
      } catch {
        // 忽略字体加载错误
      }
    }

    // 临时移除 Google Fonts 避免 CORS 问题
    const googleFontLinks = Array.from(
      document.querySelectorAll('link[href*="fonts.googleapis.com"], link[href*="fonts.gstatic.com"]')
    )
    const removedLinks = googleFontLinks.map(el => ({
      parent: el.parentNode,
      next: el.nextSibling,
      element: el
    }))

    googleFontLinks.forEach(el => el.parentNode?.removeChild(el))

    // 导出图片
    const dataUrl = await htmlToImage.toPng(stage, {
      backgroundColor: '#ffffff',
      pixelRatio: 2
    })

    // 下载图片
    const link = document.createElement('a')
    link.download = `cards-${Date.now()}.png`
    link.href = dataUrl
    link.click()

    // 恢复 Google Fonts 链接
    removedLinks.forEach(({ parent, next, element }) => {
      if (parent) parent.insertBefore(element, next)
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    alert(t('alerts.exportFailed', { message }))
  }
}

// 初始化时加载示例数据
cardStore.loadSample()
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50 flex flex-col">
    <AppHeader @export-image="handleExportImage" />
    <main class="w-full px-6 flex-1">
      <CardPreview ref="cardPreviewRef" />
      <CardSettings />
    </main>
    <footer class="w-full px-6 py-6 text-center text-sm text-gray-500">
      <div class="flex items-center justify-center gap-3 mb-4">
        <img :src="logoUrl" alt="Logo" class="h-12 w-12" />
      </div>
      <div>O_。怪怪 设计</div>
      <div>Designed by jackiechangmm</div>
    </footer>
  </div>
</template>
