import { useState } from 'react'
import { useXR, Interactive } from '@react-three/xr'
import { OrbitControls } from '@react-three/drei'
import ChairModel from './ChairModel'
import PaintingModel from './PaintingModel'
import PlacementIndicator from './PlacementIndicator'

const modelMap = {
  '/models/chair.glb': ChairModel,
  '/models/building_painting.glb': PaintingModel,
  // Add more models here
};

function ARScene({ selectedModel }) {
  const [placedObjects, setPlacedObjects] = useState([])
  const { isPresenting } = useXR()

  const handleSelect = (event) => {
    if (!event.intersection || !selectedModel) return
    const position = event.intersection.point
    console.log('Placing model:', selectedModel); // Log the selected model
    console.log('Position:', position); // Log the position
    setPlacedObjects(prev => [...prev, {
      position,
      id: Date.now(),
      modelPath: selectedModel.modelPath
    }])
  }

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      
      {isPresenting ? (
        <>
          <PlacementIndicator onSelect={handleSelect} />
          <Interactive onSelect={handleSelect}>
            <mesh scale={[100, 100, 100]} rotation-x={-Math.PI / 2} visible={false}>
              <planeGeometry />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
          </Interactive>
          
          {placedObjects.map((obj) => {
            const ModelComponent = modelMap[obj.modelPath];
            return ModelComponent ? <ModelComponent key={obj.id} position={obj.position} /> : null;
          })}
        </>
      ) : (
        // Preview mode with both models
        selectedModel ? (
          <>
            {(() => {
              const ModelComponent = modelMap[selectedModel.modelPath];
              return ModelComponent ? <ModelComponent position={[0, 0, 0]} /> : null;
            })()}
            <OrbitControls 
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={5}
            />
          </>
        ) : null
      )}
    </>
  )
}

export default ARScene