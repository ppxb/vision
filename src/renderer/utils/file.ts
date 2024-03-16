import request from '@renderer/utils/request'
import { ContentTypeEnum, RequestEnum } from '@renderer/enums/http'
import { ALIYUN_BASE_URL } from '@renderer/utils/request'

export const fetchFileList = (data: API.FileListReq) => {
  return request<API.FileListRes>({
    url: `${ALIYUN_BASE_URL}/adrive/v1.0/openFile/list`,
    method: RequestEnum.POST,
    headers: {
      'Content-Type': ContentTypeEnum.JSON
    },
    data
  })
}
