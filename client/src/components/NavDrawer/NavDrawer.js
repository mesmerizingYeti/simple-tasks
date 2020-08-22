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
  ListItemText
} from '@material-ui/core'
//  icons
import HomeIcon from '@material-ui/icons/Home'
import ArchiveIcon from '@material-ui/icons/Archive'
import DrawerContext from '../../utils/DrawerContext'

const useStyles = makeStyles({
  list: {
    width: 160,
  },
})

const NavDrawer = props => {
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