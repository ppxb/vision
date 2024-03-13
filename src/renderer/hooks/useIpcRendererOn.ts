import type { IpcRendererEvent } from 'electron'

import { IpcEvents } from '@common/ipcEvents'
import { useEffect } from 'react'

type IpcRendererListener = (event: IpcRendererEvent, ...args: any[]) => void

const useIpcRendererOn = (
  channel: IpcEvents,
  listener: IpcRendererListener
) => {
  useEffect(() => {
    const ipc = window.electron.ipcRenderer
    ipc.on(channel, listener)

    return () => {
      ipc.removeListener(channel, listener)
    }
  }, [channel, listener])
}

export default useIpcRendererOn
