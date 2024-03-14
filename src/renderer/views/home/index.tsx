import { ChangeEvent, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Progress, Select, SelectItem, SelectedItems } from '@nextui-org/react'

import { convertBytesToGigabytes } from '@renderer/utils'
import useAppStore from '@renderer/store'
import { SpaceBackupIcon, SpaceResourceIcon } from '@renderer/components/icon'

const HomeView = () => {
  const navigate = useNavigate()
  const { token, userInfo, spaceInfo, driveId } = useAppStore()
  const [space, setSpace] = useState('备份盘')
  const updateDriveId = useAppStore.use.updateDriveId()
  // console.log(userInfo)
  // console.log(token)

  useEffect(() => {
    updateDriveId(userInfo.default_drive_id)
    navigate(`/home/file/${driveId}`, {
      state: { id: 'root' }
    })
  }, [])

  const spaceUsedProgressLabel = () => {
    return `${convertBytesToGigabytes(
      spaceInfo.personal_space_info.used_size
    ).toFixed(2)} GB / ${convertBytesToGigabytes(
      spaceInfo.personal_space_info.total_size
    ).toFixed(
      2
    )} GB (已使用 ${((spaceInfo.personal_space_info.used_size / spaceInfo.personal_space_info.total_size) * 100).toFixed(2)}%)`
  }

  const items: APP.AppSpaceItem[] = [
    {
      id: userInfo.backup_drive_id,
      name: '备份盘',
      icon: <SpaceBackupIcon />
    },
    {
      id: userInfo.resource_drive_id,
      name: '资源盘',
      icon: <SpaceResourceIcon />
    }
  ]

  const handleSpaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setSpace(e.target.value)
      const selectedItem = items.filter(item => item.name === e.target.value)
      updateDriveId(selectedItem[0].id)
    }
  }

  // TODO: The progress bar should be split into individual components for easier maintenance
  // TODO: The logo should be used in all views
  return (
    <div className="h-full flex flex-col gap-4 pt-12 pl-28 pr-16 pb-8">
      <div className="font-logo text-background text-3xl">Vision</div>
      <div className="flex flex-col flex-grow bg-black/10 backdrop-blur-md backdrop-saturate-150 p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold text-background/90">备份盘</div>
          <Select
            items={items}
            placeholder="选择一个阿里云盘空间"
            aria-label="阿里云盘空间"
            selectedKeys={[space]}
            onChange={handleSpaceChange}
            classNames={{
              base: 'max-w-[160px] border-none',
              trigger: 'h-12 bg-black/10 data-[hover=true]:bg-black/20',
              selectorIcon: 'text-background/70',
              popoverContent: 'bg-black/10'
            }}
            renderValue={(items: SelectedItems<APP.AppSpaceItem>) => {
              return items.map(item => (
                <div
                  key={item.data?.name}
                  className="flex text-background/70 items-center gap-2 "
                >
                  <div className="flex-shrink-0">{item.data?.icon}</div>
                  {item.data?.name}
                </div>
              ))
            }}
          >
            {space => (
              <SelectItem
                key={space.name}
                textValue={space.name}
                classNames={{
                  base: 'text-background/70'
                }}
              >
                <div className="flex gap-2 items-center">
                  {space.icon}
                  <div className="text-small">{space.name}</div>
                </div>
              </SelectItem>
            )}
          </Select>
        </div>
        <div className="flex flex-grow pt-4">
          <Outlet />
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-2 bg-black/10 backdrop-blur-md backdrop-saturate-150 p-4 rounded-3xl">
          <Progress
            label={spaceUsedProgressLabel()}
            size="sm"
            value={
              (spaceInfo.personal_space_info.used_size /
                spaceInfo.personal_space_info.total_size) *
              100
            }
            className="w-[320px]"
            classNames={{
              label: 'text-background/70',
              indicator: '!bg-green-500'
            }}
          />
          <div className="flex gap-8">
            <div className="flex gap-2 items-center">
              <div className="bg-green-500 rounded-full w-[6px] h-[6px]"></div>
              <div className="text-sm text-background/70">已使用</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="bg-default-300/50 rounded-full w-[6px] h-[6px]"></div>
              <div className="text-sm text-background/70">未使用</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeView
