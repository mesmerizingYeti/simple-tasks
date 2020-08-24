import React, { useContext } from 'react'
import {
  Button,
  AccordionActions
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import DeleteTaskDialog from '../DeleteTaskDialog'
import AppContext from '../../utils/AppContext'

const TaskAccordionActions = props => {
  const { handleToggleArchived , handleDeleteTask } = useContext(AppContext)

  return (
    <AccordionActions>
      {props.isArchived // no editting on archive page
        ? null
        : <Button
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
      }
      <Button
        size="small"
        variant="contained"
        startIcon={props.isArchived ? <UnarchiveIcon /> : <ArchiveIcon />}
        onClick={handleToggleArchived(props._id, props.isArchived)}
      >
        Archive
      </Button>
      <DeleteTaskDialog 
        title={"Delete " + props.title} 
        _id={props._id} 
        handleDeleteTask={handleDeleteTask(props._id, props.isArchived)} 
      />
    </AccordionActions>
  )
}

export default TaskAccordionActions