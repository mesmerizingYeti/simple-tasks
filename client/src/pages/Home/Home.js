import React, { useState, useContext } from 'react'
import TitleBanner from '../../components/TitleBanner'
import AddTaskForm from '../../components/AddTaskForm'
import TaskDraggableList from '../../components/TaskDraggableList'
import NoTasks from '../../components/NoTasks'
import HomeContext from '../../utils/HomeContext'
import UserContext from '../../utils/UserContext'
import TaskApi from '../../utils/TaskApi'
import UserApi from '../../utils/UserApi'

// Temporary task list for development purposes
const itemList = [{
  title: 'Item 1',
  _id: '1',
  notes: 'Notes for the first item.',
  isChecked: false,
  isArchived: false,
  priority: 3
}, {
  title: 'Item 2',
  _id: '22',
  notes: 'Notes for the second item.',
  isChecked: false,
  isArchived: false,
  priority: 2
}, {
  title: 'Item 3',
  _id: '333',
  notes: 'Notes for the third item.',
  isChecked: true,
  isArchived: false,
  priority: 1
}, {
  title: 'Item 4',
  _id: '4444',
  notes: 'Notes for the fourth item.',
  isChecked: false,
  isArchived: false,
  priority: 4
}, {
  title: 'Item 5',
  _id: "55555",
  notes: "Don't mess with me!",
  isChecked: true,
  isArchived: true,
  priority: -1
}]

const Home = () => {
  const { taskList: unfilteredList, _id: userId } = useContext(UserContext)

  // Remove archived tasks and sort by priority
  const filteredList = unfilteredList.filter(task => !task.isArchived)
  const taskList = filteredList.sort((taskA, taskB) => taskA.priority - taskB.priority)

  const [homeState, setHomeState] = useState({
    taskList,
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
    setHomeState({ ...homeState, title: '', notes: '', addFormOpen: false })
  }

  homeState.handleAddFormAdd = event => {
    // make sure user entered title for task
    if (homeState.title !== "") {
      // create new task
      let newTask = {
        user: userId,
        title: homeState.title,
        notes: homeState.notes,
        isChecked: false,
        isArchived: false,
        // do not want to use 0 for priority
        // positive numbers are unarchived
        // negative numbers are archived
        priority: homeState.taskList.length + 1
      }
      TaskApi.createTask(newTask)
        .then(task => {
          let taskList = [...homeState.taskList, newTask]
          setHomeState({ ...homeState, taskList, title: '', notes: '', addFormOpen: false })
        })
        .catch(err => console.error(err))
    }
  }

  homeState.handleDeleteTask = _id => event => {
    TaskApi.deleteTask(_id)
      .then(() => {
        let taskList = homeState.taskList.filter(task => task._id !== _id)
        setHomeState({ ...homeState, taskList })
      })
      .catch(err => console.error(err))
  }

  homeState.handleArchiveTask = _id => event => {
    TaskApi.updateTask({ _id }, { isArchived: true })
      .then(() => {
        let taskList = homeState.taskList.filter(task => task._id !== _id)
        setHomeState({ ...homeState, taskList })
      })
      .catch(err => console.error(err))
  }

  return (
    <div>
      <HomeContext.Provider value={homeState}>
        <TitleBanner title="Home Page" />
        <br />
        <AddTaskForm />
        <br />
        {homeState.taskList.length === 0
          ? <NoTasks page="home" />
          : <TaskDraggableList />
        }
      </HomeContext.Provider>
    </div>
  )
}

export default Home