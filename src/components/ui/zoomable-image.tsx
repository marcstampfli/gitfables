/**
 * @module components/ui/zoomable-image
 * @description A zoomable image component with pan and zoom controls
 */

'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ZoomableImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  width: number
  height: number
}

/**
 * ZoomableImage Component
 * 
 * @component
 * @description A component that allows users to zoom and pan an image
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 */
export function ZoomableImage({
  src,
  alt,
  width,
  height,
  className,
  ...props
}: ZoomableImageProps) {
  const [scale, setScale] = React.useState(1)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleWheel = React.useCallback((e: WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY * -0.01
    const newScale = Math.min(Math.max(0.1, scale + delta), 4)
    setScale(newScale)
  }, [scale])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden cursor-move select-none',
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      {...props}
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          transition: isDragging ? 'none' : 'transform 0.1s'
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="max-w-none"
          draggable={false}
          priority
        />
      </div>
    </div>
  )
} 