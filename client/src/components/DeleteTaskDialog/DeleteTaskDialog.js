import React, { useState, useContext } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AppContext from '../../utils/AppContext'

const DeleteTaskDialog = props => {
  const { handleDeleteTask } = useContext(AppContext)

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteClick = () => {
    setOpen(false)
    handleDeleteTask(props._id, props.isArchived)
  }

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-task-title">
        <DialogTitle id="form-task-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button onClick={deleteClick} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteTaskDialog