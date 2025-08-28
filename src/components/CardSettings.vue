<template>
  <section class="pb-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold text-gray-800">{{ t('settings.title') }}</h2>
      <div class="flex gap-3">
        <button 
          @click="cardStore.addCard"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          {{ t('buttons.addCard') }}
        </button>
        <button 
          @click="cardStore.addText"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          {{ t('buttons.addText') }}
        </button>
        <button 
          @click="cardStore.clearCards"
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          {{ t('buttons.clear') }}
        </button>
        <button
          @click="cardStore.loadSample"
          class="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200 relative group"
          :aria-label="t('tooltips.restoreDefault')"
        >
          <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {{ t('tooltips.restoreDefault') }}
          </div>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.5 12a7.5 7.5 0 0112.92-5.303" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.25 3.75v3.5a.75.75 0 01-.75.75h-3.5" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 12a7.5 7.5 0 01-12.92 5.303" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.75 20.25v-3.5a.75.75 0 01.75-.75h3.5" />
          </svg>
        </button>
        <button
          @click="handleCopyData"
          class="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200 relative group"
          :aria-label="t('tooltips.copyData')"
        >
          <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {{ t('tooltips.copyData') }}
          </div>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          @click="handleImportData"
          class="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200 relative group"
          :aria-label="t('tooltips.importData')"
        >
          <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {{ t('tooltips.importData') }}
          </div>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.5 11.25L12 15.75l4.5-4.5" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v12.75" />
          </svg>
        </button>
      </div>
    </div>
    <div class="bg-white rounded-xl shadow-sm border border-gray-100" style="overflow: hidden; overflow: visible;">
      <table class="w-full">
        <thead class="bg-gray-50 relative" style="overflow: visible;">
          <tr>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">{{ t('settings.table.index') }}</th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" style="width: 110px">{{ t('settings.table.move') }}</th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" style="width: 150px">{{ t('settings.table.type') }}</th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" style="width: 150px">{{ t('settings.table.face') }}</th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" style="width: 120px">
              <div class="flex items-center justify-center gap-1">
                <span>{{ t('settings.table.rank') }}</span>
                <div class="relative group">
                  <svg class="w-3 h-3 text-gray-400 hover:text-gray-600 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke-width="2"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 17h.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 normal-case">
                    <div class="text-center">
                      <div class="font-medium mb-1">{{ t('settings.smartHelp.title') }}</div>
                      <div>{{ t('settings.smartHelp.item1') }}</div>
                      <div>{{ t('settings.smartHelp.item2') }}</div>
                      <div>{{ t('settings.smartHelp.item3') }}</div>
                      <div class="mt-1 text-gray-300">{{ t('settings.smartHelp.enter') }}</div>
                    </div>
                    <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              </div>
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" style="width: 120px">{{ t('settings.table.suit') }}</th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">{{ t('settings.table.text') }}</th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" style="width: 120px">{{ t('settings.table.ratio') }}</th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" style="width: 120px">{{ t('settings.table.count') }}</th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">{{ t('settings.table.actions') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="(card, idx) in cardStore.cards" :key="idx" class="hover:bg-gray-50 transition-colors duration-150">
            <td class="px-4 py-3 text-sm text-gray-500 font-medium text-center">{{ idx + 1 }}</td>
            <td class="px-4 py-3">
              <div class="flex justify-center gap-1">
                <button 
                  @click="cardStore.moveUp(idx)" 
                  :disabled="idx === 0"
                  class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent relative group"
                >
                  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {{ t('tooltips.moveUp') }}
                  </div>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                </button>
                <button 
                  @click="cardStore.moveDown(idx)" 
                  :disabled="idx === cardStore.cards.length - 1"
                  class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent relative group"
                >
                  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {{ t('tooltips.moveDown') }}
                  </div>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </div>
            </td>
            <td class="px-4 py-3">
              <div class="inline-flex w-full" role="group" :aria-label="t('settings.table.type')">
                <button
                  type="button"
                  :aria-pressed="card.type === 'card'"
                  @click="card.type = 'card'; cardStore.onRowBlur(card)"
                  :class="[
                    'flex-1 px-3 py-2 text-sm border transition-colors duration-200 first:rounded-l last:rounded-r',
                    card.type === 'card' 
                      ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  {{ t('settings.type.card') }}
                </button>
                <button
                  type="button"
                  :aria-pressed="card.type === 'text'"
                  @click="card.type = 'text'; cardStore.onRowBlur(card)"
                  :class="[
                    'flex-1 px-3 py-2 text-sm border -ml-px transition-colors duration-200 first:rounded-l last:rounded-r',
                    card.type === 'text' 
                      ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  {{ t('settings.type.text') }}
                </button>
              </div>
            </td>
            <td class="px-4 py-3 text-center">
              <div class="inline-flex w-full" role="group" :aria-label="t('settings.table.face')">
                <button
                  type="button"
                  :disabled="card.type === 'text'"
                  :aria-pressed="!!card.faceUp"
                  @click="card.faceUp = true; cardStore.onRowBlur(card)"
                  :class="[
                    'flex-1 px-3 py-2 text-sm border first:rounded-l last:rounded-r transition-colors duration-200',
                    card.faceUp
                      ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
                    card.type === 'text' ? 'opacity-30 cursor-not-allowed hover:bg-white' : ''
                  ]"
                >
                  {{ t('settings.face.front') }}
                </button>
                <button
                  type="button"
                  :disabled="card.type === 'text'"
                  :aria-pressed="!card.faceUp"
                  @click="card.faceUp = false; cardStore.onRowBlur(card)"
                  :class="[
                    'flex-1 px-3 py-2 text-sm border -ml-px first:rounded-l last:rounded-r transition-colors duration-200',
                    !card.faceUp
                      ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
                    card.type === 'text' ? 'opacity-30 cursor-not-allowed hover:bg-white' : ''
                  ]"
                >
                  {{ t('settings.face.back') }}
                </button>
              </div>
            </td>
            <td class="px-4 py-3">
              <input 
                type="text" 
                v-model.trim="card.rank" 
                @blur="handleRankInput(card, $event)" 
                @keydown="handleRankKeydown(card, $event)"
                :placeholder="t('settings.placeholders.rank')"
                :disabled="card.type === 'text'"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
              />
            </td>
            <td class="px-4 py-3">
              <select 
                v-model="card.suit" 
                @change="cardStore.onRowBlur(card)" 
                :disabled="card.type === 'text'"
                :class="[
                  'w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200',
                  { 'text-red-500': ['H', 'D'].includes(card.suit) }
                ]"
              >
                <option value="">{{ t('settings.select.noSuit') }}</option>
                <option value="S">♠</option>
                <option value="H" style="color: red">♥</option>
                <option value="C">♣</option>
                <option value="D" style="color: red">♦</option>
              </select>
            </td>
            <td class="px-4 py-3">
              <input 
                type="text" 
                v-model.trim="card.description" 
                @blur="cardStore.onRowBlur(card)" 
                :placeholder="t('settings.placeholders.text')"
                :disabled="card.type === 'card'"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
              />
            </td>
            <td class="px-4 py-3">
              <input 
                type="number" 
                step="0.05" 
                min="0" 
                v-model.number="card.displayRatio" 
                @wheel="handleNumberWheel(card, 'displayRatio', 0.05, 0, $event)"
                @blur="cardStore.onRowBlur(card)"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </td>
            <td class="px-4 py-3">
              <input 
                type="number" 
                step="1" 
                min="0" 
                v-model.number="card.count" 
                @wheel="handleNumberWheel(card, 'count', 1, 0, $event)"
                @blur="cardStore.onRowBlur(card)"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </td>
            <td class="px-4 py-3 text-center">
              <div class="flex gap-1 justify-center">
                <button 
                  @click="cardStore.duplicateCard(idx)"
                  class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 relative group"
                >
                  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {{ t('buttons.duplicate') }}
                  </div>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
                <button 
                  @click="cardStore.removeCard(idx)"
                  class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200 relative group"
                >
                  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {{ t('buttons.delete') }}
                  </div>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCardStore } from '@/stores/cardStore'
