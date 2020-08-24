import { createContext } from 'react'

const AppContext = createContext({
  homeList: [],
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
  handleToggleArchived: () => {},
  handleToggleChecked: () => {},
})

export default AppContext