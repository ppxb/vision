import { ChangeEvent, useEffect, useState } from 'react'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Select,
  SelectItem,
  SelectedItems
} from '@nextui-org/react'

import useAppStore from '@renderer/store'
import AppFile from '@renderer/components/AppFile'
import AppBottomStatus from '@renderer/components/AppBottomStatus'
import {
  SpaceBackupIcon,
  SpaceResourceIcon
} from '@renderer/components/AppIcon'

const HomeView = () => {
  const { userInfo, spaceInfo } = useAppStore()
  const [space, setSpace] = useState('备份盘')
  const [breadcrumb, setBreadcrumb] = useState<APP.AppBreadcrumbItem[]>([])

  const updateDriveId = useAppStore.use.updateDriveId()

  useEffect(() => {
    updateDriveId(userInfo.default_drive_id)
    setBreadcrumb([
      {
        drive_id: userInfo.backup_drive_id,
        name: '备份盘',
        parent_file_id: 'root'
      }
    ])
  }, [userInfo])

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
      setBreadcrumb([
        {
          drive_id: selectedItem[0].id,
          name: selectedItem[0].name,
          parent_file_id: 'root'
        }
      ])
    }
  }

  const handleBreadcrumbPress = e => {
    const index = breadcrumb.findIndex(b => b.name === e.target.dataset.value)
    setBreadcrumb([...breadcrumb.slice(0, index + 1)])
  }

  // TODO: The logo should be used in all views
  return (
    <div className="h-full flex flex-col gap-4 pt-10 pl-24 pr-8 pb-8">
      <div className="font-logo text-background text-3xl">Vision</div>
      <div className="flex flex-col flex-grow bg-black/10 backdrop-blur-md backdrop-saturate-150 p-8 pb-0 rounded-3xl">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            underline="hover"
            itemClasses={{
              separator: 'px-2 text-white/30',
              item: 'text-white/70 text-2xl font-semibold data-[current=true]:text-white'
            }}
          >
            {breadcrumb.map(b => (
              // BUG: use a hack way to resolve tailwind truncate don't work
              <BreadcrumbItem
                key={b.name}
                onPress={handleBreadcrumbPress}
                data-value={b.name}
              >
                {b.name.length > 16 ? b.name.slice(0, 16) + '...' : b.name}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
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
        <div className="flex flex-grow">
          <AppFile breadcrumb={breadcrumb} setBreadcrumb={setBreadcrumb} />
        </div>
      </div>
      <AppBottomStatus spaceInfo={spaceInfo} />
    </div>
  )
}

export default HomeView
