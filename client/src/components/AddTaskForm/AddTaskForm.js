import React, { useContext } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import AppContext from '../../utils/AppContext'

const AddTaskForm = () => {
  const { addTitle, addNotes, handleInputChange, addFormOpen, handleAddFormOpen, handleAddFormCancel, handleAddTask } = useContext(AppContext)

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddFormOpen}
        startIcon={<AddIcon />}
      >
        Add Task
      </Button>
      <Dialog open={addFormOpen} onClose={handleAddFormCancel} aria-labelledby="form-task-title">
        <DialogTitle id="form-task-title">Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter at least a title.
          </DialogContentText>
          <TextField
            autoFocus
            name="addTitle"
            value={addTitle}
            onChange={handleInputChange}
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            />
          <br />
          <TextField
            name="addNotes"
            value={addNotes}
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
          <Button onClick={handleAddTask} color="primary" variant="outlined">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddTaskForm