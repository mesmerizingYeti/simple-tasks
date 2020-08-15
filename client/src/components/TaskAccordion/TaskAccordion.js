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
import DeleteIcon from '@material-ui/icons/Delete'
import ArchiveIcon from '@material-ui/icons/Archive'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem'
  },
  handle: {
    cursor: 'move',
    cursor: '-webkit-grabbing'
  },
  grid: {
    display: 'flex'
  },
  formChecked: {
    textDecoration: 'line-through'
  },
  formUnchecked: {
    textDecoration: 'none'
  },
  accordionChecked: {

  },
  accordionUnchecked: {

  }
})

const TaskAccordion = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid
        contianer
        wrap="nowrap"
        alignItems="center"
        justify="center"
        className={classes.grid}
      >
        <Grid item xs={1}>
          <Grid container alignItems="center" justify="center">
            <Grid item>
              <UnfoldMoreIcon className={classes.handle} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={11}>
          <Accordion className={props.isChecked ? classes.accordionChecked : classes.accordionUnchecked}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              <FormControlLabel
                checked={props.isChecked}
                className={props.isChecked ? classes.formChecked : classes.formUnchecked}
                aria-label="Acknowledge"
                onClick={props.setChecked(props.index, !props.isChecked)}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox />}
                label={props.title}
              />
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography color="textSecondary">
                {props.notes}
              </Typography>
            </AccordionDetails>
            <AccordionActions>
              <Button 
                size="small" 
                variant="contained" 
                color="primary"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button 
                size="small" 
                variant="contained"
                startIcon={<ArchiveIcon />}
              >
                Archive
              </Button>
              <Button 
                size="small" 
                variant="contained" 
                color="secondary"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </AccordionActions>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  )
}

export default TaskAccordion