import React, { useContext } from 'react'
import { StateContext } from '../App.js'

export const DataInput = () => {
  const { sensorData, setSensorData } = useContext(StateContext)  

  const handleChange = e => {
    const fr = new FileReader()
    fr.readAsText(e.target.files[0], "UTF-8")
    fr.onload = e => {
      setSensorData(JSON.parse(e.target.result))
    }
  }

  return (
    <div>
      <label>Upload interactions json file here:</label><br />
      <input type='file' onChange={handleChange} />
    </div>
  )
}

export default DataInput
