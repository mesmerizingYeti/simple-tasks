import React from 'react'
import Typography from '@material-ui/core/Typography'
import TaskAccordion from '../../components/TaskAccordion'
import AccordionDraggableList from '../../components/AccordionDraggableList'

const Home = () => {

  return (
    <div>
      <Typography variant="h1">Home Page</Typography>
      <AccordionDraggableList />
    </div>
  )
}

export default Home