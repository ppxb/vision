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
}
