import { createContext } from 'react'
import { IUser } from '~/shared/types'

type context = {
	user: IUser
	changeUser: (newUser: IUser) => void
}

export const AuthContext = createContext<Partial<context>>({})
