import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './pages/Home'
import Archive from './pages/Archive'
import Login from './pages/Login'
import UserContext from './utils/UserContext'

function App() {
  const [user, setUser] = useState({
    email: '',
    _id: '',
    jwt: ''
  })

  user.handleCreateUser = newUser => {
    setUser({ ...user, ...newUser })
  }

  return (
    <Router>
      <div>
        <UserContext.Provider value={user}>
          <Switch>
            <Route path="/archive">
              <Archive />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  )
}

export default App
