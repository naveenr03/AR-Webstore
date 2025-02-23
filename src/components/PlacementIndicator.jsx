import { useXR, Interactive } from '@react-three/xr'

function PlacementIndicator({ onSelect }) {
  const { isPresenting } = useXR()
  
  if (!isPresenting) return null

  return (
    <Interactive onSelect={onSelect}>
      <mesh rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.2, 0.25, 32]} />
        <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
      </mesh>
    </Interactive>
  )
}

export default PlacementIndicator