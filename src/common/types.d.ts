declare namespace API {
  type QRCodeRes = {
    qrCodeUrl: string
    sid: string
  }

  type QRCodeStatusReq = {
    sid: string
  }

  type QRCodeStatusRes = {
    authCode: string
    status: string
  }

  type AccessTokenReq = {
    grant_type: string
    code?: string
    refresh_token?: string
  }

  type AccessTokenRes = {
    token_type: string
    access_token: string
    refresh_token: string
    expires_in: number
  }

  type UserInfoRes = {
    user_id: string
    name: string
    avatar: string
    default_drive_id: string
    resource_drive_id: string
    backup_drive_id: string
  }

  type SpaceInfoRes = {
    personal_space_info: {
      used_size: number
      total_size: number
    }
  }

  type FileListReqOrderBy =
    | 'created_at'
    | 'updated_at'
    | 'name'
    | 'size'
    | 'name_enhanced'

  type FileListReqCategory =
    | 'video'
    | 'doc'
    | 'audio'
    | 'zip'
    | 'others'
    | 'image'

  type FileListReq = {
    drive_id: string | undefined
    limit?: number
    marker?: string
    order_by?: FileListReqOrderBy
    order_direction?: 'DESC' | 'ASC'
    parent_file_id: string | undefined
    category?: FileListReqCategory
    type?: 'all' | 'file' | 'folder'
    video_thumbnail_time?: number
    video_thumbnail_width?: number
    image_thumbnail_width?: number
    fields?: string
  }

  type FileListRes = {
    items: APP.AppFile[]
    next_marker?: string
  }
}

declare namespace APP {
  type AppConfig = {
    token: AppToken
  }

  type AppToken = {
    token_type: string
    access_token: string
    refresh_token: string
    expires_in: number
    refresh_token_created_at: number
  }

  type AppUserInfo = {
    user_id: string
    name: string
    avatar: string
    default_drive_id: string
    resource_drive_id: string
    backup_drive_id: string
  }

  type AppSpaceInfo = {
    personal_space_info: {
      used_size: number
      total_size: number
    }
  }

  type AppSpaceItem = {
    id: string
    name: string
    icon: React.JSX.Element
  }

  type AppFile = {
    drive_id: string
    file_id: string
    parent_file_id: string
    name: string
    size: number
    file_extension: string
    content_hash: string
    category: string
    type: 'file' | 'folder'
    thumbnail?: string
    url?: string
    created_at: string
    updated_at: string
    play_cursor?: string
    video_media_metadata?: object
    video_preview_metadata?: object
  }

  type AppBreadcrumbItem = {
    drive_id: string
    name: string
    parent_file_id?: string
  }
}
