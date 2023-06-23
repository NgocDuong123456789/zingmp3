import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface musicIdProp {
  searchHistory: string[]
}
const initialState: musicIdProp = {
  searchHistory: []
}

export const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    searchHistory: (state, action: PayloadAction<string>) => {
      if(state.searchHistory.includes(action.payload)){
        return 
      }
      state.searchHistory.push(action.payload)
    }
  }
})

export const { searchHistory } = searchHistorySlice.actions
export default searchHistorySlice.reducer
