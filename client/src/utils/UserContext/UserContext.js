import { createContext } from 'react'

const UserContext = createContext({
  email: '',
  _id: '',
  jwt: '',
  setUser: () => {}
})

export default UserContext