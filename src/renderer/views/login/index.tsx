import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'

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
    <div className="flex flex-col h-screen justify-center items-center gap-6 bg-gradient-to-r from-[#C6D5EB] via-[#FFD1C8] to-[#E7EDD6] animate-background bg-size-400">
      <div className="font-logo text-6xl">Vision</div>
      <div className="flex flex-col items-center px-12 py-8 rounded-2xl bg-black/20 backdrop-blur backdrop-saturate-150">
        <div className="relative w-[160px] h-[160px] mb-6">
          {qrStatus === 'QRCodeExpired' && (
            <div className="flex flex-col gap-2 justify-center items-center absolute inset-0 rounded-2xl bg-black/80">
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
            <div className="flex flex-col gap-2 justify-center items-center absolute inset-0 rounded-2xl bg-black/80">
              <CheckIcon className="text-green-500" />
              <div className="text-sm text-foreground-50">等待 App 确认</div>
            </div>
          )}
          <img src={qrCode} className="rounded-2xl" />
        </div>
        <div className="text-center text-sm text-foreground-50">
          <p>请使用阿里云盘 App 扫描二维码登录</p>
          <p>Vision 将会被授权使用您的信息</p>
        </div>
      </div>
    </div>
  )
}

export default LoginView
