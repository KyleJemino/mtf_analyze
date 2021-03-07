import React, { useContext } from 'react'
import ImageMapper from 'react-image-mapper'

import { StateContext } from '../App.js'

const ImageContainer = () => {
  const context = useContext(StateContext)

  return (
    <>
      { context.state.image !== "" 
        ? <ImageMapper src={context.state.image}/>
        : <p>No Image Uploaded yet</p>
      }
    </>
  )
}

export default ImageContainer
