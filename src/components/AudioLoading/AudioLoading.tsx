import { Audio } from 'react-loader-spinner'
import React from 'react'

const AudioLoading = () => {
  return (
    <Audio
      height='40'
      width='40'
      color='white'
      ariaLabel='audio-loading'
      wrapperStyle={{}}
      wrapperClass='wrapper-class'
      visible={true}
    />
  )
}

export default AudioLoading
