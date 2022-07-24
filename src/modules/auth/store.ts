import { createSlice } from '@reduxjs/toolkit'
import { User } from './types'

export const placementsSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as User|null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = placementsSlice.actions
export default placementsSlice.reducer