import { useI18n } from 'vue-i18n'

const cardStore = useCardStore()
const { t } = useI18n()

// 处理点数输入的智能解析
const handleRankInput = (card: any, event: Event) => {
  const input = (event.target as HTMLInputElement).value.trim()
  if (!input) {
    card.rank = ''
    card.suit = card.suit || ''
    cardStore.onRowBlur(card)
    return
  }

  // 使用 cardStore 中的解析函数
  const parsed = (cardStore as any).parsePokerShorthand(input)
  
  if (parsed.rank && parsed.suit) {
    // 如果解析出了点数和花色，都设置
    card.rank = parsed.rank
    card.suit = parsed.suit
  } else if (parsed.rank) {
    // 只解析出点数
    card.rank = parsed.rank
  } else if (parsed.suit) {
    // 只解析出花色，设置花色但清空点数
    card.rank = ''
    card.suit = parsed.suit
  } else {
    // 无法解析，保持原样
    card.rank = input.toUpperCase()
  }
  
  cardStore.onRowBlur(card)
}

// 处理回车键快速应用
const handleRankKeydown = (card: any, event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    handleRankInput(card, event)
    // 让输入框失去焦点
    ;(event.target as HTMLInputElement).blur()
  }
}

// 鼠标滚轮调节数字且不触发页面滚动
const handleNumberWheel = (
  card: any,
  field: 'displayRatio' | 'count',
  step: number,
  min: number,
  event: WheelEvent
) => {
  // 阻止页面滚动
  event.preventDefault()
  event.stopPropagation()

  const direction = event.deltaY < 0 ? 1 : -1 // 上滚增加，下滚减少
  let current = Number(card[field] ?? 0)
  if (!Number.isFinite(current)) current = 0

  let next = current + direction * step
  if (field === 'count') {
    next = Math.round(next)
  }
  if (next < min) next = min

  // 限制 displayRatio 过多小数位
  if (field === 'displayRatio') {
    next = Math.round(next * 100) / 100 // 保留2位小数
  }

  card[field] = next
  // 触发规范化与预览更新
  cardStore.onRowBlur(card)
}

