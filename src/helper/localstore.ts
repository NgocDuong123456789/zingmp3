import { userProp } from '~/types/user.types'

export const saveAccessToken = (access_token: string) => {
  return localStorage.setItem('access_token', access_token)
}

export const getAccessToken = () => {
  return localStorage.getItem('access_token')
}

export const getProfile = () => {
  return JSON.parse(localStorage.getItem('profile') as string)
}

export const saveProfile = (profile: userProp) => {
  return localStorage.setItem('profile', JSON.stringify(profile))
}

export const RemoveLocal=()=>{
   return localStorage.clear();
}
