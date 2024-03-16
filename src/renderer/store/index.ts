import { create } from 'zustand'

import createSelectors from './selector'
import { IpcEvents } from '@common/ipcEvents'

const { ipcRenderer } = window.electron

interface State {
  token: APP.AppToken
  showNavbar: boolean
  userInfo: APP.AppUserInfo
  spaceInfo: APP.AppSpaceInfo
  driveId: string
  breadcrumb: APP.AppBreadcrumbItem[]
}

interface Action {
  updateToken: (token: APP.AppToken) => void
  updateUserInfo: (user: APP.AppUserInfo) => void
  updateShowNavbar: (show: boolean) => void
  updateSpaceInfo: (info: APP.AppSpaceInfo) => void
  updateDriveId: (id: string) => void
  updateBreadcrumb: (breadcrumb: APP.AppBreadcrumbItem[]) => void
  getUser: () => void
}

const initialState: State = {
  token: (await ipcRenderer.invoke(IpcEvents.GET_TOKEN)) || {
    token_type: '',
    access_token: '',
    refresh_token: '',
    expires_in: 0,
    refresh_token_created_at: 0
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

export const appStore = create<State & Action>()((set, get) => ({
  ...initialState,
  updateToken: (token: APP.AppToken) => {
    set({ token })
    ipcRenderer.send(IpcEvents.SET_TOKEN, token)
  },
  updateUserInfo: (user: APP.AppUserInfo) => set(() => ({ userInfo: user })),
  updateShowNavbar: (show: boolean) => set({ showNavbar: show }),
  updateSpaceInfo: (info: APP.AppSpaceInfo) => set({ spaceInfo: info }),
  updateDriveId: (id: string) => set({ driveId: id }),
  updateBreadcrumb: (breadcrumb: APP.AppBreadcrumbItem[]) =>
    set({ breadcrumb }),
  getUser: () => get().userInfo
}))

export default createSelectors(appStore)
