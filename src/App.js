import React, { useState } from 'react'
import './App.css'

import DataInput from './components/DataInput'
import ImageInput from './components/ImageInput.js'
import ImageContainer from './components/ImageContainer.js'
import AreaCountDisplay from './components/AreaCountDisplay.js'

export const StateContext = React.createContext()

function App() {
  const [sensorData, setSensorData] = useState(null)
  const [image, setImage] = useState('')
  const [areas, setAreas] = useState([])

  const context = {
    sensorData,
    setSensorData,
    image,
    setImage,
    areas,
    setAreas
  }

  return (
    <StateContext.Provider value={context}>
      <div className="App">
        <h1>MTF Analyze</h1>
      </div>
      <div className="flex-column">
        <DataInput />
        <ImageInput />
        <ImageContainer />
        <AreaCountDisplay areas={areas}/>
      </div>
    </StateContext.Provider>
  )
}

export default App
