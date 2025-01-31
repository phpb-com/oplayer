import { EVENTS } from './constants'
import type { Player } from './player'

export type Source = {
  src: string
  poster?: string
  format?: 'auto' | string
}

export type Lang = 'auto' | 'zh' | 'zh-CN' | 'en'

export type PlayerOptions = {
  autoplay?: boolean //https://developer.chrome.com/blog/autoplay/
  muted?: boolean
  loop?: boolean
  volume?: number
  preload?: 'auto' | 'metadata' | 'none'
  playbackRate?: number
  playsinline?: boolean
  source: Source
  videoAttr?: Record<string, boolean | string>
  lang?: Lang
}

export type PlayerPlugin = {
  name: string
  version?: string
  apply?: (player: Player) => void
  load?: (player: Player, src: Source, options: { loader: boolean }) => boolean | Promise<boolean>
}

export type DefaultPlayerEvent = typeof EVENTS[number] | typeof EVENTS[number][]

export type PlayerEventName = DefaultPlayerEvent | string | string[]

export type PlayerEvent<T = any> = {
  type: PlayerEventName
  payload: T
}

export type PlayerListener = (enevt: PlayerEvent) => void
