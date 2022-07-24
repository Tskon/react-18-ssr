import { createSlice } from '@reduxjs/toolkit'

export const placementsSlice = createSlice({
  name: 'device',
  initialState: {
    width: 0,
  },
  reducers: {
    setDeviceWidth: (state, action) => {
      state.width = action.payload
    },
  },
})

export const { setDeviceWidth } = placementsSlice.actions
export default placementsSlice.reducer
