import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import https from '../apis/https'
export const fetchHome = createAsyncThunk('home', async (_, thunkAPI) => {
  try {
    const response = await https.get('/api/home', {
      signal: thunkAPI.signal
    })
    return await response.data
  } catch (error: any) {
    if (error?.name === 'AxiosError') return thunkAPI.rejectWithValue(error.response.data)
  }
})

const initialState = {
  listHome: []
}
export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHome.fulfilled, (state, action) => {
      state.listHome= action.payload
    })
  }
})

export default homeSlice.reducer
