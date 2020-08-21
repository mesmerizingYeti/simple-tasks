import React,
{
  useContext,
  useState
} from 'react'
import {
  withRouter,
  useHistory
} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core'
//  icons
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DrawerContext from '../../utils/DrawerContext'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  logoutButton: {
    marginRight: theme.spacing(2),
    color: "#f44336"
  },
  drawerButton: {
    color: "#f44336"
  },
  title: {
    flexGrow: 1,
  },
}))

const NavBar = withRouter(props => <NavBarGuts {...props} />)

const NavBarGuts = props => {
  const classes = useStyles()
  const history = useHistory()
  const { setDrawer } = useContext(DrawerContext)

  const handleLogout = () => {
    history.push('/auth/logout')
    history.go(0)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.drawerButton}
            color='inherit'
            aria-label="menu"
            onClick={setDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Simple Tasks
          </Typography>
          <div>
            <IconButton
              className={classes.logoutButton}
              aria-label="logout"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleLogout}
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar