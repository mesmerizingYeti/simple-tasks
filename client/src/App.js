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
    editNotes: '',
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

  appState.handleEditFormOpen = () => {
    setAppState({ ...appState, editFormOpen: true })
  }

  appState.handleEditFormCancel = () => {
    setAppState({ ...appState, editTitle: "", editNotes: "", editFormOpen: false })
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
        .then(task => {
          let homeList = [...appState.homeList, task]
          setAppState({ ...appState, homeList, addTitle: '', addNotes: '', addFormOpen: false })
        })
        .catch(err => console.error(err))
    }
  }

  // helper function for handleDeleteTask and handleToggleArchived
  const removeTaskAndUpdate = async (list, _id, isArchived) => {
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
      const dataList = updatedList.map(task => ({ _id: task._id, value: { priority: task.priority} }))
      TaskApi.updateTasks(dataList)
        // return updated list if successful
        .then(() => resolve(updatedList))
        // else return error
        .catch(err => reject(err))
    })

    return promise
  }

  appState.handleDeleteTask = (_id, isArchived) => event => {
    const list = isArchived ? appState.archiveList : appState.homeList
    TaskApi.deleteTask(_id)
      .then(() => removeTaskAndUpdate(list, _id, isArchived))
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
    TaskApi.updateTask(_id, { isArchived: !wasArchived, priority })
      .then(() => {
        let newList = wasArchived ? appState.homeList : appState.archiveList
        let oldList = wasArchived ? appState.archiveList : appState.homeList
        // grab task and add to new list
        const task = oldList.find(task => task._id === _id)
        newList.push(task)
        removeTaskAndUpdate(oldList, _id, wasArchived)
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
    // check if user has been authenticated
    checkGoogleAuth()
      .then(({ data }) => {
        const { isAuthenticated, user } = data
        // user has value if isAuthenticated is true
        if (isAuthenticated) {
          const { _id, googleId, email, name } = user
          // need to get populated taskList
          TaskApi.getUserTasks()
            .then(({ data: taskList }) => {
              setUserState({ ...userState, isAuthenticated, _id, googleId, email, name, taskList })
              // set up homeList and archiveList in appState
              const homeList = taskList.filter(task => !task.isArchived)
              const archiveList = taskList.filter(task => task.isArchived)
              setAppState({ ...appState, homeList, archiveList })
              // finished loading user data
              setIsLoading(false)
            })
            .catch(err => console.log(err))
        } else {
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
                          : <Redirect to="/" />
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
