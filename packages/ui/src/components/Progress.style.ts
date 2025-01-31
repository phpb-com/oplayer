import { $, isMobile } from '@oplayer/core'
import { highlightCls } from './highlight'
import { thumbnailCls } from './thumbnail'

export const buffered = $.css({
  'background-color': 'hsla(0, 0%, 100%, 0.4)'
})

export const played = $.css({
  'background-color': 'var(--primary-color)'
})

export const dot = $.css({
  width: '100%',
  'pointer-events': 'none',
  '&::before': {
    'margin-left': '-0.35em',
    transition: 'transform 0.3s ease',
    transform: 'scale(0)',
    content: "''",
    display: 'block',
    position: 'absolute',
    left: '0',
    top: '0',
    bottom: '0',
    height: '0.7em',
    width: '0.7em',
    'background-color': '#fff',
    'margin-top': '-4.5px',
    'z-index': '1',
    'border-radius': '50%',
    'will-change': 'left'
  }
})

export const hit = $.css({
  position: 'absolute',
  left: '0',
  'border-radius': '4px',
  padding: '5px 8px',
  'background-color': 'var(--shadow-background-color)',
  color: '#fff',
  'font-size': '12px',
  'word-wrap': 'nowrap',
  'word-break': 'nowrap',
  'z-index': '2',
  'pointer-events': 'none',
  transform: 'translateX(-50%)',
  display: 'none',
  'white-space': 'pre',
  bottom: '10px'
})

export const progressDragging = $.css('/* progressDragging */')

export const progress = $.css({
  position: 'relative',
  'box-sizing': 'border-box',
  padding: '5px 0',
  cursor: 'pointer',
  width: '100%',

  [`&.${progressDragging} .${dot}::before ${!isMobile ? `,&:hover .${dot}::before` : ''}`]: {
    transform: 'scale(1)'
  },

  [`&.${progressDragging} .${hit}, &.${progressDragging} .${thumbnailCls}`]: {
    display: 'block'
  },

  [`&:hover .${highlightCls}`]: {
    transform: 'translate(-4px, -2px)',
    height: '6px',
    width: '8px'
  }
})

export const progressInner = $.css({
  position: 'relative',
  height: '3px',
  width: '100%',
  'background-color': 'hsla(0, 0%, 100%, 0.2)',
  'border-radius': '4px',

  [`& .${buffered},& .${played}`]: {
    position: 'absolute',
    left: '0',
    top: '0',
    bottom: '0',
    'will-change': 'width',
    'pointer-events': 'none',
    'border-radius': '4px'
  }
})
