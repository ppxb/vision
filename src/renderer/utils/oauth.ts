import request from '@renderer/utils/request'
import { ContentTypeEnum, RequestEnum } from '@renderer/enums/http'
import { BASE_URL, ALIYUN_BASE_URL } from '@renderer/utils/request'

export const fetchQRCode = async () => {
  return request<API.QRCodeRes>({
    url: `${BASE_URL}/oauth/authorize/qrcode`,
    method: RequestEnum.GET
  })
}

export const fetchQRCodeStatus = (data: API.QRCodeStatusReq) => {
  return request<API.QRCodeStatusRes>({
    url: `${ALIYUN_BASE_URL}/oauth/qrcode/${data.sid}/status`,
    method: RequestEnum.GET
  })
}

export const fetchAccessToken = (data: API.AccessTokenReq) => {
  return request<API.AccessTokenRes>({
    url: `${BASE_URL}/oauth/access_token`,
    method: RequestEnum.POST,
    headers: {
      'Content-Type': ContentTypeEnum.JSON
    },
    data
  })
}
