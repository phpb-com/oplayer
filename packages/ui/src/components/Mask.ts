import type Player from '@oplayer/core'
import { $, isMobile } from '@oplayer/core'
import initListener from '../listeners/init'
import { settingShown } from '../style'
import { hasClass } from '../utils'

const render = (player: Player, el: HTMLElement) => {
  const $dom = $.create(
    `div.${$.css`
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0;`}`
  )

  $dom.addEventListener('click', () => {
    if (!initListener.isInitialized() || hasClass(player.$root, settingShown)) return
    if (isMobile) {
      player.emit('controllervisibilitychange')
    } else {
      player.togglePlay()
    }
  })

  $.render($dom, el)
}

export default render
