import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'

import Zenitho from '@renderer/components/zenitho'
import { getQRCode, checkQrCodeStatus } from '@renderer/utils/oauth'
import { CheckIcon, ReloadIcon } from '@renderer/components/icon'

const LoginView = () => {
  const [qrCode, setQRCode] = useState('')
  const [qrStatus, setQRStatus] = useState('')
  const [authCode, setAuthCode] = useState('')

  const requestQRCode = async () => {
    const res = await getQRCode()
    setQRCode(res['qrCodeUrl'])
    setQRStatus('WaitLogin')
    await requestStatus(res['sid'])
  }

  const requestStatus = async (sid: string) => {
    const res = await checkQrCodeStatus(sid)
    const status = res.status as unknown as string
    setQRStatus(status)
    if (res['authCode']) {
      setAuthCode(res['authCode'])
    }
    if (['WaitLogin', 'ScanSuccess'].includes(status)) {
      requestStatus(sid)
    }
  }

  useEffect(() => {
    requestQRCode()
  }, [])

  return (
    <Zenitho>
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-6">
        <div className="font-logo text-background text-6xl">Vision</div>
        <div className="flex flex-col items-center p-12 rounded-2xl bg-black/10 backdrop-blur-md backdrop-saturate-150">
          <div className="relative w-[150px] h-[150px]">
            {qrStatus === 'QRCodeExpired' && (
              <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 rounded-2xl bg-black/80">
                <div className="text-sm text-foreground-50">二维码已过期</div>
                <Button
                  size="sm"
                  startContent={<ReloadIcon />}
                  onClick={requestQRCode}
                >
                  重新加载
                </Button>
              </div>
            )}
            {qrStatus === 'ScanSuccess' && (
              <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 rounded-2xl bg-black/80">
                <CheckIcon className="text-green-500" />
                <div className="text-sm text-foreground-50">等待 App 确认</div>
              </div>
            )}
            <img src={qrCode} className="rounded-2xl" />
          </div>
        </div>
        <div className="text-center text-sm text-foreground-50">
          <p>请使用阿里云盘 App 扫描二维码登录</p>
          <p>Vision 将会被授权使用您的个人信息和云盘信息</p>
        </div>
      </div>
    </Zenitho>
  )
}

export default LoginView
