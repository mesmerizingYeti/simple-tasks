import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import {
  makeStyles
} from '@material-ui/core/styles'
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import ArchiveIcon from '@material-ui/icons/Archive'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DrawerContext from '../../utils/DrawerContext'

const useStyles = makeStyles({
  list: {
    width: 160,
  },
  redColor : {
    color: "red"
  }
})

const NavDrawer = () => {
  const classes = useStyles()
  const history = useHistory()

  const { isOpen, setDrawer } = useContext(DrawerContext)

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={setDrawer(false)}
      onKeyDown={setDrawer(false)}
    >
      <List>
        {/* home */}
        <ListItem 
          button 
          key="home"
          onClick={() =>{
            history.push('/home')
            history.go(0)
          }}
        >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        {/* archive */}
        <ListItem 
          button 
          key="archive"
          onClick={() =>{
            history.push('/archive')
            history.go(0)
          }}
        >
          <ListItemIcon><ArchiveIcon /></ListItemIcon>
          <ListItemText primary={"Archive"} />
        </ListItem>
        <Divider />
        {/* logout */}
        <ListItem 
          button 
          key="logout"
          onClick={() =>{
            history.push('/auth/logout')
            history.go(0)
          }}
        >
          <ListItemIcon className={classes.redColor}><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary={"Logout"} className={classes.redColor} />
        </ListItem>

      </List>
    </div>
  )

  return (
    <SwipeableDrawer
      open={isOpen}
      onClose={setDrawer(false)}
      onOpen={setDrawer(true)}
    >
      {sideList()}
    </SwipeableDrawer>
  )
}

export default NavDrawer