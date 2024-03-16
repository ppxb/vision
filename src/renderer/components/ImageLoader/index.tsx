import { useState } from 'react'

import { PlayIcon } from '@renderer/components/AppIcon'

interface ImageLoaderProps {
  src: string
  className?: string
}

const ImageLoader = ({ src, className }: ImageLoaderProps) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative">
      <div
        className={`w-[164px] h-[100px] scale-[0.7] bg-black/10 rounded-xl ${className}`}
      >
        <img
          src={src}
          className={`w-full rounded-xl h-full object-cover ${loaded ? 'block' : 'hidden'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
          referrerPolicy="no-referrer"
        />
        {!loaded && (
          <div className="w-full h-full rounded-xl bg-black/80 animate-pulse" />
        )}
      </div>
      <div className="absolute top-[36px] left-[68px] flex items-center justify-center p-[10px] rounded-full bg-black/20 backdrop-blur-md">
        <PlayIcon className="text-white" />
      </div>
    </div>
  )
}

export default ImageLoader
