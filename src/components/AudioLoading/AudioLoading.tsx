import { Audio, RotatingLines } from 'react-loader-spinner'

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
export const AudioLoadingSmall = () => {
  return (
    <Audio
      height='20'
      width='20'
      color='white'
      ariaLabel='audio-loading'
      wrapperStyle={{}}
      wrapperClass='wrapper-class'
      visible={true}
    />
  )
}

export const AudioLoader = () => {
  return (
    <RotatingLines
    strokeColor="grey"
    strokeWidth="5"
    animationDuration="0.75"
    width="25"
    visible={true}
  />
  )
}

export default AudioLoading
