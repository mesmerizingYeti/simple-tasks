import React, { useContext, useEffect } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import AppContext from '../../utils/AppContext'

const EditTaskForm = props => {
  const { 
    editTitle, 
    editNotes, 
    editFormOpen, 
    handleInputChange, 
    handleEditFormOpen, 
    handleEditFormCancel, 
    handleUpdateTask 
  } = useContext(AppContext)

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={handleEditFormOpen(props.title, props.notes)}
        startIcon={<EditIcon />}
      >
        Edit Task
      </Button>
      <Dialog open={editFormOpen} onClose={handleEditFormCancel} aria-labelledby="edit-form-task-title">
        <DialogTitle id="edit-form-task-title">
          {`Edit ${props.title}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make sure to save any changes you make!
          </DialogContentText>
          <TextField
            autoFocus
            name="editTitle"
            value={editTitle}
            onChange={handleInputChange}
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            />
          <br />
          <TextField
            name="editNotes"
            value={editNotes}
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
          <Button onClick={handleEditFormCancel} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleUpdateTask(props._id)} color="primary" variant="outlined">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditTaskForm