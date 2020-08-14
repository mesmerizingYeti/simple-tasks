import React, { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import TaskAccordion from '../TaskAccordion'

const itemList = [{
  title: 'Item 1', 
  notes: 'Notes for the first item.'
}, {
  title: 'Item 2', 
  notes: 'Notes for the second item.'
}, {
  title: 'Item 3', 
  notes: 'Notes for the third item.'
}, {
  title: 'Item 4', 
  notes: 'Notes for the fourth item.'
}]

const AccordionDraggableList = () => {
  const [tasks, setTasks] = useState(itemList)

  return (
    <ReactSortable list={tasks} setList={setTasks}>
      {tasks.map(task => (
        <div key={task.title}>
          <TaskAccordion
            {...task} 
          />
        </div>
      ))}
    </ReactSortable>
  )
}

export default AccordionDraggableList