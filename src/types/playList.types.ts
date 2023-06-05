import { songProp } from './song.types'

export interface playList {
  err: number
  description: string
  thumbnail: string
  aliasTitle:string
  thumbnailM: string
  contentLastUpdate: number
  genreIds:string[]
  like: number
  song: {
    items:songProp[],
    total:number,
    totalDuration:number
  }
}
