import { useEffect, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import dayjs from 'dayjs'

import { fetchFileList } from '@renderer/utils/file'
import { FolderIcon } from '@renderer/components/AppIcon'
import ImageLoader from '@renderer/components/ImageLoader'

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
    <div className="w-full max-h-[640px] flex flex-col overflow-hidden">
      <div className="text-white/70 text-sm font-medium mt-4 mb-8">
        共 {files?.items.length} 项
      </div>
      <div className="grid grid-cols-6 gap-x-4 gap-y-6 overflow-y-auto">
        {files?.items.map(file => (
          <div
            className="flex flex-col col-span-1 items-center justify-center hover:cursor-pointer"
            key={file.file_id}
            onClick={() => handleFileClick(file)}
          >
            {/* TODO: should show different file extension icon here */}
            {file.thumbnail ? (
              <ImageLoader src={file.thumbnail} />
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
