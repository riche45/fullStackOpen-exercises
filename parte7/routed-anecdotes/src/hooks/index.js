import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  // Devolver props separadas para evitar pasar reset al input via spread
  return {
    inputProps: { type, value, onChange },
    reset,
  }
} 