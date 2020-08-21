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
import UserContext from './utils/UserContext'
import DrawerContext from './utils/DrawerContext'
import { checkGoogleAuth } from './utils/UserAuthApi'

function App() {
  // prevent components from rendering until useEffect finishes
  const [isLoading, setIsLoading] = useState(true)
  const [userState, setUserState] = useState({
    _id: '',
    googleId: '',
    email: '',
    name: '',
    isAuthenticated: false
  })
  const [drawerState, setDrawerState] = useState({
    isOpen: false
  })

  drawerState.toggleDrawer = open => event => {
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
          setUserState({ ...userState, isAuthenticated, _id, googleId, email, name })
        }
        // finished loading user data
        setIsLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <UserContext.Provider value={userState}>
        {isLoading
          ? <div>LOADING...</div>
          : (
            <Router>
              <div>
                <UserContext.Provider value={userState}>
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
                </UserContext.Provider>
              </div>
            </Router>
          )
        }
      </UserContext.Provider>
    </div>
  )
}

export default App
