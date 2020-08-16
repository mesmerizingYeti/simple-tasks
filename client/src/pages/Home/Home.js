import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import AddTaskForm from '../../components/AddTaskForm'
import TaskDraggableList from '../../components/TaskDraggableList'
import HomeContext from '../../utils/HomeContext'

// Temporary task list for development purposes
const itemList = [{
  title: 'Item 1', 
  id: '1',
  notes: 'Notes for the first item.',
  isChecked: false,
  isArchived: false
}, {
  title: 'Item 2', 
  id: '22',
  notes: 'Notes for the second item.',
  isChecked: false,
  isArchived: false
}, {
  title: 'Item 3', 
  id: '333',
  notes: 'Notes for the third item.',
  isChecked: true,
  isArchived: false
}, {
  title: 'Item 4', 
  id: '4444',
  notes: 'Notes for the fourth item.',
  isChecked: false,
  isArchived: false
}]

const Home = () => {
  const [homeState, setHomeState] = useState({
    taskList: itemList,
    title: '',
    notes: '',
    addFormOpen: false
  })

  homeState.handleTaskCheck = (index, setValue) => event => {
    event.stopPropagation()
    let taskList = [...homeState.taskList]
    taskList[index].isChecked = setValue
    setHomeState({ ...homeState, taskList })
  }

  homeState.setTaskList = taskList => {
    setHomeState({ ...homeState, taskList })
  }

  homeState.handleInputChange = event => {
    setHomeState({ ...homeState, [event.target.name]: event.target.value })
  }

  homeState.handleAddFormOpen = event => {
    setHomeState({ ...homeState, addFormOpen: true })
  }

  homeState.handleAddFormCancel = event => {
    setHomeState({ ...homeState, title: '', notes: '', addFormOpen: false})
  }

  homeState.handleAddFormAdd = event => {
    let newTask = { 
      title: homeState.title, 
      notes: homeState.notes, 
      id: homeState.title,
      isChecked: false,
      isArchived: false 
    }
    let taskList = [...homeState.taskList, newTask]
    setHomeState({ ...homeState, taskList, title: '', notes: '', addFormOpen: false })
  }

  homeState.handleDeleteTask = id => event => {
    let taskList = homeState.taskList.filter(task => task.id !== id)
    setHomeState({ ...homeState, taskList })
  }

  return (
    <div>
      <HomeContext.Provider value={homeState}>
        <Typography variant="h3">Home Page</Typography>
        <AddTaskForm />
        <TaskDraggableList />
      </HomeContext.Provider>
    </div>
  )
}

export default Home