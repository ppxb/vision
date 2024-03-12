import { Outlet, useNavigate } from 'react-router-dom'
import { Avatar, Button, Tooltip } from '@nextui-org/react'

import {
  AboutIcon,
  HomeIcon,
  MediaIcon,
  // ServerIcon,
  SettingsIcon,
  SourceIcon
} from '@renderer/components/icon'

interface MenuItem {
  content?: string
  action?: () => void
  icon?: JSX.Element
}

const Layout = () => {
  const navigate = useNavigate()

  // TODO:HOMEVIEW SHOULD REPLACE PATH WHEN LOGINVIEW IS DISPLAY
  const menuItems: MenuItem[] = [
    {
      content: 'Home',
      action: () => navigate('/'),
      icon: <HomeIcon className="text-white/80" />
    },
    {
      content: 'Media',
      action: () => navigate('/media'),
      icon: <MediaIcon className="text-white/80" />
    },
    {
      content: 'File Source',
      action: () => navigate('/source'),
      icon: <SourceIcon className="text-white/80" />
    },
    // {
    //   content: 'Server',
    //   action: () => navigate('/server'),
    //   icon: <ServerIcon className="text-white/80" />
    // },
    {
      content: 'About',
      action: () => navigate('/about'),
      icon: <AboutIcon className="text-white/80" />
    },
    {
      content: 'Settings',
      action: () => navigate('/settings'),
      icon: <SettingsIcon className="text-white/80" />
    }
  ]

  return (
    <div className="flex h-screen">
      <div className="flex top-1/2 transform -translate-y-1/2 fixed justify-center items-center px-4">
        <div className="flex flex-col items-center gap-3 p-2 rounded-full bg-black/20 backdrop-blur backdrop-saturate-150">
          <Avatar
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          />
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
              >
                {menu.icon}
              </Button>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
