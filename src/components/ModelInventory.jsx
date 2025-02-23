import { useState } from 'react'

const MODELS = [
  {
    id: 'chair',
    name: 'Office Chair',
    thumbnail: '/thumbnails/Chair.png',
    modelPath: '/models/chair.glb',
    price: 199.99,
    description: 'Ergonomic office chair with adjustable height'
  },
  {
    id: 'painting',
    name: 'Building Painting',
    thumbnail: '/thumbnails/Painting.png',
    modelPath: '/models/building_painting.glb',
    price: 200.00,
    description: 'A beautiful painting of a building'
  }
  // Add more models here
]

function ModelInventory({ onSelectModel }) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0])

  const handleModelSelect = (model) => {
    setSelectedModel(model)
    onSelectModel(model)
  }

  return (
    <div className="model-inventory">
      <h2>Available Models</h2>
      <div className="model-grid">
        {MODELS.map(model => (
          <div 
            key={model.id}
            className={`model-card ${selectedModel.id === model.id ? 'selected' : ''}`}
            onClick={() => handleModelSelect(model)}
          >
            <img src={model.thumbnail} alt={model.name} />
            <h3>{model.name}</h3>
            <p>${model.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ModelInventory 