import axios from 'axios'

export const BASE_URL = '/api'

export const ALIYUN_BASE_URL = 'https://openapi.alipan.com'

const controller = new AbortController()
const service = axios.create({
  timeout: 6000,
  signal: controller.signal
})

service.interceptors.request.use(
  config => {
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

export const get = (url: string, params?: any) => service.get(url, params)

export const post = (url: string, data?: any) => service.post(url, data)
