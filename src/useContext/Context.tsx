import { createContext, useState } from 'react'
import { getAccessToken, getProfile } from '~/helper/localstore'
import { userProp } from '~/types/register.types'

interface ContextProp {
  profile: null | userProp
  setProfile: React.Dispatch<React.SetStateAction<userProp | null>>
  authentication: boolean
  setAuthentication: React.Dispatch<React.SetStateAction<boolean>>
}
const intal: ContextProp = {
  profile: getProfile(),
  setProfile: () => null,
  authentication: Boolean(getAccessToken()),
  setAuthentication: () => null
}
export const AppContext = createContext(intal)

export const ProvideContext = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<null | userProp>(null)
  const [authentication, setAuthentication] = useState<boolean>(intal.authentication)
  return (
    <AppContext.Provider value={{ profile, setProfile, authentication, setAuthentication }}>
      {children}
    </AppContext.Provider>
  )
}
