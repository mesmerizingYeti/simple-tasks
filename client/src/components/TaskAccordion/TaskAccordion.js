import React, { useContext } from 'react'
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Divider,
  Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import { makeStyles } from '@material-ui/core/styles'
import AppContext from '../../utils/AppContext'
import TaskAccordionActions from '../TaskAccordionActions'

const useStyles = makeStyles({
  taskAccordion: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  taskAccordionHandle: {
    cursor: 'move',
    cursor: '-webkit-grabbing'
  },
  formChecked: {
    textDecoration: 'line-through'
  },
  formUnchecked: {
    textDecoration: 'none'
  },
  accordion: {
    backgroundColor: "#B4B8AB",
    color: "black"
  }
})

const TaskAccordion = props => {
  const classes = useStyles()
  const { handleToggleChecked } = useContext(AppContext)

  return (
    <div className={classes.taskAccordion}>
      <Grid
        container
        wrap="nowrap"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={1}>
          <Grid container alignItems="center" justify="center">
            <Grid item>
              <UnfoldMoreIcon className={classes.taskAccordionHandle + " draggableHandle"} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={11}>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              {props.isArchived
                ? <Typography variant="body1">{props.title}</Typography>
                : (
                  <FormControlLabel
                    checked={props.isChecked}
                    className={props.isChecked ? classes.formChecked : classes.formUnchecked}
                    aria-label="Acknowledge"
                    onClick={handleToggleChecked(props._id, props.isChecked)}
                    onFocus={(event) => event.stopPropagation()}
                    control={<Checkbox color="primary" />}
                    label={props.title}
                  />
                )
              }
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography color="textSecondary">
                {props.notes}
              </Typography>
            </AccordionDetails>
            <TaskAccordionActions {...props} />
          </Accordion>
        </Grid>
      </Grid>
    </div>
  )
}

export default TaskAccordion