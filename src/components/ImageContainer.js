import React, { useContext } from 'react'
import { StateContext } from '../App.js'

const ImageContainer = () => {
  const context = useContext(StateContext)

  return (
    <>
      { context.state.image !== "" 
        ? <img src={context.state.image} alt="sensor"/>
        : <p>No Image Uploaded yet</p>
      }
    </>
  )
}

export default ImageContainer
