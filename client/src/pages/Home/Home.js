import React from 'react'
import Typography from '@material-ui/core/Typography'
import AddTaskForm from '../../components/AddTaskForm'
import TaskDraggableList from '../../components/TaskDraggableList'

const Home = () => {

  return (
    <div>
      <Typography variant="h3">Home Page</Typography>
      <AddTaskForm />
      <TaskDraggableList />
    </div>
  )
}

export default Home