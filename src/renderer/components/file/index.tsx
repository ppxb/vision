import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import useAppStore from '@renderer/store'
import { fetchFileList } from '@renderer/utils/file'
import { FolderIcon, PlayIcon } from '@renderer/components/icon'
import { Tooltip } from '@nextui-org/react'

const Folder = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { driveId } = useAppStore()
  const [files, setFiles] = useState<API.FileListRes>()

  const handleFileClick = (file: APP.AppFile) => {
    navigate(`/home/file/${file.file_id}`)
  }

  useEffect(() => {
    const requestFileList = async () => {
      try {
        const data = await fetchFileList({
          drive_id: driveId,
          parent_file_id:
            location.state?.id || location.pathname.split('/').at(-1)!,
          fields: '*',
          order_by: 'name',
          order_direction: 'ASC'
        })
        setFiles(data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
    requestFileList()
  }, [location])

  return (
    // TODO: should fix the max height
    <div className="w-full max-h-[590px] flex flex-col overflow-hidden">
      <div className="text-background/70 text-sm mb-8">
        共 {files?.items.length} 个文件
      </div>
      <div className="grid grid-cols-6 gap-x-4 gap-y-6 overflow-y-auto">
        {files?.items.map(file => (
          <div
            className="flex flex-col col-span-1 items-center justify-center"
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
            <Tooltip content={file.name} closeDelay={0}>
              <div className="w-32 text-center text-default-100 text-sm mb-1 truncate">
                {file.name}
              </div>
            </Tooltip>
            <div className="text-default-100/70 text-tiny">
              {dayjs(file.updated_at).format('YYYY-MM-DD HH:ss:mm')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Folder
