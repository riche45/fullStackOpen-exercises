import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { type: action.payload.type, message: action.payload.message }
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, null)
  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => useContext(NotificationContext)[0]
export const useNotificationDispatch = () => useContext(NotificationContext)[1]

let timeoutId
export const notify = (dispatch, message, type = 'success', ms = 5000) => {
  dispatch({ type: 'SET', payload: { type, message } })
  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = setTimeout(() => dispatch({ type: 'CLEAR' }), ms)
} 