// 复制数据到剪贴板
const handleCopyData = async () => {
  const data = JSON.stringify(cardStore.cards, null, 2)
  
  try {
    await navigator.clipboard.writeText(data)
    alert(t('alerts.copied'))
  } catch {
    // 降级方案：使用传统方法
    const textarea = document.createElement('textarea')
    textarea.value = data
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    
    try {
      const success = document.execCommand?.('copy')
      if (success) {
        alert(t('alerts.copied'))
      } else {
        throw new Error('复制命令执行失败')
      }
    } catch (error) {
      alert(t('alerts.copyFailed'))
      console.error('复制错误:', error)
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

// 从剪贴板导入数据
const handleImportData = async () => {
  // 尝试获取剪贴板内容
  let clipboardText = ''
  try {
    if (navigator.clipboard?.readText) {
      clipboardText = await navigator.clipboard.readText()
    }
  } catch {
    // 忽略剪贴板读取错误
  }

  const input = window.prompt(t('settings.placeholders.importPrompt'), clipboardText)
  if (input === null) return
  
  let parsedData: unknown
  try {
    parsedData = JSON.parse(input)
  } catch (error) {
    alert(t('alerts.parseFailed'))
    return
  }
  
  if (!Array.isArray(parsedData)) {
    alert(t('alerts.formatError'))
    return
  }
  
  // 使用 store 的标准化函数处理数据
  const normalizedCards = parsedData.map((item: any) => ({
    type: cardStore.normalizeType(item?.type),
    rank: cardStore.normalizeRank(item?.rank),
    suit: cardStore.normalizeSuit(item?.suit),
    description: cardStore.normalizeDescription(item?.description),
    faceUp: cardStore.normalizeFaceUp(item?.faceUp),
    displayRatio: cardStore.normalizeDisplayRatio(item?.displayRatio),
    count: cardStore.normalizeCount(item?.count)
  }))
  
  try {
    cardStore.cards = normalizedCards
    alert(t('alerts.importSuccess'))
  } catch (error) {
    alert(t('alerts.importFailed'))
    console.error('导入错误:', error)
  }
}
</script>
