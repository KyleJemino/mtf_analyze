import React, { useContext, useEffect } from 'react'
import { StateContext, TYPES } from '../App'

function ImageInput() {
  const context = useContext(StateContext)

  const onChangePicture = (e) => {
    const uploaded_file = e.target.files[0]
    const imageURL = URL.createObjectURL(uploaded_file)
    if (uploaded_file) {
      context.dispatch({type: TYPES.INSERT_IMAGE, payload: imageURL })
    }
  }

  return (
    <>
      <input type="file" placeholder="Upload Measure the Future Sensor image here" onChange={(e) => {onChangePicture(e)}}></input>
    </>
  )
}

export default ImageInput
