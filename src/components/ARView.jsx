import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ARButton, XR } from '@react-three/xr'
import { useGLTF } from '@react-three/drei'
import ARScene from './ARScene'
import ModelInventory from './ModelInventory'

function ARView() {
  const [selectedModel, setSelectedModel] = useState(null)

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

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '4px'
      }}>
        Tap to place • Tap chair to rotate
      </div>

      <Canvas
        style={{ width: '100%', height: '100%' }}
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true
        }}
        camera={{ position: [0, 1.5, 3] }}
      >
        <XR>
          <ARScene selectedModel={selectedModel} />
        </XR>
      </Canvas>

      <ModelInventory onSelectModel={setSelectedModel} />
    </div>
  )
}

export default ARView 