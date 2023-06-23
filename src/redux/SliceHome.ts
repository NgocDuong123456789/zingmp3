import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import https from '../apis/https'
import { playList } from '~/types/playList.types'
import { songProp } from '~/types/song.types'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>
interface song {
  err: number
  msg?: string
  timestamp?: string
  data: {
    128: string
    320: string
  }
}
interface SearchArtistsType {
  id: string
  link: string
  name: string
  playlistId: string
  thumbnail: string
  totalFollow: number
  alias: string
}
interface PlayListSearchSongType {
  artistsNames: string
  encodeId: string
  link: string
  sortDescription: string
  thumbnail: string
  title: string
}

interface SearchVideosType {
  encodeId: string
  link: string
  thumbnail: string
  title: string
  artistsNames: string
  thumbnailM: string
}

interface detailplaylist {
  err: number
  data: playList
}
interface bannerProps {
  type: number
  link: string
  banner: string
  cover: string
  target: string
  title: string
  description: string
  ispr: number
  encodeId: string
}
export interface MusicProps {
  items: songProp[]
  title: string
}
export interface art {
  artistsNames: string
  encodeId: string
  link: string
  id?: string
  sortDescription: string
  thumbnail: string
  thumbnailM: string
  title: string
  duration?: number
  name?: string
  alias?: string
  totalFollow?: number
  album?: {
    title: string
  }
}
export interface artistsItemType {
  title: string
  items: art[]
  sectionId: string
}

interface artistsType {
  name: string
  awards: string[]
  follow: number
  national: string
  realname: string
  thumbnail: string
  thumbnailM: string
  totalFollow: number
  sections: artistsItemType[]
}
interface initialState {
  banner: bannerProps[]
  song: song
  play: boolean
  alBum: boolean
  detailplaylist: detailplaylist
  friday: MusicProps
  newEveryMusic: MusicProps
  top100: MusicProps
  alBumHot: MusicProps
  newRelease: {
    title: string
    items: {
      all: art[]
      others: art[]
      vPop: art[]
    }
  }
  searchAll: {
    artists: SearchArtistsType[]
    playlists: PlayListSearchSongType[]
    songs: songProp[]
    videos: SearchVideosType[]
  }
  artists: artistsType
 isLoadingHome: boolean
  isLoadingSearch: boolean
  isLoadingSong: boolean
  isLoadingArtists:boolean;
  isLoadingDetailplaylist:boolean
}

const initialState: initialState = {
  banner: [],
  friday: {
    title: '',
    items: []
  },
  detailplaylist: {
    err: 0,
    data: {
      like: 0,
      contentLastUpdate: 0,
      thumbnail: '',
      genreIds: [],
      description: '',
      aliasTitle: '',
      song: {
        items: [],
        total: 0,
        totalDuration: 0
      }
    }
  },
  top100: {
    title: '',
    items: []
  },
  song: {
    err: 0,
    data: {
      128: '',
      320: ''
    }
  },
  play: false,
  alBum: false,
  newEveryMusic: {
    title: '',
    items: []
  },
  alBumHot: {
    title: '',
    items: []
  },
  newRelease: {
    title: '',
    items: {
      all: [],
      others: [],
      vPop: []
    }
  },
  searchAll: {
    artists: [],
    playlists: [],
    songs: [],
    videos: []
  },
  artists: {
    name: '',
    awards: [],
    follow: 0,
    national: '',
    realname: '',
    thumbnail: '',
    thumbnailM: '',
    totalFollow: 0,
    sections: []
  },

  isLoadingHome: false,
  isLoadingSearch: false,
  isLoadingSong: false,
  isLoadingArtists:false,
  isLoadingDetailplaylist:false
}

export const fetchHome = createAsyncThunk('home', async (_, thunkAPI) => {
  try {
    const response = await https.get('/api/home', {
      signal: thunkAPI.signal
    })
    return response?.data
  } catch (error: any) {
    if (error?.name === 'AxiosError') return thunkAPI.rejectWithValue(error.response?.data)
  }
})

export const fetchInfoSong = createAsyncThunk('songInfo', async (id: { id: string }, thunkAPI) => {
  try {
    const response = await https.get('/api/infosong', {
      params: id,
      signal: thunkAPI.signal
    })
    return response?.data
  } catch (error: any) {
    if (error?.name === 'AxiosError') return thunkAPI.rejectWithValue(error.response?.data)
  }
})

