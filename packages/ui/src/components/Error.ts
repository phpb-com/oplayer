import type { Player, PlayerEvent } from '@oplayer/core'
import { $ } from '@oplayer/core'
import { addClass, removeClass } from '../utils'

const showCls = $.css('display: flex !important;')

const errorCls = $.css(`
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  font-size: 1em;
  background: #000;
  z-index: 99;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  -moz-user-select: text;
  -webkit-user-select: text;
  -ms-user-select: text;
  user-select: text;
`)

const VIDEO_ERROR_MAP = {
  1: 'MEDIA_ERR_ABORTED',
  2: 'MEDIA_ERR_NETWORK',
  3: 'MEDIA_ERR_DECODE',
  4: 'MEDIA_ERR_SRC_NOT_SUPPORTED'
}

const render = (player: Player, el: HTMLElement) => {
  const $dom = $.create(`div.${errorCls}`, { 'aria-label': 'Error Overlay' })

  player.on(['error', 'pluginerror'], ({ payload }: PlayerEvent) => {
    let message: string = payload.message

    if (payload instanceof Event) {
      //@ts-ignore
      const error = payload.target?.error as {
        message: string
        code: keyof typeof VIDEO_ERROR_MAP
      } | null

      // err==null || err= {message:'',code:undefined}
      if (!error || (!error.message && typeof error.code != 'number')) {
        return
      }

      message = error.message || VIDEO_ERROR_MAP[error.code]
    } else {
      // object { message:'...' }
      message = payload.message
    }

    $dom.innerText = message || 'UNKNOWN_ERROR'
    addClass($dom, showCls)
  })

  player.on('videosourcechange', () => {
    removeClass($dom, showCls)
    $dom.innerText = ''
  })

  $.render($dom, el)
}

export default render
