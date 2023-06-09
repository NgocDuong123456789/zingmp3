import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface musicIdProp {
   id: null | string
  // play: boolean
}

const initialState: musicIdProp = {
  id: null,
  // play: false
}

export const counterSlice = createSlice({
  name: 'musicId',
  initialState,
  reducers: {
    musicId: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload
    },

    // playMusic: (state, action: PayloadAction<boolean>) => {
    //   state.play = action.payload
    // }
  }
})

export const { musicId} = counterSlice.actions

export default counterSlice.reducer