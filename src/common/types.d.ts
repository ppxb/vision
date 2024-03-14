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
}
