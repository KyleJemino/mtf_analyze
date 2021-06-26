import React, { useState, useContext, useEffect } from 'react'
import ImageMapper from 'react-image-mapper'
import { v4 as uuid } from 'uuid'
import { makeRectangle } from '../utils'

import { StateContext } from '../App.js'

const ImageContainer = () => {
  const [points, setPoints] = useState([])
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  const [name, setName] = useState('')

  const { image, areas, setAreas } = useContext(StateContext)

  const onClick = (e) => {
    if (points.length < 4) {
      setPoints([...points, [e.nativeEvent.offsetX, e.nativeEvent.offsetY]])
    }
  }

  const handleNameOnChange = (e) => {
    setName(e.target.value)
  }

  const handleSave = () => {
    const newArea = {
      id: uuid(),
      name,
      rect: makeRectangle(points), 
    }

    console.log([...areas, newArea])

    setAreas([...areas, newArea])
    setPoints([])
    setName('')
  }

  useEffect(() => {
    if (points.length === 4 && name.length > 0) { 
      setIsSaveDisabled(false) 
    } else {
      setIsSaveDisabled(true)
    }
  }, [points, name])

  return (
    <>
      <p>Click the image to set areas</p>
      <div className="image-section">
        { image !== "" 
          ? <ImageMapper src={image} onImageClick={(e) => onClick(e)} />
          : <p>No Image Uploaded yet</p>
        }
      </div>
      <label>Area Name</label>
      <input className="text-input" type='text' value={name} onChange={handleNameOnChange}></input>
      <button className="button" disabled={isSaveDisabled} onClick={handleSave}>Save Area</button>
    </>
  )
}

export default ImageContainer
