import React, { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import TaskAccordion from '../TaskAccordion'

const itemList = [{
  title: 'Item 1', 
  id: 'Item 1',
  notes: 'Notes for the first item.',
  isChecked: false,
  isArchived: false
}, {
  title: 'Item 2', 
  id: 'Item 2',
  notes: 'Notes for the second item.',
  isChecked: false,
  isArchived: false
}, {
  title: 'Item 3', 
  id: 'Item 3',
  notes: 'Notes for the third item.',
  isChecked: true,
  isArchived: false
}, {
  title: 'Item 4', 
  id: 'Item 4',
  notes: 'Notes for the fourth item.',
  isChecked: false,
  isArchived: false
}]

const TaskDraggableList = () => {
  const [tasks, setTasks] = useState(itemList)

  const setChecked = (index, setValue) => event => {
    event.stopPropagation()
    let currentTasks = [...tasks]
    currentTasks[index].isChecked = setValue
    setTasks(currentTasks)
  }

  return (
    <ReactSortable 
      list={tasks} 
      setList={setTasks}
      handle='.makeStyles-handle-2'
      animation={150}
      delayOnTouchStart={true}
      delay={2}
    >
      {tasks.map((task, index) => {
        return (
          <div key={task.id}>
            <TaskAccordion
              index={index}
              setChecked={setChecked}
              {...task} 
            />
          </div>
        )
      })}
    </ReactSortable>
  )
}

export default TaskDraggableList