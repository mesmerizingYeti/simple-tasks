import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Home from './pages/Home'
import Archive from './pages/Archive'
import Login from './pages/Login'
import NavDrawer from './components/NavDrawer'
import NavBar from './components/NavBar'
import DrawerContext from './utils/DrawerContext'
import UserContext from './utils/UserContext'
import AppContext from './utils/AppContext'
import { checkGoogleAuth } from './utils/UserAuthApi'
import TaskApi from './utils/TaskApi'

function App() {
  // state for preventing components from rendering until useEffect finishes
  const [isLoading, setIsLoading] = useState(true)

  // store user data
  const [userState, setUserState] = useState({
    _id: '',
    googleId: '',
    email: '',
    name: '',
    taskList: [],
    isAuthenticated: false
  })

  // app data and functions
  const [appState, setAppState] = useState({
    homeList: [],
    archiveList: [],
    addTitle: '',
    addNotes: '',
    addFormOpen: false,
    editTitle: '',
    editOriginalTitle: '',
    editNotes: '',
    editId: 0,
    editFormOpen: false
  })

  appState.handleInputChange = event => {
    setAppState({ ...appState, [event.target.name]: event.target.value })
  }

  appState.handleAddFormOpen = () => {
    setAppState({ ...appState, addFormOpen: true })
  }

  appState.handleAddFormCancel = () => {
    setAppState({ ...appState, addTitle: "", addNotes: "", addFormOpen: false })
  }

  appState.handleEditFormOpen = (editTitle, editNotes, editId) => event => {
    setAppState({ 
      ...appState, 
      editTitle, 
      editOriginalTitle: editTitle, 
      editNotes, 
      editId, 
      editFormOpen: true 
    })
  }

  appState.handleEditFormCancel = () => {
    setAppState({ ...appState, editTitle: "", editOriginalTitle: "", editNotes: "", editFormOpen: false })
  }

  appState.handleAddTask = event => {
    // make sure user entered title for task
    if (appState.addTitle !== "") {
      // create new task
      let newTask = {
        user: userState._id,
        title: appState.addTitle,
        notes: appState.addNotes,
        isChecked: false,
        isArchived: false,
        // do not want to use 0 for priority
        // positive numbers are unarchived
        // negative numbers are archived
        priority: appState.homeList.length + 1
      }
      TaskApi.createTask(newTask)
        .then(({ data: task }) => {
          let homeList = [...appState.homeList, task]
          setAppState({ ...appState, homeList, addTitle: '', addNotes: '', addFormOpen: false })
        })
        .catch(err => console.error(err))
    }
  }

  appState.handleUpdateTask = event => {
    // update task on database
    TaskApi.updateTask({ _id: appState.editId, title: appState.editTitle, notes: appState.editNotes })
      .then(() => {
        // update task locally
        let homeList = appState.homeList.map(task => {
          if (task._id === appState.editId) {
            return { ...task, title: appState.editTitle, notes: appState.editNotes }
          }
          return task
        })
        setAppState({ ...appState, homeList, editTitle: '', editOriginalTitle: '', editNotes: '', editFormOpen: false })
      })
      .catch(err => console.error(err))
  }

  // helper functions for appState functions
  const removeTask = async (list, _id, isArchived) => {
    let promise = new Promise((resolve, reject) => {
      // archived tasks have negative priority
      const sign = isArchived ? -1 : 1
      let updatedList = list
        // remove task from list
        .filter(task => task._id !== _id)
        // update priorities in list
        // not using 0 as a priority
        .map((task, index) => ({ ...task, priority: sign * (index + 1) }))
      // update database
      resolve(updatedList)
    })

    return promise
  }

  appState.handleDeleteTask = (_id, isArchived) => event => {
    const list = isArchived ? appState.archiveList : appState.homeList
    TaskApi.deleteTask(_id)
      .then(() => removeTask(list, _id, isArchived))
      .then(updatedList => appState.updateDatabase(updatedList, isArchived))
      .then(updatedList => {
        // update correct list in appState
        if (isArchived) {
          setAppState({ ...appState, archiveList: updatedList })
        } else {
          setAppState({ ...appState, homeList: updatedList })
        }
      })
      .catch(err => console.error(err))
  }

  // changing task from isArchived to !isArchived
  appState.handleToggleArchived = (_id, wasArchived) => event => {
    // put task at end of new list
    // not using 0 as a priority
    const priority = wasArchived ? appState.homeList.length + 1 : -(appState.archiveList.length + 1)
    TaskApi.updateTask({ _id, isArchived: !wasArchived, priority })
      .then(() => {
        let newList = wasArchived ? appState.homeList : appState.archiveList
        let oldList = wasArchived ? appState.archiveList : appState.homeList
        // grab task and add to new list
        const task = oldList.find(task => task._id === _id)
        newList.push(task)
        removeTask(oldList, _id, wasArchived)
          .then(updatedList => appState.updateDatabase(updatedList, wasArchived))
          .then(updatedList => {
            // update correct list in appState
            if (wasArchived) {
              setAppState({ ...appState, archiveList: updatedList })
            } else {
              setAppState({ ...appState, homeList: updatedList })
            }
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  }

  // changing task from isChecked to !isChecked
  // only tasks in homeList can have checked be toggled
  appState.handleToggleChecked = (_id, wasChecked) => event => {
    // udpate database first
    TaskApi.updateTask(_id, { isChecked: !wasChecked })
      .then(() => {
        const updatedList = appState.homeList.map(task => {
          // only update task with _id
          if (task._id !== _id) return task
          return { ...task, isChecked: !wasChecked }
        })
        // update appState
        setAppState({ ...appState, homeList: updatedList })
      })
      .catch(err => console.error(err))
  }

  // update priorities of tasks in list on database
  appState.updateDatabase = async (list, isArchived) => {
    let promise = new Promise((resolve, reject) => {
      // only pass the server the changed information
      const dataList = list.map((task, index) => { 
        const sign = isArchived ? -1 : 1
        const newPriority = sign * (index + 1)
        return {_id: task._id, value: { priority: newPriority }}
      })
      // update database
      TaskApi.updateTasks(dataList)
        // return list if successful
        .then(() => resolve(list))
        .catch(err => reject(err))
    })

    return promise
  }

  // these functions are needed for ReactSortable to work
  appState.setHomeList = homeList => {
    setAppState({ ...appState, homeList })
  }

  appState.setArchiveList = archiveList => {
    setAppState({ ...appState, archiveList })
  }

  // control NavDrawer
  const [drawerState, setDrawerState] = useState({
    isOpen: false
  })
  // set NavDrawer state
  drawerState.setDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setDrawerState({ ...drawerState, isOpen: open })
  }

  useEffect(() => {
    console.log('checking user authentication')
    // check if user has been authenticated
    checkGoogleAuth()
      .then(({ data }) => {
        const { isAuthenticated, user } = data
        // user has value if isAuthenticated is true
        if (isAuthenticated) {
          console.log('user is authenticated')
          const { _id, googleId, email, name } = user
          // need to get populated taskList
          TaskApi.getUserTasks()
            .then(({ data: taskList }) => {
              console.log('got user tasks and setting state')
              setUserState({ ...userState, isAuthenticated, _id, googleId, email, name, taskList })
              // set up homeList and archiveList in appState
              const homeList = taskList.filter(task => !task.isArchived).sort((a, b) => a.priority - b.priority)
              const archiveList = taskList.filter(task => task.isArchived).sort((a, b) => b.priority - a.priority)
              setAppState({ ...appState, homeList, archiveList })
              console.log('finished loading')
              // finished loading user data
              setIsLoading(false)
            })
            .catch(err => console.error(err))
        } else {
          console.log('user is not authenticated')
          // nothing to load
          setIsLoading(false)
        }
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <DrawerContext.Provider value={drawerState}>
      <UserContext.Provider value={userState}>
        <AppContext.Provider value={appState}>
          {isLoading
            ? <div>LOADING...</div>
            : (
              <div>
                <Router>
                  <div>
                    {userState.isAuthenticated
                      ? (
                        <>
                          <NavDrawer />
                          <NavBar />
                        </>
                      )
                      : null
                    }
                    <Switch>
                      <Route path="/archive">
                        {userState.isAuthenticated
                          ? <Archive />
                          : null
                        }
                      </Route>
                      <Route path="/home">
                        {userState.isAuthenticated
                          ? <Home />
                          : <Redirect to="/" />
                        }
                      </Route>
                      <Route exact path="/">
                        {userState.isAuthenticated
                          ? <Redirect to="/home" />
                          : <Login />
                        }
                      </Route>
                    </Switch>
                  </div>
                </Router>
              </div>
            )
          }
        </AppContext.Provider>
      </UserContext.Provider>
    </DrawerContext.Provider>
  )
}

export default App
