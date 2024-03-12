import { PropsWithChildren, useEffect, useRef } from 'react'

import Gradient from './Gradient'

const Zenitho = ({ children }: PropsWithChildren) => {
  const ctnDom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ctnDom.current) {
      return
    }

    const ctn = ctnDom.current
    const gradient = new Gradient()
    gradient.initGradient({
      gradientColors: ['#ef008f', '#6ec3f4', '#7038ff', '#ffba27']
    })
    ctn.appendChild(gradient.el)
    return () => {
      gradient.disconnect()
      ctn.removeChild(gradient.el)
      gradient.minigl.gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return (
    <div ref={ctnDom} className="relative">
      {children}
    </div>
  )
}

export default Zenitho
