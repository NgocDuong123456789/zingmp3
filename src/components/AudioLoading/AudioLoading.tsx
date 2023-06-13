import { Audio } from 'react-loader-spinner'

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

export default AudioLoading
