// 基础类型定义
export type CardType = 'card' | 'text'
export type Suit = 'S' | 'H' | 'D' | 'C' | ''
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | ''

// 卡片基础接口
export interface Card {
  type: CardType
  rank: Rank
  suit: Suit
  description: string
  faceUp: boolean
  displayRatio: number
  count: number
}

// 展开后的卡片接口（用于渲染）
export interface ExpandedCard {
  type: CardType
  rank: Rank
  suit: Suit
  description: string
  faceUp: boolean
  displayRatio: number
}

// Suit mappings from prototype
export const SUIT_CLASS_MAP: Record<string, string> = {
  'S': 'color-black',
  'C': 'color-black', 
  'H': 'color-red',
  'D': 'color-red',
}

export const SUIT_GLYPH_MAP: Record<string, string> = {
  'S': '}', // 黑桃
  'H': '{', // 红心
  'C': ']', // 梅花
  'D': '[', // 方块
}

// Card dimensions and constants
export const CARD_CONSTANTS = {
  cardW: 160,
  cardH: 240,
  visibleW: 120,
  stagePadding: 16,
} as const
