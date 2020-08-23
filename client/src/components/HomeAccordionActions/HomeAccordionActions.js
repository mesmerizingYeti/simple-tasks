import React, { useContext } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import ArchiveIcon from '@material-ui/icons/Archive'
import HomeContext from '../../utils/HomeContext'

const HomeAccordionActions = props => {
  const { handleArchiveTask, handleDeleteTask } = useContext(HomeContext)

  return (
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
      <DeleteTaskDialog 
        title={"Delete " + props.title} 
        _id={props._id} 
        handleDeleteTask={handleDeleteTask} 
      />
    </>
  )
}

export default HomeAccordionActions