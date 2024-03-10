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

  const menuItems: MenuItem[] = [
    {
      content: '主页',
      action: () => navigate('/'),
      icon: <HomeIcon className="text-white/80" />
    },
    {
      content: '媒体库',
      action: () => navigate('/media'),
      icon: <MediaIcon className="text-white/80" />
    },
    {
      content: '文件源',
      action: () => navigate('/source'),
      icon: <SourceIcon className="text-white/80" />
    },
    // {
    //   content: '影视服务器',
    //   action: () => navigate('/server'),
    //   icon: <ServerIcon className="text-white/80" />
    // },
    {
      content: '关于',
      action: () => navigate('/about'),
      icon: <AboutIcon className="text-white/80" />
    },
    {
      content: '设置',
      action: () => navigate('/settings'),
      icon: <SettingsIcon className="text-white/80" />
    }
  ]

  return (
    <div className="flex h-screen bg-background">
      <div className="flex justify-center items-center px-4">
        <div className="flex flex-col items-center gap-3 p-2 rounded-full bg-black/50 backdrop-blur backdrop-saturate-150">
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
