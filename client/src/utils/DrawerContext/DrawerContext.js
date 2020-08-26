import { createContext } from 'react'

const DrawerContext = createContext({
  isOpen: false,
  setDrawer: () => {}
})

export default DrawerContext