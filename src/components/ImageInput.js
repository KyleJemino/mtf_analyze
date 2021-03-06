import React, { useContext } from 'react'
import { StateContext } from '../App'

function ImageInput() {
  const {setImage} = useContext(StateContext)

  const onChangePicture = (e) => {
    const uploaded_file = e.target.files[0]
    const imageURL = URL.createObjectURL(uploaded_file)
    if (uploaded_file) {
      setImage(imageURL)
    }
  }

  return (
    <>
      <label>Upload sensor image here:</label><br />
      <input type="file" placeholder="Upload Measure the Future Sensor image here" onChange={(e) => {onChangePicture(e)}}></input>
    </>
  )
}

export default ImageInput
