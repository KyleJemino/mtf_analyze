import React, { useContext } from 'react'
import { getCounts } from '../utils'
import { StateContext } from '../App.js'

export const AreaCountDisplay = ({ areas }) => {
  const { sensorData, setAreas } = useContext(StateContext)

  const handleClear = () => {
    setAreas([])
  }

  return (
    <>
      <div className='flex-row -start'>
        <h1> AREAS </h1>
        <button className='button' onClick={handleClear}>Clear Areas</button>
      </div>
      <div className='flex-row'>
        {areas.map((area) => {
          return (
            <div key={area.id}>
              <h4>AREA: {area.name}</h4>
              <h5>Counts: {sensorData && getCounts(sensorData, area.rect, 30)}</h5>
              <p>Top Left: <span>x: {area.rect.topLeft[0]}, y: {area.rect.topLeft[1]}</span></p>
              <p>Bottom Left: <span>x: {area.rect.bottomLeft[0]}, y: {area.rect.bottomLeft[1]}</span></p>
              <p>Top Right: <span>x: {area.rect.topRight[0]}, y: {area.rect.topRight[1]}</span></p>
              <p>Bottom Right: <span>x: {area.rect.bottomRight[0]}, y: {area.rect.bottomRight[1]}</span></p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default AreaCountDisplay
