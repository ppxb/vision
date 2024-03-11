import { Route, Routes, useNavigate } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'

import Layout from '@renderer/components/layout'
import HomeView from './views/home'
import MediaView from './views/media'
import LoginView from './views/login'

const App = () => {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginView />} />
          <Route path="home" element={<HomeView />} />
          <Route path="media" element={<MediaView />} />
          <Route path="*" element={<HomeView />} />
        </Route>
      </Routes>
    </NextUIProvider>
  )
}

export default App
