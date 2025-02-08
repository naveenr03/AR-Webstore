import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ARButton, XR, Interactive, useXR } from '@react-three/xr'
import { OrbitControls, useGLTF } from '@react-three/drei'

function ChairModel({ position = [0, 0, 0] }) {
  const { scene } = useGLTF('/models/chair.glb')
  
  return (
    <primitive 
      object={scene} 
      position={position}
      scale={[1.5, 1.5, 1.5]}
      rotation={[0, Math.PI / 2, 0]}
    />
  )
}

function PlacementIndicator({ onSelect }) {
  const { isPresenting } = useXR()
  
  if (!isPresenting) return null

  return (
    <Interactive onSelect={onSelect}>
      <mesh rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.1, 0.15, 32]} />
        <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
      </mesh>
    </Interactive>
  )
}

function Scene() {
  const [placedObjects, setPlacedObjects] = useState([])
  const { isPresenting } = useXR()

  const handleSelect = (event) => {
    if (!event.intersection) return
    const position = event.intersection.point
    setPlacedObjects((prev) => [...prev, position])
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      
      {isPresenting ? (
        <>
          <PlacementIndicator onSelect={handleSelect} />
          {placedObjects.map((position, index) => (
            <ChairModel key={index} position={position} />
          ))}
        </>
      ) : (
        <ChairModel position={[0, 0, 0]} />
      )}
      <OrbitControls />
    </>
  )
}

function ARView() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 1000 
      }}>
        <ARButton 
          className="ar-button"
          style={{
            background: '#ffffff',
            color: '#000000',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        />
      </div>

      <Canvas style={{ width: '100%', height: '100%' }}>
        <XR>
          <Scene />
        </XR>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/chair.glb')

export default ARView 