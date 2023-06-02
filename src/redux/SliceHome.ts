import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

export const fetchSong = createAsyncThunk('songInfo', async (id: { id: string }, thunkAPI) => {
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

const initialState = {
  listHome: [], 
  playList:[]
}
export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchHome.fulfilled, (state, action) => {
      state.listHome = action.payload
    })
    .addCase( detailplaylist.fulfilled, (state, action) => {
      state.playList= action.payload
    })
  }
})

export default homeSlice.reducer
