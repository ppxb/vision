import { ipcMain } from 'electron'

import { store } from '../store'
import { IpcEvents } from '../../common/ipcEvents'

const register = () => {
  ipcMain.on(IpcEvents.SET_TOKEN, (_, token: APP.AppToken) => {
    store.set('config.token', token)
  })

  ipcMain.handle(IpcEvents.GET_TOKEN, () => {
    return store.get('config').token
  })

  ipcMain.on(IpcEvents.CLEAR_STORE, () => {
    store.clear()
  })
}

export default { register }
