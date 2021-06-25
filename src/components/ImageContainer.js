import React, { useState, useContext, useEffect } from 'react'
import ImageMapper from 'react-image-mapper'

import { StateContext } from '../App.js'

const ImageContainer = () => {
  const [points, setPoints] = useState([])
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  const { image } = useContext(StateContext)

  const onClick = (e) => {
    console.log("x: ", e.nativeEvent.offsetX)
    console.log("y: ", e.nativeEvent.offsetY)
    if (points.length < 4) {
      setPoints([...points, [e.nativeEvent.offsetX, e.nativeEvent.offsetY]])
    }
  }

  useEffect(() => {
    if (points.length === 4) { setIsSaveDisabled(false) }
  }, [points])

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
      <input className="text-input"type='text'></input>
      <button className="button" disabled={isSaveDisabled}>Save Area</button>
    </>
  )
}

export default ImageContainer
