import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './pages/Home'
import Archive from './pages/Archive'
import SignIn from './pages/SignIn'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/archive">
            <Archive />
          </Route>
          <Route path="/SignIn">
            <SignIn />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
