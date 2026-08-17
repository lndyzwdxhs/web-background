// @ts-nocheck
import React from 'react'

const SETTINGS_NS = 'settings.web-background'
const OVERRIDE_SOURCE = 'web-background:background'

const STORAGE_TYPE = 'web-background:type'
const STORAGE_COLOR = 'web-background:color'
const STORAGE_IMAGE = 'web-background:image'
const STORAGE_OPACITY = 'web-background:opacity'

const TYPES = ['none', 'color', 'image']
const DEFAULT_COLOR = '#1c1c20'
const DEFAULT_OPACITY = 0.8
const MAX_DATA_URL = 2 * 1024 * 1024

const BUILTIN_BASE = {
  light: '#ffffff',
  dark: '#151517',
}

const styles = {
  group: {
    borderBottom: '1px solid var(--dsw-alias-border-l2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '16px 0',
  },
  title: {
    color: 'var(--dsw-alias-label-primary)',
    fontSize: '14px',
    lineHeight: '22px',
  },
  hint: {
    color: 'var(--dsw-alias-label-tertiary)',
    fontSize: '12px',
    lineHeight: '18px',
  },
  error: {
    color: 'var(--dsw-alias-state-error-primary)',
    fontSize: '12px',
    lineHeight: '18px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  typeRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  typeButton: {
    height: '32px',
    padding: '0 14px',
    borderRadius: '8px',
    border: '1px solid var(--dsw-alias-border-l2)',
    background: 'var(--dsw-alias-bg-layer-1)',
    color: 'var(--dsw-alias-label-secondary)',
    cursor: 'pointer',
    fontSize: '13px',
    font: 'inherit',
    boxSizing: 'border-box',
  },
  typeButtonSelected: {
    borderColor: 'var(--dsw-alias-brand-primary)',
    background: 'var(--dsw-alias-interactive-bg-hover)',
    color: 'var(--dsw-alias-label-primary)',
  },
  button: {
    height: '32px',
    padding: '0 14px',
    borderRadius: '8px',
    border: '1px solid var(--dsw-alias-border-l2)',
    background: 'var(--dsw-alias-button-elevated-fill)',
    color: 'var(--dsw-alias-label-primary)',
    cursor: 'pointer',
    fontSize: '13px',
    font: 'inherit',
    boxSizing: 'border-box',
  },
  buttonDanger: {
    color: 'var(--dsw-alias-state-error-primary)',
  },
  colorInput: {
    width: '44px',
    height: '32px',
    padding: '0',
    border: '1px solid var(--dsw-alias-border-l2)',
    borderRadius: '8px',
    background: 'transparent',
    cursor: 'pointer',
  },
  sliderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    minWidth: '240px',
  },
  sliderLabel: {
    color: 'var(--dsw-alias-label-secondary)',
    fontSize: '13px',
    whiteSpace: 'nowrap',
    width: '72px',
  },
  slider: {
    flex: 1,
    accentColor: 'var(--dsw-alias-brand-primary)',
  },
  sliderValue: {
    color: 'var(--dsw-alias-label-secondary)',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    width: '44px',
    textAlign: 'right',
  },
  preview: {
    width: '72px',
    height: '44px',
    objectFit: 'cover',
    borderRadius: '6px',
    border: '1px solid var(--dsw-alias-border-l2)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
}

const zh = {
  'title': '网页背景',
  'none': '无',
  'color': '纯色',
  'image': '图片',
  'colorLabel': '颜色',
  'chooseImage': '选择图片',
  'removeImage': '移除图片',
  'chooseImageFirst': '请先选择一张本地图片。',
  'opacity': '不透明度',
  'reset': '恢复默认',
  'hint': '纯色或图片会显示在主内容区和侧栏后面，消息气泡保持原有背景。',
  'errorTooLarge': '图片太大，无法保存。',
  'errorRead': '无法读取这张图片。',
  'errorSave': '保存失败，可能浏览器存储空间不足或被禁用。',
}

