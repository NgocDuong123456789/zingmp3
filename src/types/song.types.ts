import { bool } from 'yup'

export interface songProp {
  alias: string
  allowAudioAds: boolean
  artistsNames: string
  distributor: string
  duration: number
  encodeId: string
  hasLyric: boolean
  indicators: []
  album: {
    title: string
  }

  isIndie: boolean
  isOffical: boolean
  isPrivate: boolean
  isWorldWide: boolean
  link: string
  preRelease: boolean
  radioId: number
  releaseDate: number
  streamingStatus: number
  thumbnail: string
  thumbnailM: string
  title: string
  username: string
  zingChoice: boolean
}
