import React, { useContext } from 'react'
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  FormControlLabel,
  Checkbox,
  Divider,
  Typography,
  Button
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import EditIcon from '@material-ui/icons/Edit'
import ArchiveIcon from '@material-ui/icons/Archive'
import { makeStyles } from '@material-ui/core/styles'
import DeleteTaskDialog from '../DeleteTaskDialog'
import HomeContext from '../../utils/HomeContext'

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
  const { handleArchiveTask } = useContext(HomeContext)

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
              <UnfoldMoreIcon className={classes.taskAccordionHandle} />
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
                ? <div>{props.title}</div>
                : (
                  <FormControlLabel
                    checked={props.isChecked}
                    className={props.isChecked ? classes.formChecked : classes.formUnchecked}
                    aria-label="Acknowledge"
                    onClick={props.setChecked(props.index, !props.isChecked)}
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
            <AccordionActions>
              {props.isArchived
                ? (
                  <>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<ArchiveIcon />}
                      onClick={handleUnarchiveTask(props._id)}
                    >
                      Unarchive
                    </Button>
                  </>
                )
                : (
                  <>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        // Add edit task dialog
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<ArchiveIcon />}
                      onClick={handleArchiveTask(props._id)}
                    >
                      Archive
                    </Button>
                  </>
                )
              }
              <DeleteTaskDialog title={"Delete " + props.title} _id={props._id} />
            </AccordionActions>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  )
}

export default TaskAccordion