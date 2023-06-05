import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import https from '../apis/https'
import { playList } from '~/types/playList.types'
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
    const response = await https.get('/api/song', {
      params: id,
      signal: thunkAPI.signal
    })

    return response?.data
  } catch (error: any) {
    if (error?.name === 'AxiosError') return thunkAPI.rejectWithValue(error.response?.data)
  }
})

const initialState = {
  listHome: [],
  playList: [],
  song: [],
  play:false,
  alBum:false
}

// const initialState: musicIdProp = {
 
//   play: false
// }
export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    playMusic: (state, action: PayloadAction<boolean>) => {
      state.play = action.payload
    },
    playAlbum:(fetchSong.fulfilled, (state, action:PayloadAction<boolean>) => {
      state.alBum = action.payload
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHome.fulfilled, (state, action) => {
        state.listHome = action.payload
      })
      .addCase(detailplaylist.fulfilled, (state, action) => {
        state.playList = action.payload
      })
      .addCase(fetchSong.fulfilled, (state, action) => {
        state.song = action.payload
      })
      
  }
})
export const {  playMusic,  playAlbum} = homeSlice.actions
export default homeSlice.reducer
