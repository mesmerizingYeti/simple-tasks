import { createContext } from 'react'

const UserContext = createContext({
  email: '',
  _id: '',
  jwt: '',
  isGoogle: false,
  handleCreateUser: () => {}
})

export default UserContext