import React from 'react'
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

const TaskAccordion = props => {
  return (
    <div
      onDragOver={props.dragOverFunction}
      onDragStart={props.dragStartFunction}
      draggable
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label={props.title}
          />
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Typography color="textSecondary">
            {props.note}
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