import { createContext } from 'react'

const AppContext = createContext({
  homeList: [],
  archiveList: [],
  addTitle: '',
  addNotes: '',
  addFormOpen: false,
  editTitle: '',
  editOriginalTitle: '',
  editNotes: '',
  editId: 0,
  editFormOpen: false,
  handleInputChange: () => {},
  handleAddFormOpen: () => {},
  handleAddFormCancel: () => {},
  handleEditFormOpen: () => {},
  handleEditFormCancel: () => {},
  handleAddTask: () => {},
  handleUpdateTask: () => {},
  handleDeleteTask: () => {},
  handleToggleArchived: () => {},
  handleToggleChecked: () => {},
  setHomeList: () => {},
  setArchiveList: () => {},
})

export default AppContext