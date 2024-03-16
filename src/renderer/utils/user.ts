import request from '@renderer/utils/request'
import { ContentTypeEnum, RequestEnum } from '@renderer/enums/http'
import { ALIYUN_BASE_URL } from '@renderer/utils/request'

export const fetchDriveInfo = async () => {
  return request<API.UserInfoRes>({
    url: `${ALIYUN_BASE_URL}/adrive/v1.0/user/getDriveInfo`,
    method: RequestEnum.POST,
    headers: {
      'Content-Type': ContentTypeEnum.JSON
    }
  })
}

export const fetchSpaceInfo = async () => {
  return request<API.SpaceInfoRes>({
    url: `${ALIYUN_BASE_URL}/adrive/v1.0/user/getSpaceInfo`,
    method: RequestEnum.POST,
    headers: {
      'Content-Type': ContentTypeEnum.JSON
    }
  })
}
