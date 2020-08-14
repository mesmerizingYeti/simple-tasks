import React, { useState } from 'react'
import {
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
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
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
    <div>
      <Accordion className={props.checked ? classes.accordionChecked : classes.accordionUnchecked}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            checked={props.checked}
            className={props.checked ? classes.formChecked : classes.formUnchecked}
            aria-label="Acknowledge"
            onClick={props.setChecked(props.index, !props.checked)}
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
          <Button size="small" variant="contained" color="primary">Edit</Button>
          <Button size="small" variant="contained">Archive</Button>
          <Button size="small" variant="contained" color="secondary">Delete</Button>
        </AccordionActions>
      </Accordion>
    </div>
  )
}

export default TaskAccordion