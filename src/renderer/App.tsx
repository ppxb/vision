import { useNavigate } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'

import Router from '@renderer/router'

const App = () => {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <Router />
    </NextUIProvider>
  )
}

export default App