export const detailplaylist = createAsyncThunk('detailplaylist', async (id: { id: string }, thunkAPI) => {
  try {
    const response = await https.get('/api/detailplaylist', {
      params: id,
      signal: thunkAPI.signal
    })
    return response?.data
  } catch (error: any) {
    if (error?.name === 'AxiosError') return thunkAPI.rejectWithValue(error.response?.data)
  }
})

export const fetchSong = createAsyncThunk('song', async (id: { id: string }, thunkAPI) => {
  try {
    const response = await https.get<song>('/api/song', {
      params: id,
      signal: thunkAPI.signal
    })

    return response?.data
  } catch (error: any) {
    if (error?.name === 'AxiosError') return thunkAPI.rejectWithValue(error.response?.data)
  }
})
export const searchSong = createAsyncThunk('search song', async (keyword: { keyword: string }, thunkAPI) => {
  try {
    const response = await https.get('/api/search', {
      params: keyword,
      signal: thunkAPI.signal
    })

    return response?.data
  } catch (error: any) {
    if (error?.name === 'AxiosError') return thunkAPI.rejectWithValue(error.response?.data)
  }
})
export const artists = createAsyncThunk('artists', async (name: { name: string }, thunkAPI) => {
  try {
    const response = await https.get('/api/artist', {
      params: name,
      signal: thunkAPI.signal
    })

    return response?.data
  } catch (error: any) {
    if (error?.name === 'AxiosError') return thunkAPI.rejectWithValue(error.response?.data)
  }
})

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    playMusic: (state, action: PayloadAction<boolean>) => {
      state.play = action.payload
    },
    playAlbum:
      (fetchSong.fulfilled,
      (state, action: PayloadAction<boolean>) => {
        state.alBum = action.payload
      })
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchHome.pending, (state) => {
        state.isLoadingHome = true
      })
      .addCase(fetchHome.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.banner = action?.payload?.data?.items?.find((item: any) => item?.sectionId === 'hSlider')?.items
           state.friday = action?.payload?.data?.items?.find((item: any) => item?.sectionId === 'hArtistTheme')
           state.newEveryMusic = action?.payload?.data?.items?.find((item: any) => item?.sectionId === 'hEditorTheme2')
           state.top100 = action?.payload?.data?.items?.find((item: any) => item?.sectionId === 'h100')
           state.alBumHot = action?.payload?.data?.items?.find((item: any) => item?.sectionId === 'hAlbum')
           state.newRelease = action?.payload?.data?.items?.find((item: any) => item?.sectionType === 'new-release')
        }
        state.isLoadingHome = false
      })
      .addCase(fetchHome.rejected, (state) => {
        state.isLoadingHome = false
      })

      .addCase(detailplaylist.pending, (state) => {
        state.isLoadingDetailplaylist=true
      })
      .addCase(detailplaylist.fulfilled, (state, action) => {
        state.detailplaylist = action.payload
        state.isLoadingDetailplaylist=false
      })
      .addCase(detailplaylist.rejected, (state) => {
        state.isLoadingDetailplaylist=false
      })
      .addCase(fetchSong.pending, (state) => {
        state.isLoadingSong = true
      })
      .addCase(fetchSong.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.song = action?.payload
          state.isLoadingSong = false
        }
      })
      .addCase(fetchSong.rejected, (state) => {
        state.isLoadingSong = false
      })
      .addCase(searchSong.pending, (state, action) => {
        state.isLoadingSearch = true
      })
      .addCase(searchSong.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.searchAll = action.payload.data
          state.isLoadingSearch = false
        }
      })
      .addCase(searchSong.rejected, (state) => {
        state.isLoadingSearch = false
      })
      .addCase(artists.pending, (state) => {
        state.isLoadingArtists = true
      })
      .addCase(artists.fulfilled, (state, action) => {
        state.artists = action.payload.data
        state.isLoadingArtists = false
      })
      .addCase(artists.rejected, (state) => {
        state.isLoadingArtists =false
      })




    // .addMatcher<FulfilledAction>(
    //   (action) => action.type.endsWith('/pending'),
    //   (state, action) => {
    //     state.isLoading = true
    //     state.RequestId = action.meta.requestId
    //   }
    // )

    // .addMatcher<PendingAction | RejectedAction>(
    //   (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
    //   (state, action) => {
    //     if (state.isLoading && state.RequestId === action.meta.requestId) {
    //       state.isLoading = false
    //       state.RequestId = undefined
    //     }
    //   }
    // )
    .addDefaultCase((state) => {
      return state
    })
  }
})

export const { playMusic, playAlbum } = homeSlice.actions
export default homeSlice.reducer
