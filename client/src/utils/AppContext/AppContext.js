import { createContext } from 'react'

const AppContext = createContext({
  taskList: [],
  archiveList: [],
  addTitle: '',
  addNotes: '',
  addFormOpen: false,
  editTitle: '',
  editNotes: '',
  editFormOpen: false,
  handleInputChange: () => {},
  handleAddFormOpen: () => {},
  handleAddFormCancel: () => {},
  handleEditFormOpen: () => {},
  handleEditFormCancel: () => {},
  handleAddTask: () => {},
  handleDeleteTask: () => {},
  handleToggleArchive: () => {},
  handleToggleCheck: () => {},
})

export default AppContext