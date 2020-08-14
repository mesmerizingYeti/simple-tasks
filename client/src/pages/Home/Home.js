import React from 'react'
import Typography from '@material-ui/core/Typography'
import TaskAccordion from '../../components/TaskAccordion'
import TaskDraggableList from '../../components/TaskDraggableList'

const Home = () => {

  return (
    <div>
      <Typography variant="h1">Home Page</Typography>
      <TaskDraggableList />
    </div>
  )
}

export default Home