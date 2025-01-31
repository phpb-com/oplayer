import { $ } from '@oplayer/core'
import type { Thumbnails } from '../types'

const noop = () => {}

export const thumbnailCls = $.css(`
  position: absolute;
  left: 0;
  bottom: 12px;
  pointer-events: none;
  transform: translateX(-50%);
  background-position-y: center;
  display: none;
  width: 160px;
  height: 90px;`)

export default function (container: HTMLElement, options?: Thumbnails) {
  if (!options) return { update: noop, hide: noop, init: noop }

  const $dom = $.render($.create(`div.${thumbnailCls}`), container)

  let isImgLoaded = false
  const chunk = 100 / options.number
  let minRate = 0,
    maxRate = 0

  setTimeout(() => {
    minRate = 80 / container.clientWidth
    maxRate = (container.clientWidth - 80) / container.clientWidth
  })

  const init = () => {
    if (!isImgLoaded) {
      isImgLoaded = true
      $dom.style.backgroundImage = `url(${options.src})`
    }
  }

  return {
    init,
    update: (rate: number) => {
      $dom.style.left = (rate < minRate ? minRate : rate > maxRate ? maxRate : rate) * 100 + '%'
      const index = ~~((rate * 100) / chunk) * options.number * chunk
      $dom.style.backgroundPositionX = `${-index}%`
    }
  }
}
