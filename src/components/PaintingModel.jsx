import { useGLTF } from '@react-three/drei'
import { Interactive } from '@react-three/xr'
import { useState, useRef } from 'react'

function PaintingModel({ position = [0, 0, 0] }) {
  const { scene } = useGLTF('/models/building_painting.glb') // Ensure this matches the actual file
  const fixedScale = 0.8  
  const [rotation, setRotation] = useState([0, Math.PI / 2, 0])
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 })
  const isRotating = useRef(false)

  const handleSelect = (event) => {
    // Rotate 45 degrees on tap
    setRotation([
      rotation[0],
      rotation[1] + Math.PI / 4,
      rotation[2]
    ])
    event.stopPropagation() // Prevent placing new paintings when rotating
  }

  const handleTouchStart = (event) => {
    const touch = event.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
    isRotating.current = true
  }

  const handleTouchMove = (event) => {
    if (!isRotating.current) return

    const touch = event.touches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const timeDelta = Date.now() - touchStartRef.current.time

    // Only rotate if it's a deliberate drag (not a quick tap)
    if (timeDelta > 100 && Math.abs(deltaX) > 5) {
      setRotation([
        rotation[0],
        rotation[1] + (deltaX * 0.005), // Reduced sensitivity
        rotation[2]
      ])
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      }
    }
  }

  const handleTouchEnd = () => {
    isRotating.current = false
  }

  return (
    <Interactive onSelect={handleSelect}>
      <primitive 
        object={scene} 
        position={position}
        scale={[fixedScale, fixedScale, fixedScale]}
        rotation={rotation}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </Interactive>
  )
}

export default PaintingModel; 