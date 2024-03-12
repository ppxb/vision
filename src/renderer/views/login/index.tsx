const LoginView = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-6 bg-gradient-to-r from-[#C6D5EB] via-[#FFD1C8] to-[#E7EDD6] animate-background bg-size-400">
      <div className="font-logo text-6xl">Vision</div>
      <div className="flex flex-col items-center px-12 py-8 rounded-2xl bg-black/20 backdrop-blur backdrop-saturate-150">
        <div className="w-[144px] h-[144px] mb-6 bg-black/80 rounded-2xl"></div>
        <div className="text-center text-sm text-foreground-50">
          <p>Please use Alipan App Scan the QR</p>
          <p>Vision will be authorized to use your information</p>
        </div>
      </div>
    </div>
  )
}

export default LoginView
