import { Progress } from '@nextui-org/react'

import { convertSpaceBytes } from '@renderer/utils'

interface Props {
  spaceInfo: APP.AppSpaceInfo
}

const BottomStatus = ({ spaceInfo }: Props) => {
  const spaceUsedProgressLabel = () => {
    const { used_size, total_size } = spaceInfo.personal_space_info
    const usedRatio = (used_size / total_size) * 100
    return `${convertSpaceBytes(used_size)} / ${convertSpaceBytes(total_size)} (已使用 ${usedRatio.toFixed(2)}%)`
  }

  return (
    <div className="flex">
      <div className="flex flex-col gap-2 p-4 rounded-3xl bg-black/10 backdrop-blur-md backdrop-saturate-150">
        <div className="text-white/70 text-tiny font-medium">
          {spaceUsedProgressLabel()}
        </div>
        <Progress
          size="sm"
          value={
            (spaceInfo.personal_space_info.used_size /
              spaceInfo.personal_space_info.total_size) *
            100
          }
          className="w-[220px]"
          classNames={{ indicator: '!bg-green-500' }}
        />
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <div className="bg-green-500 rounded-full w-[6px] h-[6px]"></div>
            <div className="text-tiny text-white/70 font-medium">已使用</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="bg-default-300/50 rounded-full w-[6px] h-[6px]"></div>
            <div className="text-tiny text-white/70 font-medium">未使用</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomStatus
