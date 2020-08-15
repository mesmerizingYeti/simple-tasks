import { createContext } from 'react'

const HomeContext = createContext({
  taskList: [],
  handleTaskCheck: () => {},
  setTaskList: () => {},
  title: '',
  notes: '',
  handleInputChange: () => {},
  addFormOpen: false,
  handleAddFormOpen: () => {},
  handleAddFormCancel: () => {},
  handleAddFormAdd: () => {}
})

export default HomeContext