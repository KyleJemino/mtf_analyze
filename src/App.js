import React, { useReducer } from 'react'
import logo from './logo.svg'
import './App.css'

import ImageInput from './components/ImageInput.js'

export const StateContext = React.createContext()

export const actionType = {
  INSERT_IMAGE: "INSERT_IMAGE",
}

const initialState = {
  sensorData: {},
  areas: [],
  image: ""
}

const reducer = (state, action) => {
  switch(action.type) {
    case action.INSERT_IMAGE:
      return {
        ...state,
        image: action.payload
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={{ state: state, dispatch: dispatch }}>
      <div className="App">
        <h1>MTF Analyze</h1>
      </div>
      <ImageInput />
    </StateContext.Provider>
  )
}

export default App
