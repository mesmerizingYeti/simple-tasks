import React, { useContext } from 'react'
import {
  Button,
  AccordionActions
} from '@material-ui/core'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import EditTaskForm from '../EditTaskForm'
import DeleteTaskDialog from '../DeleteTaskDialog'
import AppContext from '../../utils/AppContext'

const TaskAccordionActions = props => {
  const { handleToggleArchived } = useContext(AppContext)

  return (
    <AccordionActions>
      {props.isArchived // no editting on archive page
        ? null
        : <EditTaskForm _id={props._id} title={props.title} notes={props.notes} />
      }
      <Button
        size="small"
        variant="contained"
        startIcon={props.isArchived ? <UnarchiveIcon /> : <ArchiveIcon />}
        onClick={() => {
          handleToggleArchived(props._id, props.isArchived)
        }}
      >
        Archive
      </Button>
      <DeleteTaskDialog 
        title={"Delete " + props.title} 
        _id={props._id} 
        idArchived={props.isArchived}
      />
    </AccordionActions>
  )
}

export default TaskAccordionActions