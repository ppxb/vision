const LoginView = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="font-logo text-6xl mb-6">Vision</div>
      <div className="flex flex-col items-center px-12 py-8 rounded-2xl bg-black/20 backdrop-blur backdrop-saturate-150 shadow-sm">
        <div className="w-[144px] h-[144px] mb-6 bg-black/80 rounded-xl"></div>
        <div className="text-sm text-white">
          Please use Alipan App Scan the QR
        </div>
        <div className="text-sm text-white">
          Vision will be authorized to use your information
        </div>
      </div>
    </div>
  )
}

export default LoginView
