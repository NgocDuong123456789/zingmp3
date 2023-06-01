import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import https from '../apis/https'
import { userProp } from '~/types/user.types'
import { GenerateType } from '~/types/Generate.types'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export const fetchRegister = createAsyncThunk(
  'Auth/register',
  async (body: { userName: string; password: string; email: string }, thunkAPI) => {
    try {
      const response = await https.post<GenerateType<userProp>>('/account/register', body, {
        signal: thunkAPI.signal
      })
      return response.data
    } catch (error: any) {
      if (error?.name === 'AxiosError') return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const fetchLogin = createAsyncThunk(
  'Auth/login',
  async (body: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await https.post('/account/login', body, {
        signal: thunkAPI.signal
      })
      return response.data
    } catch (err: any) {
      if (err.name === 'AxiosError') return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

interface AuthProps {
  dataRegister: GenerateType<userProp> | undefined
  isLoading: boolean
  RequestId: undefined | string
  dataLogin: GenerateType<userProp> | undefined
}

const initialState: AuthProps = {
  dataRegister: undefined,
  isLoading: false,
  RequestId: undefined,
  dataLogin: undefined
}

export const SliceAuth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.dataRegister = action.payload
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.dataLogin = action.payload
      })

      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.isLoading = true
          state.RequestId = action.meta.requestId
        }
      )
      .addMatcher<PendingAction | RejectedAction>(
        (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
        (state, action) => {
          if (state.isLoading && state.RequestId === action.meta.requestId) {
            state.isLoading = false
            state.RequestId = undefined
          }
        }
      )
      .addDefaultCase((state) => {
        return state
      })
  }
})

export default SliceAuth.reducer
