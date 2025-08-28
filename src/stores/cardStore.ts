import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Card, ExpandedCard, CardType, Rank, Suit } from '@/types'
import { CARD_CONSTANTS } from '@/types'

export const useCardStore = defineStore('card', () => {
  // State
  const cards = ref<Card[]>([])
  const bwPreview = ref(false)
  const fixedHeight = ref(false)

  // Normalization functions (from prototype)
  const normalizeType = (type: any): CardType => {
    return type === 'text' ? 'text' : 'card'
  }

  const normalizeRank = (rank: any): Rank => {
    if (!rank) return ''
    const str = String(rank).trim().toUpperCase()
    const validRanks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', '']
    return validRanks.includes(str as Rank) ? str as Rank : ''
  }

  const normalizeSuit = (suit: any): Suit => {
    if (!suit) return ''
    const str = String(suit).trim().toUpperCase()
    const validSuits: Suit[] = ['S', 'H', 'D', 'C', '']
    return validSuits.includes(str as Suit) ? str as Suit : ''
  }

  // 解析扑克牌简写格式 (如 '4h', 'h4', 'AS', 'sA' 等)
  const parsePokerShorthand = (input: string): { rank: Rank, suit: Suit } => {
    const str = String(input).trim().toUpperCase()
    
    // 花色映射
    const suitMap: Record<string, Suit> = {
      'S': 'S', 'SPADE': 'S', 'SPADES': 'S', '♠': 'S',
      'H': 'H', 'HEART': 'H', 'HEARTS': 'H', '♥': 'H', '♡': 'H',
      'D': 'D', 'DIAMOND': 'D', 'DIAMONDS': 'D', '♦': 'D', '♢': 'D',
      'C': 'C', 'CLUB': 'C', 'CLUBS': 'C', '♣': 'C', '♧': 'C'
    }
    
    // 点数映射
    const rankMap: Record<string, Rank> = {
      'A': 'A', 'ACE': 'A',
      '2': '2', 'TWO': '2',
      '3': '3', 'THREE': '3',
      '4': '4', 'FOUR': '4',
      '5': '5', 'FIVE': '5',
      '6': '6', 'SIX': '6',
      '7': '7', 'SEVEN': '7',
      '8': '8', 'EIGHT': '8',
      '9': '9', 'NINE': '9',
      '10': '10', 'T': '10', 'TEN': '10',
      'J': 'J', 'JACK': 'J',
      'Q': 'Q', 'QUEEN': 'Q',
      'K': 'K', 'KING': 'K'
    }
    
    let rank: Rank = ''
    let suit: Suit = ''
    
    // 尝试各种模式匹配
    // 模式1: 点数+花色 (如 4H, AS, 10S)
    const rankSuitMatch = str.match(/^([A-Z0-9]+)([SHDC])$/)
    if (rankSuitMatch) {
      const [, r, s] = rankSuitMatch
      rank = rankMap[r] || ''
      suit = suitMap[s] || ''
    }
    
    // 模式2: 花色+点数 (如 H4, SA, S10)
    if (!rank && !suit) {
      const suitRankMatch = str.match(/^([SHDC])([A-Z0-9]+)$/)
      if (suitRankMatch) {
        const [, s, r] = suitRankMatch
        suit = suitMap[s] || ''
        rank = rankMap[r] || ''
      }
    }
    
    // 模式3: 单独的点数或花色
    if (!rank && !suit) {
      if (rankMap[str]) {
        rank = rankMap[str]
      } else if (suitMap[str]) {
        suit = suitMap[str]
      }
    }
    
    return { rank, suit }
  }

  const normalizeDescription = (description: any): string => {
    return typeof description === 'string' ? description : ''
  }

  const normalizeFaceUp = (val: any): boolean => {
    if (typeof val === 'boolean') return val
    const s = String(val ?? 'true').trim().toLowerCase()
    if (s === 'true' || s === '1' || s === 'front' || s === '正面') return true
    if (s === 'false' || s === '0' || s === 'back' || s === '背面') return false
    return true
  }

  const normalizeCount = (val: any): number => {
    if (val === undefined || val === null) return 1
    const n = parseInt(val, 10)
    if (!Number.isFinite(n)) return 1
    return n
  }

  const normalizeDisplayRatio = (val: any): number => {
    if (val === undefined || val === null) return 1
    const n = Number(val)
    if (!Number.isFinite(n)) return 1
    return Math.max(0, n)
  }

  // Computed properties
  const expandedCards = computed((): ExpandedCard[] => {
    const out: ExpandedCard[] = []
    for (const c of cards.value) {
      if (!c) continue
      const count = normalizeCount(c.count)
      if (count <= 0) continue
      const type = normalizeType(c.type)
      const faceUp = normalizeFaceUp(c.faceUp)
      const rank = normalizeRank(c.rank)
      const suit = normalizeSuit(c.suit)
      const description = normalizeDescription(c.description)
      const displayRatio = normalizeDisplayRatio(c.displayRatio)
      
      if (type === 'text') {
        for (let i = 0; i < count; i++) {
          out.push({ type, rank: '', suit: '', description, faceUp: true, displayRatio })
        }
      } else {
        // For regular cards, allow empty rank and suit
        for (let i = 0; i < count; i++) {
          out.push({ type, rank, suit, description: '', faceUp, displayRatio })
        }
      }
    }
    return out
  })

  const overlapW = computed(() => {
    return CARD_CONSTANTS.cardW - CARD_CONSTANTS.visibleW
  })

  const stackWidth = computed(() => {
    const n = expandedCards.value.length
    if (n <= 0) return CARD_CONSTANTS.cardW
    
    let sum = 0
    for (let i = 1; i < n; i++) {
      const prev = expandedCards.value[i - 1]
      const r = prev && Number.isFinite(prev.displayRatio) ? prev.displayRatio : 1
      sum += overlapW.value * Math.max(0, r)
    }
    return Math.round(CARD_CONSTANTS.cardW + sum)
  })

  // Actions
  const addCard = () => {
    cards.value.push({
      type: normalizeType('card'),
      rank: normalizeRank(''),
      suit: normalizeSuit(''),
      description: normalizeDescription(''),
      faceUp: normalizeFaceUp(true),
      displayRatio: normalizeDisplayRatio(1),
      count: normalizeCount(1),
    })
  }

  const addText = () => {
    cards.value.push({
      type: normalizeType('text'),
      rank: normalizeRank(''),
      suit: normalizeSuit(''),
      description: normalizeDescription('...'),
      faceUp: normalizeFaceUp(true),
      displayRatio: normalizeDisplayRatio(1),
      count: normalizeCount(1),
    })
  }

  const duplicateCard = (idx: number) => {
    const c = cards.value[idx]
    if (!c) return
    cards.value.splice(idx + 1, 0, { ...c })
  }

  const removeCard = (idx: number) => {
    if (idx < 0 || idx >= cards.value.length) return
    cards.value.splice(idx, 1)
  }

  const moveUp = (idx: number) => {
    if (idx <= 0) return
    const item = cards.value.splice(idx, 1)[0]
    cards.value.splice(idx - 1, 0, item)
  }

  const moveDown = (idx: number) => {
    if (idx < 0 || idx >= cards.value.length - 1) return
    const item = cards.value.splice(idx, 1)[0]
    cards.value.splice(idx + 1, 0, item)
  }

  const clearCards = () => {
    cards.value = []
  }

  const loadSample = () => {
    const sampleRows: any[] = [
      {
        type: 'card',
        rank: 'A',
        suit: 'S',
        faceUp: true,
        displayRatio: 1,
        count: 1,
      },
      {
        type: 'card',
        rank: 'A',
        suit: 'H',
        faceUp: true,
        displayRatio: 1,
        count: 1,
      },
      {
        type: 'card',
        rank: 'A',
        suit: 'C',
        faceUp: true,
        displayRatio: 1,
        count: 1,
      },
      {
        type: 'card',
        rank: 'A',
        suit: 'D',
        faceUp: true,
        displayRatio: 1,
        count: 1,
      },
      {
        type: 'card',
        faceUp: false,
        displayRatio: 0.3,
        count: 3,
      },
      {
        type: 'text',
        faceUp: true,
        description: "...",
        displayRatio: 3,
        count: 1,
      },
      {
        type: 'card',
        rank: '7',
        suit: 'D',
        faceUp: false,
        displayRatio: 1,
        count: 1,
      },
      {
        type: 'card',
        rank: '2',
        suit: 'H',
        faceUp: false,
        displayRatio: 1,
        count: 1,
      },
      {
        type: 'card',
        rank: '4',
        suit: 'C',
        faceUp: false,
        displayRatio: 1,
        count: 1,
      },
    ]
    
    cards.value = sampleRows.map(c => ({
      type: normalizeType(c.type),
      rank: normalizeRank(c.rank || ''),
      suit: normalizeSuit(c.suit || ''),
      description: normalizeDescription(c.description || ''),
      faceUp: normalizeFaceUp(c.faceUp),
      displayRatio: normalizeDisplayRatio(c.displayRatio),
      count: normalizeCount(c.count),
    }))
  }

  const onRowBlur = (card: Card) => {
    if (!card) return
    card.type = normalizeType(card.type)
    card.faceUp = !!normalizeFaceUp(card.faceUp)
    card.rank = normalizeRank(card.rank)
    card.suit = normalizeSuit(card.suit)
    card.description = normalizeDescription(card.description)
    card.displayRatio = normalizeDisplayRatio(card.displayRatio)
    card.count = normalizeCount(card.count)
  }

  // Helper functions for positioning
  const leftOffset = (i: number): number => {
    if (!Array.isArray(expandedCards.value) || i <= 0) return 0
    let sum = 0
    for (let k = 1; k <= i; k++) {
      const prev = expandedCards.value[k - 1]
      const r = prev && Number.isFinite(prev.displayRatio) ? prev.displayRatio : 1
      sum += overlapW.value * Math.max(0, r)
    }
    return Math.round(sum)
  }

  const zIndex = (i: number): number => {
    return i
  }

  return {
    // State
    cards,
    bwPreview,
    fixedHeight,
    expandedCards,
    // Computed
    overlapW,
    stackWidth,
    // Actions
    addCard,
    addText,
    removeCard,
    duplicateCard,
    moveUp,
    moveDown,
    onRowBlur,
    loadSample,
    clearCards,
    // Helpers
    leftOffset,
    zIndex,
    // Normalization functions (exposed for components)
    normalizeType,
    normalizeDescription,
    normalizeSuit,
    normalizeRank,
    normalizeFaceUp,
    normalizeCount,
    normalizeDisplayRatio,
    parsePokerShorthand,
  }
})
