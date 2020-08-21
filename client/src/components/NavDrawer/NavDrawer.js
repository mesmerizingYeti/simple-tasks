import React,
{ useContext } from 'react'
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
  makeStyles
} from '@material-ui/core/styles'
import {
  SwipeableDrawer,
  List,
  ListItem,
  Grid,
  Typography
} from '@material-ui/core'
//  icons
import HomeIcon from '@material-ui/icons/Home'
import ArchiveIcon from '@material-ui/icons/Archive'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DrawerContext from '../../utils/DrawerContext'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
    color: '#424242',
    textDecorationLine: 'none'
  },
  logout: {
    color: 'red',
    textDecorationLine: 'none'
  },
  gridItem: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  },
  typography: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  }
})

const NavDrawer = withRouter(props => <NavDrawerGuts {...props} />)

const NavDrawerGuts = props => {
  const classes = useStyles()

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
        <Link to="/home" className={classes.link}>
          <ListItem button key={'Home'}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <HomeIcon />
              </Grid>
              <Grid item xs={8} className={classes.gridItem}>
                <Typography
                  className={classes.typography}
                  component="span">
                  Home
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </Link>
        {/* archive */}
        <Link to="/archive" className={classes.link}>
          <ListItem button key={'Archive'}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <ArchiveIcon />
              </Grid>
              <Grid item xs={8} className={classes.gridItem}>
                <Typography
                  className={classes.typography}
                  component="span">
                  Archive
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </Link>
        {/* logout */}
        <Link to="/auth/logout" className={classes.logout}>
          <ListItem button key={'Logout'}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <ExitToAppIcon />
              </Grid>
              <Grid item xs={8} className={classes.gridItem}>
                <Typography
                  className={classes.typography}
                  component="span">
                  Logout
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </Link>
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