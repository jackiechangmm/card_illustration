import { SUIT_CLASS_MAP, SUIT_GLYPH_MAP } from '@/types'

/**
 * 获取花色对应的 CSS 类名
 * @param suit 花色字符串
 * @returns CSS 类名
 */
export const getSuitClass = (suit?: string): string => {
  return SUIT_CLASS_MAP[suit || ''] || 'color-black'
}

/**
 * 获取花色对应的字体符号
 * @param suit 花色字符串
 * @returns 花色符号
 */
export const getSuitGlyph = (suit?: string): string => {
  return SUIT_GLYPH_MAP[suit || ''] ?? suit ?? ''
}

/**
 * 格式化点数显示
 * @param rank 点数字符串
 * @returns 格式化后的点数
 */
export const formatRankDisplay = (rank?: string): string => {
  const normalizedRank = String(rank || '').trim().toUpperCase()
  return normalizedRank === '10' ? '=' : normalizedRank
}

/**
 * 判断卡片是否为正面朝上
 * @param card 卡片对象
 * @returns 是否正面朝上
 */
export const isCardFaceUp = (card: any): boolean => {
  return !!(card && card.faceUp)
}

/**
 * 获取 CSS 变量的数值
 * @param name CSS 变量名
 * @param fallback 默认值
 * @param el 目标元素，默认为 document.documentElement
 * @returns CSS 变量的数值
 */
export const getCssVariableNumber = (name: string, fallback: number, el?: HTMLElement): number => {
  const element = el || document.documentElement
  const value = getComputedStyle(element).getPropertyValue(name).trim()
  const number = parseFloat(value)
  return Number.isFinite(number) ? number : fallback
}
