import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import SliceAuth from './SliceAuth'
const store = configureStore({
  reducer:{
    auth: SliceAuth,
  }
})


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export default store