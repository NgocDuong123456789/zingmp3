import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { SliceHome } from './SliceHome'
const store = configureStore({
  reducer:{
    // home:SliceHome,
    
  }
})


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export default store