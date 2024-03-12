import { get, BASE_URL, ALIYUN_BASE_URL } from '@renderer/utils/request'

export const getQRCode = () => get(`${BASE_URL}/oauth/authorize/qrcode`)

export const checkQrCodeStatus = (sid: string) =>
  get(`${ALIYUN_BASE_URL}/oauth/qrcode/${sid}/status`)
