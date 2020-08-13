import React from 'react'
import Typography from '@material-ui/core/Typography'
import TaskAccordion from '../../components/TaskAccordion'

const Home = () => {

  const onDragOver = (event) => {event.preventDefault()}
  const onDragStart = (event) => {console.log('starting to drag')}

  return (
    <div>
      <Typography variant="h1">Home Page</Typography>
      <TaskAccordion 
        title="ACCORDION 1" 
        note="This is a note for the task that needs to be completed!"
        dragOverFunction={onDragOver}
        dragStartFunction={onDragStart}
      />
    </div>
  )
}

export default Home