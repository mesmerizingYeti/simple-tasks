import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DrawerContext from '../../utils/DrawerContext'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  logoutButton: {
    marginRight: theme.spacing(2),
    color: "white"
  },
  menuButton: {
    color: "white"
  },
  title: {
    flexGrow: 1,
  },
}))

const NavBar = () => {
  const classes = useStyles()
  const { setDrawer } = useContext(DrawerContext)

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color='inherit'
            aria-label="menu"
            onClick={setDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Simple Tasks
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  )
}

export default NavBar