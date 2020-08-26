import React from 'react'
import { 
  Paper,
  Typography 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  titlePaper: {
    backgroundColor: "#B4B8AB",
    textAlign: "center",
    padding: '0.5rem'
  }
})

const TitleBanner = props => {
  const classes = useStyles()

  return (
    <Paper className={classes.titlePaper}>
      <Typography variant="h3">{props.title}</Typography>
    </Paper>
  )
}

export default TitleBanner