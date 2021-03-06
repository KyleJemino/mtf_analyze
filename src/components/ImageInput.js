import React, { useContext, useEffect } from 'react'
import { StateContext, actionType } from '../App'

function ImageInput() {
  const stateContext = useContext(StateContext)

  const onChangePicture = (e) => {
    const uploaded_file = e.target.files[0]
    const imageURL = URL.createObjectURL(uploaded_file)
    if (uploaded_file) {
      stateContext.dispatch({type: actionType.INSERT_IMAGE, payload: "hello" })
    }
  }

  useEffect(() => console.dir(stateContext.state))

  return (
    <>
      <input type="file" placeholder="Upload Measure the Future Sensor image here" onChange={(e) => {onChangePicture(e)}}></input>
    </>
  )
}

export default ImageInput
