import React, { useState, useContext } from 'react'
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
import HomeContext from '../../utils/HomeContext'

const AddTaskForm = () => {
  const { title, notes, handleInputChange, addFormOpen, handleAddFormOpen, handleAddFormCancel, handleAddFormAdd } = useContext(HomeContext)

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddFormOpen}
        startIcon={<AddIcon />}
      >
        New Task
      </Button>
      <Dialog open={addFormOpen} onClose={handleAddFormCancel} aria-labelledby="form-task-title">
        <DialogTitle id="form-task-title">Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new task, enter at least a title.
          </DialogContentText>
          <TextField
            autoFocus
            name="title"
            value={title}
            onChange={handleInputChange}
            margin="dense"
            label="Task Title"
            type="text"
            fullWidth
            />
          <br />
          <TextField
            name="notes"
            value={notes}
            onChange={handleInputChange}
            margin="dense"
            label="Notes"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddFormCancel} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleAddFormAdd} color="primary" variant="outlined">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddTaskForm