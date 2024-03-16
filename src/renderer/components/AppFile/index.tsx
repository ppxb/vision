import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { fetchFileList } from '@renderer/utils/file'
import { FolderIcon, PlayIcon } from '@renderer/components/AppIcon'
import { Tooltip } from '@nextui-org/react'

interface Props {
  breadcrumb: APP.AppBreadcrumbItem[]
  setBreadcrumb: React.Dispatch<React.SetStateAction<APP.AppBreadcrumbItem[]>>
}

const AppFile = ({ breadcrumb, setBreadcrumb }: Props) => {
  const [files, setFiles] = useState<API.FileListRes>()

  const handleFileClick = (file: APP.AppFile) => {
    setBreadcrumb([
      ...breadcrumb,
      {
        name: file.name,
        drive_id: file.drive_id,
        parent_file_id: file.file_id
      }
    ])
  }

  useEffect(() => {
    if (breadcrumb.length === 0) return

    const current = breadcrumb.at(-1)
    const requestFileList = async () => {
      try {
        const data = await fetchFileList({
          drive_id: current?.drive_id,
          parent_file_id: current?.parent_file_id,
          fields: '*',
          order_by: 'name',
          order_direction: 'ASC'
        })
        setFiles(data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
    if (current?.drive_id) {
      requestFileList()
    }
  }, [breadcrumb])

  return (
    // TODO: should fix the max height
    <div className="w-full max-h-[590px] flex flex-col overflow-hidden">
      <div className="text-white/70 text-sm font-medium mb-8">
        共 {files?.items.length} 项
      </div>
      <div className="grid grid-cols-6 gap-x-4 gap-y-6 overflow-y-auto">
        {files?.items.map(file => (
          <div
            className="flex flex-col col-span-1 items-center justify-center hover:cursor-pointer"
            key={file.file_id}
            onClick={() => handleFileClick(file)}
          >
            {file.thumbnail ? (
              <div className="relative">
                {/* TODO: fix image rendering placeholder */}
                <img
                  className="scale-[0.7] object-cover h-[100px] rounded-xl"
                  src={file.thumbnail}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-[38px] left-[68px] flex items-center justify-center p-[10px] rounded-full bg-black/70 backdrop-blur-md">
                  <PlayIcon className="text-white" />
                </div>
              </div>
            ) : (
              <FolderIcon />
            )}
            <Tooltip
              content={file.name}
              delay={800}
              closeDelay={0}
              classNames={{
                content: 'text-tiny'
              }}
            >
              <div className="w-32 text-center text-white text-sm font-medium mb-1 truncate">
                {file.name}
              </div>
            </Tooltip>
            <div className="text-white/70 text-tiny">
              {dayjs(file.updated_at).format('YYYY-MM-DD HH:ss:mm')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AppFile
