import React, { useContext } from 'react'
import { StateContext, TYPES } from '../App.js'

const ImageContainer = () => {
  const context = useContext(StateContext)

  return (
    <>
      { context.state.image != "" 
        ? <img src={context.state.image} />
        : <p>No Image Uploaded yet</p>
      }
    </>
  )
}

export default ImageContainer
