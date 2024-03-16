import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button, Spinner } from '@nextui-org/react'

import useAppStore from '@renderer/store'
import {
  fetchAccessToken,
  fetchQRCode,
  fetchQRCodeStatus
} from '@renderer/utils/oauth'
import { CheckIcon, ReloadIcon } from '@renderer/components/AppIcon'

const LoginView = () => {
  const [qrCode, setQRCode] = useState('')
  const [qrStatus, setQRStatus] = useState('')
  const [isReady, setIsReady] = useState(false)

  const updateShowNavbar = useAppStore.use.updateShowNavbar()
  const updateToken = useAppStore.use.updateToken()

  const navigate = useNavigate()

  const requestQRCode = async () => {
    try {
      const data = await fetchQRCode()
      setQRCode(data.qrCodeUrl)
      setQRStatus('WaitLogin')
      await requestQRCodeStatus(data.sid)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const requestQRCodeStatus = async (sid: string) => {
    try {
      const data = await fetchQRCodeStatus({ sid })
      const { status } = data
      setQRStatus(data.status)
      if (data.authCode) {
        await requestToken(data.authCode)
      }
      if (['WaitLogin', 'ScanSuccess'].includes(status)) {
        await requestQRCodeStatus(sid)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const requestToken = async (code: string) => {
    try {
      const data = await fetchAccessToken({
        grant_type: 'authorization_code',
        code
      })
      setIsReady(true)
      updateToken({ ...data, refresh_token_created_at: Date.now() })
      setTimeout(() => {
        updateShowNavbar(true)
        navigate('/')
      }, 3000)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  useEffect(() => {
    requestQRCode()
  }, [])

  return (
    <div className="w-screen h-screen absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-6">
      <motion.div
        animate={
          isReady ? { scale: 2, translateY: 180 } : { scale: 1, translateY: 0 }
        }
        transition={{
          duration: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0.3
        }}
        className="font-logo text-background text-6xl"
      >
        Vision
      </motion.div>
      <motion.div
        animate={
          isReady
            ? { opacity: 0, translateY: '100%' }
            : { opacity: 1, translateY: '0' }
        }
        className="flex flex-col items-center gap-4"
      >
        <div className="flex items-center w-fit justify-center p-8 rounded-3xl bg-black/10 backdrop-blur-md backdrop-saturate-150">
          <div className="relative w-[160px] h-[160px]">
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
            {/* {qrCode ? (
              <img src={qrCode} className="rounded-2xl" />
            ) : (
              <div className="relative w-[160px] h-[160px] rounded-2xl">
                <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 rounded-2xl bg-black/80">
                  <div className="text-sm text-foreground-50">
                    二维码加载失败
                  </div>
                  <Button
                    size="sm"
                    startContent={<ReloadIcon />}
                    onClick={requestQRCode}
                  >
                    重新加载
                  </Button>
                </div>
              </div>
            )} */}
          </div>
        </div>
        <div className="text-center font-light text-foreground-50">
          <p className="mb-1">请使用阿里云盘 App 扫描二维码登录</p>
          <p>Vision 将会被授权使用您的个人信息和云盘信息</p>
        </div>
      </motion.div>
      <motion.div
        animate={
          isReady
            ? {
                opacity: 1,
                translateY: -120,
                visibility: 'visible',
                display: 'flex'
              }
            : { opacity: 0 }
        }
        transition={{
          duration: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0.3
        }}
        className="hidden invisible gap-3 font-light text-background"
      >
        <Spinner
          classNames={{
            wrapper: 'w-5 h-5',
            circle1: 'border-b-background',
            circle2: 'border-b-background/80'
          }}
        />
        正在加载您的数据以准备 Vision
      </motion.div>
    </div>
  )
}

export default LoginView
