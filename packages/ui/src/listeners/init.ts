import type Player from '@oplayer/core'
import { isMobile } from '@oplayer/core'

const initListener = (() => {
  let isInitialized = false
  let before = <Function[]>[]
  let after = <Function[]>[]

  const initStart = () => {
    isInitialized = false
    before.forEach((f) => f())
  }

  const initEnd = () => {
    if (isInitialized) return
    isInitialized = true
    after.forEach((f) => f())
  }

  return {
    isInitialized: () => isInitialized,
    startListening: function listener(player: Player) {
      initStart()
      // https://www.cnblogs.com/taoze/p/5783928.html
      if (isMobile) {
        player.on('durationchange', function durationchange() {
          if (player.duration !== Infinity && player.duration > 0) {
            initEnd()
          }
        })
      } else {
        player.on('canplaythrough', initEnd)
      }

      player.on('videosourcechange', initStart)
    },
    add: (be: Function, af: Function) => {
      before.push(be)
      after.push(af)
    }
  }
})()

export default initListener
