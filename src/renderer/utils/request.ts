import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import { appStore } from '@renderer/store'
import { fetchAccessToken } from './oauth'

export const BASE_URL = '/api'

export const ALIYUN_BASE_URL = 'https://openapi.alipan.com'

let isRefreshing = false
let retryReqeusts: any[] = []

const createService = () => {
  const service = axios.create()

  service.interceptors.request.use(
    config => {
      const token = appStore.getState().token.access_token
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = token
      }
      return config
    },
    error => Promise.reject(error)
  )

  service.interceptors.response.use(
    response => {
      const res = response.data
      return res
    },
    async (error: AxiosError<any>) => {
      const response = error.response
      const config = response?.config as AxiosRequestConfig
      if (response?.status === 401) {
        if (!isRefreshing) {
          try {
            isRefreshing = true
            const res = await fetchAccessToken({
              grant_type: 'refresh_token',
              refresh_token: appStore.getState().token.refresh_token
            })
            appStore
              .getState()
              .updateToken({ ...res, refresh_token_created_at: Date.now() })
            for (let i = 0; i < retryReqeusts.length; i++) {
              retryReqeusts[i](res.access_token)
            }
            retryReqeusts = []
            config.headers = {
              ...config.headers,
              Authorization: res.access_token
            }
            return await request(config)
          } catch (error) {
            return Promise.reject(error)
          } finally {
            isRefreshing = false
          }
        } else {
          return new Promise(resolve => {
            retryReqeusts.push((token: string) => {
              config.headers = { ...config.headers, Authorization: token }
              resolve(request(config))
            })
          })
        }
      }
      return Promise.reject(error)
    }
  )
  return service
}

const request = async <T>(config?: AxiosRequestConfig): Promise<T> => {
  const defaultConfig = {
    timeout: 10000
  } as AxiosRequestConfig
  const service = createService()
  const res = await service({ ...defaultConfig, ...config })
  return res as unknown as Promise<T>
}

export default request
