import axios, { AxiosRequestConfig } from 'axios'

import { appStore } from '@renderer/store'

export const BASE_URL = '/api'

export const ALIYUN_BASE_URL = 'https://openapi.alipan.com'

const controller = new AbortController()
const service = axios.create({
  timeout: 6000,
  signal: controller.signal
})

service.interceptors.request.use(
  config => {
    const token = appStore.getState().token.access_token
    if (token && config.headers) {
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
  error => {
    return Promise.reject(error)
  }
)

export const request = async <T>(url: string, config?: AxiosRequestConfig) => {
  try {
    const response = await service.request<T>({
      url,
      ...config,
      headers: {
        ...config?.headers
      }
    })
    return response as T
  } catch (error) {
    return Promise.reject(error)
  }
}
