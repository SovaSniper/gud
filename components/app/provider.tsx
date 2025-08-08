"use client"

import { UserEntity } from "@/lib/database/user"
import { GooglePlace } from "@/lib/google/places/api"
import React, { createContext, useContext, useState } from "react"

type MaybeGooglePlace = GooglePlace | undefined
type MaybeUserEntity = UserEntity | undefined

export const AppProvider = ({
  children,
  initLocationPreference,
  initUser,
  initUseUrl
}: AppProviderProps) => {
  const [locationPreference, setLocationPreference] = useState<MaybeGooglePlace>(initLocationPreference)
  const [loggedInUser, setLoggedInUser] = useState<MaybeUserEntity>(initUser)
  const [loggedInUseUrl, setLoggedInUseUrl] = useState<string>(initUseUrl || "")

  return (
    <AppContext.Provider
      value={{
        locationPreference,
        setLocationPreference,
        loggedInUser,
        setLoggedInUser,
        loggedInUseUrl,
        setLoggedInUseUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

interface AppProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  initLocationPreference?: GooglePlace
  initUser?: UserEntity
  initUseUrl?: string

}

export const AppContext = createContext({
  locationPreference: {} as MaybeGooglePlace,
  setLocationPreference: (_: MaybeGooglePlace) => { },
  loggedInUser: {} as MaybeUserEntity,
  setLoggedInUser: (_: MaybeUserEntity) => { },
  loggedInUseUrl: "",
  setLoggedInUseUrl: (_: string) => { },
})

export const useApp = () => useContext(AppContext)
