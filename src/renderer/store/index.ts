import { create } from 'zustand'

import { IpcEvents } from '@common/ipcEvents'
import createSelectors from './selector'

const { ipcRenderer } = window.electron

interface State {
  token: APP.AppToken
  showNavbar: boolean
  userInfo: APP.AppUserInfo
  spaceInfo: APP.AppSpaceInfo
  driveId: string
  breadcrumb: APP.AppBreadcrumbItem[]
}

interface Actions {
  updateToken: (token: APP.AppToken) => void
  updateUserInfo: (info: APP.AppUserInfo) => void
  updateShowNavbar: (show: boolean) => void
  updateSpaceInfo: (info: APP.AppSpaceInfo) => void
  updateDriveId: (id: string) => void
  updateBreadcrumb: (breadcrumb: APP.AppBreadcrumbItem[]) => void
}

const initialState: State = {
  // token: (await ipcRenderer.invoke(IpcEvents.GET_TOKEN)) || {
  //   token_type: '',
  //   access_token: '',
  //   refresh_token: '',
  //   expires_in: 0
  // }
  token: {
    token_type: '',
    access_token: '',
    refresh_token: '',
    expires_in: 0
  },
  userInfo: {
    user_id: '',
    name: '',
    avatar: '',
    default_drive_id: '',
    resource_drive_id: '',
    backup_drive_id: ''
  },
  spaceInfo: {
    personal_space_info: {
      used_size: 0,
      total_size: 0
    }
  },
  showNavbar: false,
  driveId: '',
  breadcrumb: []
}

export const appStore = create<State & Actions>()(set => ({
  ...initialState,
  updateToken: (token: APP.AppToken) => {
    set({ token })
    ipcRenderer.send(IpcEvents.SET_TOKEN, token)
  },
  updateUserInfo: (info: APP.AppUserInfo) => set({ userInfo: info }),
  updateShowNavbar: (show: boolean) => set({ showNavbar: show }),
  updateSpaceInfo: (info: APP.AppSpaceInfo) => set({ spaceInfo: info }),
  updateDriveId: (id: string) => set({ driveId: id }),
  updateBreadcrumb: (breadcrumb: APP.AppBreadcrumbItem[]) => set({ breadcrumb })
}))

export default createSelectors(appStore)
