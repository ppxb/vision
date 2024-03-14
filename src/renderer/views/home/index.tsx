import {
  Avatar,
  Progress,
  Select,
  SelectItem,
  SelectedItems
} from '@nextui-org/react'

import { convertBytesToGigabytes } from '@renderer/utils'
import useAppStore from '@renderer/store'
import { MediaIcon } from '@renderer/components/icon'

const HomeView = () => {
  const { token, userInfo, spaceInfo } = useAppStore()
  console.log(token.access_token)
  console.log(spaceInfo)

  const spaceUsedProgressLabel = () => {
    return `${convertBytesToGigabytes(
      spaceInfo.personal_space_info.used_size
    ).toFixed(2)} GB / ${convertBytesToGigabytes(
      spaceInfo.personal_space_info.total_size
    ).toFixed(
      2
    )} GB (已使用 ${((spaceInfo.personal_space_info.used_size / spaceInfo.personal_space_info.total_size) * 100).toFixed(2)}%)`
  }

  type User = {
    id: number
    name: string
    role: string
    team: string
    status: string
    age: string
    avatar: string
    email: string
  }
  const users = [
    {
      id: 1,
      name: 'Tony Reichert',
      role: 'CEO',
      team: 'Management',
      status: 'active',
      age: '29',
      avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png',
      email: 'tony.reichert@example.com'
    },
    {
      id: 2,
      name: 'Zoey Lang',
      role: 'Tech Lead',
      team: 'Development',
      status: 'paused',
      age: '25',
      avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png',
      email: 'zoey.lang@example.com'
    }
  ]

  // TODO: The progress bar should be split into individual components for easier maintenance
  // TODO: The logo should be used in all views
  return (
    <div className="h-full flex flex-col gap-4 pt-12 pl-28 pr-16 pb-8">
      <div className="font-logo text-background text-3xl">Vision</div>
      <div className="flex flex-col flex-grow bg-black/10 backdrop-blur-md backdrop-saturate-150 p-12 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold text-background/90">备份盘</div>
          <Select
            items={users}
            placeholder="选择一个阿里云盘空间"
            classNames={{
              base: 'max-w-[200px] border-none',
              label: '!text-background/80',
              trigger:
                'h-12 bg-black/10 backdrop-blur-md backdrop-saturate-150 data-[hover=true]:bg-black/20',
              selectorIcon: 'text-background/80',
              popoverContent: 'bg-black/10 backdrop-blur-md'
            }}
            renderValue={(items: SelectedItems<User>) => {
              return items.map(item => (
                <div key={item.key} className="flex items-center gap-2 ">
                  <MediaIcon className="text-background/80 flex-shrink-0" />
                  <div className="text-background/80">{item.data.name}</div>
                </div>
              ))
            }}
          >
            {user => (
              <SelectItem
                key={user.id}
                textValue={user.name}
                classNames={{
                  base: 'data-[hover=true]:bg-black/20'
                }}
              >
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={user.name}
                    className="flex-shrink-0"
                    size="sm"
                    src={user.avatar}
                  />
                  <div className="text-small">{user.name}</div>
                </div>
              </SelectItem>
            )}
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-black/10 backdrop-blur-md backdrop-saturate-150 p-4 rounded-3xl">
        <Progress
          label={spaceUsedProgressLabel()}
          size="sm"
          value={
            (spaceInfo.personal_space_info.used_size /
              spaceInfo.personal_space_info.total_size) *
            100
          }
          className="max-w"
          classNames={{
            label: 'text-background/70',
            track: 'bg-background/10',
            indicator: '!bg-green-500'
          }}
        />
        <div className="flex gap-8">
          <div className="flex gap-2 items-center">
            <div className="bg-green-500 rounded-full w-[6px] h-[6px]"></div>
            <div className="text-sm text-background/70">已使用</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="bg-background/10 rounded-full w-[6px] h-[6px]"></div>
            <div className="text-sm text-background/70">未使用</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeView
