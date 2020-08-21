import { createContext } from 'react'

const DrawerContext = createContext({
  isOpen: false,
  toggleDrawer: () => {}
})

export default DrawerContext