import React, { useState } from 'react'
import {
  Button,
  TextField,
  TextareaAutosize,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const AddTaskForm = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        New Task
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-task-title">
        <DialogTitle id="form-task-title">Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new task, enter at least a title.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Task Title"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="notes"
            label="Notes"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddTaskForm