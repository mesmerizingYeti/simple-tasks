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
import { checkGoogleAuth } from './utils/UserAuthApi'

function App() {
  const [userState, setUserState] = useState({
    _id: '',
    googleId: '',
    email: '',
    name: '',
    isAuthenticated: false
  })
  // prevent components from rendering until useEffect finishes
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // check if user has been authenticated
    checkGoogleAuth()
      .then(({ data }) => {
        const { isAuthenticated, user } = data
        // user has value if isAuthenticated is true
        if (success) {
          const { _id, googleId, email, name } = user
          setUserState({ ...userState, isAuthenticated, _id, googleId, email, name })
        }
        // finished loading user data
        setLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <UserContext.Provider value={userState}>
      {isLoading
        ? <div>LOADING...</div>
        : (
          <Router>
            <div>
              <UserContext.Provider value={user}>
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
  )
}

export default App
