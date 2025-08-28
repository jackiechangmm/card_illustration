<template>
  <div class="px-6 py-8">
    <div class="flex justify-center">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-0">
        <div 
          ref="stageEl" 
          class="preview-stage" 
          :class="{ bw: cardStore.bwPreview }" 
          :style="stageStyle"
        >
          <div class="stack" :style="stackStyle">
          <template v-for="(card, i) in cardStore.expandedCards" :key="i">
            <!-- 背面卡片的外部标签 -->
            <div 
              v-if="shouldShowExternalLabel(card)" 
              class="external-label"
              :style="getExternalLabelStyle(i)"
            >
              <div class="label-col">
                <div v-if="card.rank" class="rank" :class="getSuitClass(card.suit)">
                  {{ formatRankDisplay(card.rank) }}
                </div>
                <div v-else-if="card.suit" class="rank invisible">
                  &nbsp;
                </div>
                <div v-if="card.suit" class="suit" :class="getSuitClass(card.suit)">
                  {{ getSuitGlyph(card.suit) }}
                </div>
                <div v-else-if="card.rank" class="suit invisible">
                  &nbsp;
                </div>
              </div>
            </div>

            <!-- 卡片容器 -->
            <div class="card-container" :style="getCardContainerStyle(i)">
              <!-- 文本描述卡片 -->
              <div 
                v-if="card.type === 'text'" 
                class="card text-card" 
                :class="{ 'is-topmost': isTopmost(i) }"
              >
                <div 
                  class="text-content" 
                  :style="getTextContentStyle(card, i)"
                  style="word-wrap: break-word; white-space: pre-wrap;"
                  v-html="formatTextWithLineBreaks(card.description)"
                >
                </div>
              </div>
              
              <!-- 扑克牌 -->
              <div 
                v-else 
                class="card" 
                :class="getCardFaceClass(card)"
              >
                <!-- Front face internal labels -->
                <template v-if="isCardFaceUp(card)">
                  <!-- Top-left corner -->
                  <div class="corner top-left">
                    <div class="label-col">
                      <div class="rank" :class="getSuitClass(card.suit)">
                        {{ formatRankDisplay(card.rank) }}
                      </div>
                      <div class="suit" :class="getSuitClass(card.suit)">
                        {{ getSuitGlyph(card.suit) }}
                      </div>
                    </div>
                  </div>
                  <!-- Bottom-right corner (rotated 180°) -->
                  <div class="corner bottom-right rotated">
                    <div class="label-col">
                      <div class="rank" :class="getSuitClass(card.suit)">
                        {{ formatRankDisplay(card.rank) }}
                      </div>
                      <div class="suit" :class="getSuitClass(card.suit)">
                        {{ getSuitGlyph(card.suit) }}
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Back face with inline SVG pattern -->
                <template v-else>
                  <svg class="back-pattern" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <defs>
                      <pattern id="cardTile" patternUnits="userSpaceOnUse" width="23.07" height="40">
                        <rect width="100%" height="100%" fill="#ffffff" />
                        <path fill="none" stroke="#4051b5" stroke-linecap="square"
                              d="m17.62 0-6.07 10.5m2.74 4.76L8.22 4.75m-5.48 0h12.13M.01 0h23.07M6.07 20 0 9.5m2.74-4.75-6.07 10.5m-5.48 0H3.33m8.2 4.75L0 .02-11.54 20m40.68 0L23.07 9.5m2.74-4.75-6.06 10.5m-5.49 0H26.4M34.6 20 23.08.02 11.53 20m-5.46 0L0 30.51m2.74 4.75-6.07-10.5m-5.48 0H3.33m8.2-4.75L0 40l-11.54-19.98zM17.6 40l-6.06-10.5m2.74-4.76L8.2 35.25m-5.48 0h12.13M0 40h23.07L11.54 20.01m17.6 0-6.07 10.5m2.74 4.75-6.06-10.5m-5.49 0H26.4M11.53 20h23.08L23.07 40" />
                      </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#cardTile)"/>
                  </svg>
                </template>
              </div>
            </div>
          </template>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCardStore } from '@/stores/cardStore'
import { CARD_CONSTANTS } from '@/types'
import { getSuitClass, getSuitGlyph, formatRankDisplay, isCardFaceUp, getCssVariableNumber } from '@/utils/cardUtils'
import type { ExpandedCard } from '@/types'

const cardStore = useCardStore()
const stageEl = ref<HTMLElement>()

// 检查是否有背面卡片需要显示外部标签
const hasBackLabels = computed(() => {
  return cardStore.expandedCards.some(card => 
    card.type === 'card' && !isCardFaceUp(card) && (card.rank || card.suit)
  )
})

// 舞台样式
const stageStyle = computed(() => {
  const showTopSpace = cardStore.fixedHeight || hasBackLabels.value
  return {
    padding: `${CARD_CONSTANTS.stagePadding}px`,
    '--card-w': `${CARD_CONSTANTS.cardW}px`,
    '--card-h': `${CARD_CONSTANTS.cardH}px`,
    '--visible-w': `${CARD_CONSTANTS.visibleW}px`,
    '--label-padding': '8px',
    '--label-gap': '10px',
    '--label-height': showTopSpace ? '66px' : '0px'
  }
})

// 卡片堆样式
const stackStyle = computed(() => ({
  width: `${cardStore.stackWidth}px`,
  height: `${CARD_CONSTANTS.cardH}px`
}))

// 判断是否应该显示外部标签
const shouldShowExternalLabel = (card: ExpandedCard) => {
  return card.type === 'card' && !isCardFaceUp(card) && (card.rank || card.suit)
}

// 获取外部标签样式
const getExternalLabelStyle = (index: number) => {
  const padding = getCssVariableNumber('--label-padding', 8, stageEl.value)
  const left = cardStore.leftOffset(index) + padding
  return {
    left: `${Math.round(left)}px`,
    zIndex: (1000 + index).toString()
  }
}

// 获取卡片容器样式
const getCardContainerStyle = (index: number) => ({
  left: `${cardStore.leftOffset(index)}px`,
  zIndex: cardStore.zIndex(index)
})

// 判断是否为最顶层卡片
const isTopmost = (index: number) => {
  return index === cardStore.expandedCards.length - 1
}

// 获取文本内容样式
const getTextContentStyle = (card: ExpandedCard, index: number) => {
  const innerMargin = 12
  const isTop = isTopmost(index)
  
  let textWidth: number
  if (isTop) {
    textWidth = Math.max(0, CARD_CONSTANTS.cardW - innerMargin)
  } else {
    const ratio = card.displayRatio || 1
    const baseWidth = cardStore.overlapW * Math.max(0, ratio)
    textWidth = Math.max(0, baseWidth - innerMargin)
  }
  
  return {
    width: Math.round(textWidth) + 'px'
  } as const
}

// 获取卡片正反面样式类
const getCardFaceClass = (card: ExpandedCard) => {
  return isCardFaceUp(card) ? 'front' : 'back'
}

// 格式化文本，支持转义换行符
const formatTextWithLineBreaks = (text: string) => {
  if (!text) return ''
  // 转义 HTML 特殊字符，然后处理换行符
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
  
  // 将 \n 转换为 <br>
  return escaped.replace(/\\n/g, '<br>')
}

// 暴露给父组件的接口
defineExpose({
  stageEl
})
</script>
