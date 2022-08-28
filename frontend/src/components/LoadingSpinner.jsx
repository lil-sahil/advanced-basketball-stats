import React from 'react'
import {ImSpinner2} from "react-icons/im"

const LoadingSpinner = () => {
  return (
    <div className = "animate-spin text-3xl w-full h-full flex flex-row justify-center items-center">
        <ImSpinner2></ImSpinner2>
    </div>
  )
}

export default LoadingSpinner



