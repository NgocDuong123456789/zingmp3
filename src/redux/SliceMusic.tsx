import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface musicIdProp {
  id: null | string
}

const initialState: musicIdProp = {
  id: null
}

const counterSlice = createSlice({
  name: 'musicId',
  initialState,
  reducers: {
    musicId: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload
    }
  }
})

export const { musicId } = counterSlice.actions

export default counterSlice.reducer
