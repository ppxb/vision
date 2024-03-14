import { Route, Routes, useNavigate } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'

import Layout from '@renderer/components/layout'
import HomeView from '@renderer/views/home'
import MediaView from '@renderer/views/media'
import LoginView from '@renderer/views/login'
import File from '@renderer/components/file'

const App = () => {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginView />} />
          <Route path="home" element={<HomeView />}>
            <Route path="file/:fileId" element={<File />} />
          </Route>
          <Route path="media" element={<MediaView />} />
          <Route path="*" element={<HomeView />} />
        </Route>
      </Routes>
    </NextUIProvider>
  )
}

export default App
