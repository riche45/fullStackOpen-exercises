import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'render here notification...',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

// Action creators para notificaciones con timeout
export const showNotification = (message, timeout = 5000) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer 