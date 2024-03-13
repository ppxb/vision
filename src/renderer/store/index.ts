import { create } from 'zustand'

import { IpcEvents } from '@common/ipcEvents'
import createSelectors from './selector'

const { ipcRenderer } = window.electron

interface State {
  token: APP.AppToken
}

interface Actions {
  updateToken: (token: APP.AppToken) => void
}

const initialState: State = {
  token: (await ipcRenderer.invoke(IpcEvents.GET_TOKEN)) || {
    token_type: '',
    access_token: '',
    refresh_token: '',
    expires_in: 0
  }
}

const appStore = create<State & Actions>()(set => ({
  ...initialState,
  updateToken: (token: APP.AppToken) => {
    set({ token })
    ipcRenderer.send(IpcEvents.SET_TOKEN, token)
  }
}))

export default createSelectors(appStore)
