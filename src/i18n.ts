import { createI18n } from 'vue-i18n'

export type AppLocale = 'zh' | 'en'

const messages = {
  zh: {
    header: {
      title: '纸牌插图生成工具',
      fixedHeight: '固定高度',
      bwMode: '黑白模式',
      exportImage: '导出图片',
      langSwitch: '中文/English'
    },
    buttons: {
      addCard: '新增牌',
      addText: '新增描述',
      clear: '清空',
      duplicate: '复制',
      delete: '删除',
      restore: '恢复默认'
    },
    tooltips: {
      restoreDefault: '恢复默认',
      copyData: '复制数据',
      importData: '导入数据',
      moveUp: '上移',
      moveDown: '下移'
    },
    settings: {
      title: '牌列表设置',
      table: {
        index: '#',
        move: '移动',
        type: '类型',
        face: '方向',
        rank: '点数',
        suit: '花色',
        text: '文本描述',
        ratio: '显示比例',
        count: '重复',
        actions: '操作'
      },
      type: {
        card: '牌',
        text: '描述'
      },
      face: {
        front: '正面',
        back: '背面'
      },
      placeholders: {
        rank: 'A/ 7/ 10H',
        text: '支持\\n换行符',
        importPrompt: '粘贴 JSON 数组以导入（会替换当前列表）'
      },
      select: {
        noSuit: '不设置'
      },
      smartHelp: {
        title: '智能解析支持：',
        item1: '• 小写自动转大写：a → A',
        item2: '• 扑克牌简写：4h → 点数4+红桃',
        item3: '• 支持格式：4h, h4, AS, sA 等',
        enter: '按回车键快速应用'
      }
    },
    alerts: {
      copied: '已复制到剪贴板',
      copyFailed: '复制失败，请手动复制',
      previewNotFound: '未找到预览区域',
      exportFailed: '导出失败：{message}',
      importSuccess: '导入成功',
      importFailed: '导入失败',
      parseFailed: '解析失败：不是有效的 JSON',
      formatError: '格式错误：应为数组'
    }
  },
  en: {
    header: {
      title: 'Card Illustration Generator',
      fixedHeight: 'Fixed Height',
      bwMode: 'B/W Mode',
      exportImage: 'Export Image',
      langSwitch: '中文/English'
    },
    buttons: {
      addCard: 'Add Card',
      addText: 'Add Text',
      clear: 'Clear',
      duplicate: 'Duplicate',
      delete: 'Delete',
      restore: 'Restore Default'
    },
    tooltips: {
      restoreDefault: 'Restore Default',
      copyData: 'Copy Data',
      importData: 'Import Data',
      moveUp: 'Move Up',
      moveDown: 'Move Down'
    },
    settings: {
      title: 'Card List Settings',
      table: {
        index: '#',
        move: 'Move',
        type: 'Type',
        face: 'Face',
        rank: 'Rank',
        suit: 'Suit',
        text: 'Text',
        ratio: 'Display Ratio',
        count: 'Count',
        actions: 'Actions'
      },
      type: {
        card: 'Card',
        text: 'Text'
      },
      face: {
        front: 'Up',
        back: 'Down'
      },
      placeholders: {
        rank: 'A/ 7/ 10H',
        text: 'Supports \\n line breaks',
        importPrompt: 'Paste JSON array to import (will replace current list)'
      },
      select: {
        noSuit: 'None'
      },
      smartHelp: {
        title: 'Smart parsing supports:',
        item1: '• Auto uppercase: a → A',
        item2: '• Poker shorthand: 4h → rank 4 + hearts',
        item3: '• Supported formats: 4h, h4, AS, sA etc.',
        enter: 'Press Enter to apply'
      }
    },
    alerts: {
      copied: 'Copied to clipboard',
      copyFailed: 'Copy failed, please copy manually',
      previewNotFound: 'Preview area not found',
      exportFailed: 'Export failed: {message}',
      importSuccess: 'Import successful',
      importFailed: 'Import failed',
      parseFailed: 'Parse failed: invalid JSON',
      formatError: 'Format error: should be an array'
    }
  }
} as const

const saved = (localStorage.getItem('app-locale') as AppLocale) || 'zh'

export const i18n = createI18n({
  legacy: false,
  locale: saved,
  fallbackLocale: 'en',
  messages
})

export function setLocale(locale: AppLocale) {
  i18n.global.locale.value = locale
  localStorage.setItem('app-locale', locale)
}

export default i18n
