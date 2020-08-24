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
import UserContext from './utils/UserContext'
import DrawerContext from './utils/DrawerContext'
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
    taskList: [],
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
    setHomeState({ ...homeState, addFormOpen: true })
  }

  appState.handleAddFormCancel = () => {
    setHomeState({ ...homeState, addTitle: "", addNotes: "", addFormOpen: false })
  }

  appState.handleEditFormOpen = () => {
    setHomeState({ ...homeState, editFormOpen: true })
  }

  appState.handleEditFormCancel = () => {
    setHomeState({ ...homeState, editTitle: "", editNotes: "", editFormOpen: false })
  }

  appState.handleAddTask = () => {
    // make sure user entered title for task
    if (appState.addTitle !== "") {
      // create new task
      let newTask = {
        user: userId,
        title: appState.addTitle,
        notes: appState.addNotes,
        isChecked: false,
        isArchived: false,
        // do not want to use 0 for priority
        // positive numbers are unarchived
        // negative numbers are archived
        priority: appState.taskList.length + 1
      }
      TaskApi.createTask(newTask)
        .then(task => {
          let taskList = [...homeState.taskList, task]
          setAppState({ ...homeState, taskList, addTitle: '', addNotes: '', addFormOpen: false })
        })
        .catch(err => console.error(err))
    }
  }

  appState.handleDeleteTask = (_id, isArchived) => event => {
    TaskApi.deleteTask(_id)
      .then(() => {
        // if task was archived, remove from archiveList and update priorities for archiveList
        if (isArchived) {
          let archiveList = homepage.archiveList
            // remove task
            .filter(task => task._id !== _id)
            // update priorities (archived tasks have negative priority)
            .map((task, index) => ({ ...task, priority: -index }))
          console.log(archiveList)
        } else {
          // else, remove from taskList and update priorities for taskList
          let taskList = homepage.taskList
            // remove task
            .filter(task => task._id !== _id)
            // update priorities
            .map((task, index) => ({ ...task, priority: index }))
          // update database priorities
          
        }
        let taskList = appState.taskList.filter(task => task._id !== _id)
        setAppState({ ...appState, taskList })
      })
      .catch(err => console.error(err))
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
      </UserContext.Provider>
    </DrawerContext.Provider>
  )
}

export default App