const en = {
  'title': 'Web background',
  'none': 'None',
  'color': 'Solid color',
  'image': 'Image',
  'colorLabel': 'Color',
  'chooseImage': 'Choose image',
  'removeImage': 'Remove image',
  'chooseImageFirst': 'Choose a local image first.',
  'opacity': 'Opacity',
  'reset': 'Reset',
  'hint': 'The color or image appears behind the main canvas and sidebar; message bubbles keep their original background.',
  'errorTooLarge': 'Image is too large to save.',
  'errorRead': 'Could not read that image.',
  'errorSave': 'Could not save; storage may be full or blocked.',
}

function readStorage(key) {
  try {
    const value = window.localStorage.getItem(key)
    return typeof value === 'string' ? value : null
  } catch {
    return null
  }
}

function writeStorage(key, value) {
  try {
    if (value === null) window.localStorage.removeItem(key)
    else window.localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

function clampOpacity(value) {
  if (value === null || value === undefined || value === '') return DEFAULT_OPACITY
  const number = Number(value)
  return Number.isFinite(number) ? Math.min(1, Math.max(0, number)) : DEFAULT_OPACITY
}

function sanitizeColor(value) {
  if (typeof value !== 'string') return DEFAULT_COLOR
  const color = value.trim()
  return /^#[0-9a-f]{6}$/i.test(color) ? color : DEFAULT_COLOR
}

function sanitizeImageUrl(raw) {
  if (typeof raw !== 'string') return null
  const value = raw.trim()
  if (!value || /["'\n\r]/.test(value)) return null
  if (/javascript:/i.test(value) || /^data:text\/html/i.test(value)) return null
  if (/^blob:/i.test(value)) return null
  if (/^data:image\/svg/i.test(value)) return null
  if (/^(https?:|data:image\/)/i.test(value)) return value
  return null
}

function readState() {
  const storedType = readStorage(STORAGE_TYPE)
  const type = TYPES.includes(storedType) ? storedType : 'none'
  const color = sanitizeColor(readStorage(STORAGE_COLOR))
  const image = sanitizeImageUrl(readStorage(STORAGE_IMAGE))
  const opacity = clampOpacity(readStorage(STORAGE_OPACITY))
  if (type === 'image' && image === null) return { type: 'none', color, image: null, opacity }
  return { type, color, image, opacity }
}

function resolveBase(scheme, active) {
  if (active && active.colorScheme === scheme && active.tokens && typeof active.tokens['--dsw-alias-bg-base'] === 'string') {
    return active.tokens['--dsw-alias-bg-base']
  }
  return BUILTIN_BASE[scheme] || BUILTIN_BASE.dark
}

function currentScheme(ctx) {
  try {
    const snapshot = ctx.theme.getTheme()
    if (snapshot && snapshot.active && snapshot.active.colorScheme) return snapshot.active.colorScheme
  } catch {}
  return document.body && document.body.getAttribute('data-ds-dark-theme') === 'true' ? 'dark' : 'light'
}

function ensureBackdrop() {
  let element = document.getElementById('web-background-backdrop')
  if (element) return element
  element = document.createElement('div')
  element.id = 'web-background-backdrop'
  element.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;background-position:center;background-repeat:no-repeat;background-size:cover;'
  document.body.prepend(element)
  return element
}

function teardownBackdrop(overrideDispose) {
  const element = document.getElementById('web-background-backdrop')
  element?.remove()
  if (document.body) document.body.style.backgroundColor = ''
  if (typeof overrideDispose === 'function') {
    try {
      overrideDispose()
    } catch {}
  }
}

let backgroundOverrideDispose = null

function applyBackground(ctx) {
  if (!document.body) return
  const state = readState()
  if (typeof backgroundOverrideDispose === 'function') {
    try {
      backgroundOverrideDispose()
    } catch {}
  }
  backgroundOverrideDispose = null

  if (state.type !== 'none') {
    try {
      backgroundOverrideDispose = ctx.theme.overrideTokens(OVERRIDE_SOURCE, {
        '--dsw-alias-bg-base': { light: 'transparent', dark: 'transparent' },
        '--dsw-specific-sidebar-fill': { light: 'transparent', dark: 'transparent' },
      })
    } catch {}
  }

  if (state.type === 'none') {
    teardownBackdrop(null)
    return
  }

  const element = ensureBackdrop()
  document.body.style.backgroundColor = resolveBase(currentScheme(ctx), (() => {
    try {
      const snapshot = ctx.theme.getTheme()
      return snapshot && snapshot.active ? snapshot.active : null
    } catch {
      return null
    }
  })())

  if (state.type === 'color') {
    element.style.backgroundImage = 'none'
    element.style.backgroundColor = state.color
  } else {
    element.style.backgroundColor = 'transparent'
    element.style.backgroundImage = `url("${state.image}")`
  }
  element.style.opacity = String(state.opacity)
}

function compressImage(image, maxSide, quality) {
  const scale = Math.min(1, maxSide / Math.max(image.width, image.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(image.width * scale))
  canvas.height = Math.max(1, Math.round(image.height * scale))
  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', quality)
}

function readImageAsDataUrl(file, onDone) {
  const reader = new FileReader()
  reader.onerror = () => onDone(null, 'read')
  reader.onload = () => {
    const image = new Image()
    image.onerror = () => onDone(null, 'read')
    image.onload = () => {
      try {
        let dataUrl = compressImage(image, 1600, 0.75)
        if (dataUrl.length > MAX_DATA_URL) dataUrl = compressImage(image, 1000, 0.6)
        if (dataUrl.length > MAX_DATA_URL) dataUrl = compressImage(image, 800, 0.5)
        onDone(dataUrl.length > MAX_DATA_URL ? null : dataUrl, dataUrl.length > MAX_DATA_URL ? 'tooLarge' : null)
      } catch {
        onDone(null, 'read')
      }
    }
    image.src = reader.result
  }
  reader.readAsDataURL(file)
}

function BackgroundRow(props) {
  const [state, setState] = React.useState(() => readState())
  const [error, setError] = React.useState(null)
  const fileRef = React.useRef(null)
  const t = props.t || ((key) => key)
  const stateRef = React.useRef(state)
  stateRef.current = state

  const persist = (next) => {
    if (next.type === 'color') {
      writeStorage(STORAGE_COLOR, next.color)
    }
    if (next.type === 'image' && next.image) {
      writeStorage(STORAGE_IMAGE, next.image)
    }
    writeStorage(STORAGE_TYPE, next.type)
    writeStorage(STORAGE_OPACITY, String(next.opacity))
  }

  const commit = (updater) => {
    const prev = stateRef.current
    const next = typeof updater === 'function' ? updater(prev) : updater
    stateRef.current = next
    setState(next)
    persist(next)
    applyBackground(props.ctx)
  }

  const setType = (type) => {
    commit((prev) => ({ ...prev, type }))
  }

  const setColor = (color) => {
    const nextColor = sanitizeColor(color)
    commit((prev) => ({ ...prev, type: 'color', color: nextColor }))
  }

  const setOpacity = (percent) => {
    commit((prev) => ({ ...prev, opacity: clampOpacity(percent / 100) }))
  }

  const removeImage = () => {
    writeStorage(STORAGE_IMAGE, null)
    commit((prev) => ({ ...prev, type: 'none', image: null }))
  }

  const reset = () => {
    writeStorage(STORAGE_TYPE, null)
    writeStorage(STORAGE_COLOR, null)
    writeStorage(STORAGE_IMAGE, null)
    writeStorage(STORAGE_OPACITY, null)
    commit({ type: 'none', color: DEFAULT_COLOR, image: null, opacity: DEFAULT_OPACITY })
  }

  const onFile = (event) => {
    const file = event.target.files && event.target.files[0]
    if (!file) return
    event.target.value = ''
    readImageAsDataUrl(file, (dataUrl, code) => {
      if (dataUrl === null) {
        setError(code === 'tooLarge' ? 'errorTooLarge' : 'errorRead')
        return
      }
      if (!writeStorage(STORAGE_IMAGE, dataUrl)) {
        setError('errorSave')
        return
      }
      setError(null)
      commit((prev) => ({ ...prev, type: 'image', image: dataUrl }))
    })
  }

  React.useEffect(() => {
    const onStorage = (event) => {
      if (!event.key || !event.key.startsWith('web-background:')) return
      const next = readState()
      stateRef.current = next
      setState(next)
      setError(null)
      applyBackground(props.ctx)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [props.ctx])

  const typeButtons = TYPES.map((type) => React.createElement('button', {
    key: type,
    type: 'button',
    'aria-pressed': state.type === type,
    style: {
      ...styles.typeButton,
      ...(state.type === type ? styles.typeButtonSelected : {}),
    },
    onClick: () => setType(type),
  }, t(type)))

  const preview = state.type === 'image' && state.image
    ? React.createElement('div', {
        style: {
          ...styles.preview,
          backgroundImage: `url("${state.image}")`,
        },
      })
    : null

  return React.createElement('div', { style: styles.group },
    React.createElement('div', { style: styles.title }, t('title')),
    React.createElement('div', { style: styles.typeRow }, typeButtons),
    state.type === 'color' ? React.createElement('div', { style: styles.row },
      React.createElement('span', { style: styles.sliderLabel }, t('colorLabel')),
      React.createElement('input', {
        type: 'color',
        value: state.color,
        style: styles.colorInput,
        onChange: (event) => setColor(event.target.value),
      }),
    ) : null,
    state.type === 'image' ? React.createElement('div', { style: styles.row },
      preview,
      React.createElement('button', {
        type: 'button',
        style: styles.button,
        onClick: () => fileRef.current && fileRef.current.click(),
      }, t('chooseImage')),
      React.createElement('button', {
        type: 'button',
        style: { ...styles.button, ...styles.buttonDanger },
        onClick: removeImage,
      }, t('removeImage')),
      React.createElement('input', {
        ref: fileRef,
        type: 'file',
        accept: 'image/*',
        style: { display: 'none' },
        onChange: onFile,
      }),
    ) : null,
    React.createElement('div', { style: styles.sliderRow },
      React.createElement('span', { style: styles.sliderLabel }, t('opacity')),
      React.createElement('input', {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
        value: Math.round(state.opacity * 100),
        style: styles.slider,
        onChange: (event) => setOpacity(Number(event.target.value)),
      }),
      React.createElement('span', { style: styles.sliderValue }, `${Math.round(state.opacity * 100)}%`),
    ),
    React.createElement('div', { style: styles.row },
      React.createElement('button', {
        type: 'button',
        style: { ...styles.button, ...styles.buttonDanger },
        onClick: reset,
      }, t('reset')),
    ),
    error ? React.createElement('div', { style: styles.error }, t(error)) : null,
    React.createElement('div', { style: styles.hint }, t('hint')),
  )
}

export const inject = ['slots', 'locale', 'theme']

export function apply(ctx) {
  ctx.effect(() => ctx.locale.register(SETTINGS_NS, { zh, en }), 'web-background: locale')

  applyBackground(ctx)

  const observer = new MutationObserver(() => applyBackground(ctx))
  if (document.body) observer.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] })

  const offSettings = ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'web-background',
    order: 40,
    locale: SETTINGS_NS,
    inject: () => ({ ctx }),
  }, BackgroundRow))

  ctx.effect(() => () => {
    if (typeof offSettings === 'function') offSettings()
    observer.disconnect()
    if (typeof backgroundOverrideDispose === 'function') {
      try {
        backgroundOverrideDispose()
      } catch {}
    }
    backgroundOverrideDispose = null
    const element = document.getElementById('web-background-backdrop')
    element?.remove()
    if (document.body) document.body.style.backgroundColor = ''
  }, 'web-background: slots and background')
}
