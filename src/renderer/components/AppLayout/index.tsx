import { Outlet, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Avatar, Button, Tooltip } from '@nextui-org/react'
import { motion } from 'framer-motion'

import useAppStore from '@renderer/store'
import Zenitho from '@renderer/components/Zenitho'

import {
  AboutIcon,
  HomeIcon,
  MediaIcon,
  // ServerIcon,
  SettingsIcon,
  MusicIcon
} from '@renderer/components/AppIcon'

interface MenuItem {
  content?: string
  action?: () => void
  icon?: JSX.Element
  path: string
}

const AppLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo, showNavbar } = useAppStore()

  const menuItems: MenuItem[] = [
    {
      content: '主页',
      path: '/',
      action: () => navigate('/'),
      icon: <HomeIcon className="text-white/70" />
    },
    {
      content: '媒体',
      path: '/media',
      action: () => navigate('/media'),
      icon: <MediaIcon className="text-white/70" />
    },
    {
      content: '音乐',
      path: '/music',
      action: () => navigate('/source'),
      icon: <MusicIcon className="text-white/70" />
    },
    // {
    //   content: 'Server',
    //   action: () => navigate('/server'),
    //   icon: <ServerIcon className="text-white/70" />
    // },
    {
      content: '关于',
      path: '/about',
      action: () => navigate('/about'),
      icon: <AboutIcon className="text-white/70" />
    },
    {
      content: '设置',
      path: '/settings',
      action: () => navigate('/settings'),
      icon: <SettingsIcon className="text-white/70" />
    }
  ]

  return (
    <div className="flex h-screen">
      <Zenitho>
        <div className="flex top-1/2 -translate-y-1/2 fixed justify-center items-center px-4 z-50">
          <motion.div
            animate={
              showNavbar
                ? { opacity: 1, visibility: 'visible', x: 0 }
                : { opacity: 0, x: '-100%' }
            }
            transition={{
              duration: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}
            className="invisible flex flex-col items-center gap-3 p-2 rounded-full bg-black/10 backdrop-blur-md backdrop-saturate-150"
          >
            <Avatar className="w-10 h-10" src={userInfo.avatar} />
            {menuItems.map(menu => (
              <Tooltip
                content={menu.content}
                placement="right"
                key={menu.content}
              >
                <Button
                  isIconOnly
                  variant="light"
                  radius="full"
                  onPress={menu.action}
                  className={
                    location.pathname === menu.path ? 'bg-default/40' : ''
                  }
                >
                  {menu.icon}
                </Button>
              </Tooltip>
            ))}
          </motion.div>
        </div>
        <div className="absolute w-screen h-screen overflow-auto">
          <Outlet />
        </div>
      </Zenitho>
    </div>
  )
}

export default AppLayout
