import { $ } from '@oplayer/core'
import { icon } from '../style'
import playSvg from '../icons/play.svg'
import type Player from '@oplayer/core'

const styles = $.css({
  fill: 'currentcolor',
  position: 'absolute',
  right: '40px',
  bottom: '45px',
  display: 'none',

  [`& > .${icon}`]: {
    width: '3em',

    '& > svg': {
      fill: '#fff',
      filter: 'drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.3))'
    }
  },

  '@media only screen and (max-width: 991px)': {
    '&': {
      position: 'absolute',
      right: 'unset',
      bottom: 'unset',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },

    [`& > .${icon}`]: {
      width: '2.5em'
    }
  }
})

const render = (player: Player, el: HTMLElement) => {
  const $dom = $.create(
    `div.${styles}`,
    { 'aria-label': 'Play' },
    `<button aria-label="Play" class="${icon} play" type="button">
        ${playSvg}
      </button>`
  )

  $dom.querySelector('button')?.addEventListener('click', () => {
    player.togglePlay()
  })

  player.on(['canplaythrough', 'play', 'pause', 'seeking', 'videosourcechange'], () => {
    if (player.isPlaying || (player.isLoading && !player.isPlaying)) {
      $dom.style.display = 'none'
    } else {
      $dom.style.display = 'block'
    }
  })

  $.render($dom, el)
}

export default render
