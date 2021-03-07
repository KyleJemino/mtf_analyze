import React, { useContext } from 'react'
import ImageMapper from 'react-image-mapper'

import { StateContext } from '../App.js'

const ImageContainer = () => {
  const context = useContext(StateContext)

  const onClick = (e) => {
    console.log("x: ", e.nativeEvent.offsetX)
    console.log("y: ", e.nativeEvent.offsetY)
  }

  return (
    <>
      <div className="image-section">
        { context.state.image !== "" 
          ? <ImageMapper src={context.state.image} onImageClick={(e) => onClick(e)} />
          : <p>No Image Uploaded yet</p>
        }
      </div>
    </>
  )
}

export default ImageContainer
