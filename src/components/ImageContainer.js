import React, { useContext } from 'react'
import ImageMapper from 'react-image-mapper'

import { StateContext } from '../App.js'

const ImageContainer = () => {
  const context = useContext(StateContext)

  return (
    <>
      <div className="image-section">
        { context.state.image !== "" 
          ? <ImageMapper src={context.state.image}/>
          : <p>No Image Uploaded yet</p>
        }
      </div>
    </>
  )
}

export default ImageContainer
