import { useState } from 'react'

interface ImageLoaderProps {
  src: string
  className?: string
}

const ImageLoader = ({ src, className }: ImageLoaderProps) => {
  const [loaded, setLoaded] = useState(false)

  return (
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
  )
}

export default ImageLoader
