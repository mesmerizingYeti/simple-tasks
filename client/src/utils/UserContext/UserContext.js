import { createContext } from 'react'

const UserContext = createContext({
  _id: 0,
  googleId: '',
  email: '',
  name: '',
  isAuthenticated: false
})

export default UserContext