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

function App() {
  // state for preventing components from rendering until useEffect finishes
  const [isLoading, setIsLoading] = useState(true)

  // store user data
  const [userState, setUserState] = useState({
    _id: '',
    googleId: '',
    email: '',
    name: '',
    isAuthenticated: false
  })

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
          setUserState({ ...userState, isAuthenticated, _id, googleId, email, name })
        }
        // finished loading user data
        setIsLoading(false)
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
