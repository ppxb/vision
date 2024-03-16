import { PropsWithChildren, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useAppStore from '@renderer/store'
import { isRefreshTokenExpired } from '@renderer/utils'
import { fetchDriveInfo, fetchSpaceInfo } from '@renderer/utils/user'

const AppPrivateRoutes = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const location = useLocation()

  const { token, userInfo } = useAppStore()
  const updateUserInfo = useAppStore.use.updateUserInfo()
  const updateSpaceInfo = useAppStore.use.updateSpaceInfo()
  const updateShowNavbar = useAppStore.use.updateShowNavbar()

  const initApp = async () => {
    try {
      const user = await fetchDriveInfo()
      const space = await fetchSpaceInfo()
      updateUserInfo(user)
      updateSpaceInfo(space)
      updateShowNavbar(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  useEffect(() => {
    try {
      const { access_token, refresh_token_created_at } = token
      if (
        access_token === '' ||
        isRefreshTokenExpired(refresh_token_created_at)
      ) {
        navigate('/login')
      } else {
        if (userInfo.default_drive_id === '' && location.pathname === '/') {
          initApp()
          navigate(location.pathname)
        }
      }
    } catch (error) {
      navigate('/login')
    }
  }, [location.pathname])

  return <div>{children}</div>
}

export default AppPrivateRoutes
