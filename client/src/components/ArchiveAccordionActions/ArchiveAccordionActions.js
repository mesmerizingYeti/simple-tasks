import React, { useContext } from 'react'
import UnarchiveIcon from '@material-ui/icons/Unarchive'

// Need to add ArchiveContext and import

const ArchiveAccordionActions = props => {
  return (
    <>
      <Button
        size="small"
        variant="contained"
        startIcon={<UnarchiveIcon />}
        onClick={handleUnarchiveTask(props._id)}
      >
        Unarchive
      </Button>
      <DeleteTaskDialog 
        title={"Delete " + props.title} 
        _id={props._id} 
      />
    </>
  )
}

export default ArchiveAccordionActions