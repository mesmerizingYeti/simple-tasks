import React, { useState, useContext } from 'react'
import { ReactSortable } from 'react-sortablejs'
import TaskAccordion from '../TaskAccordion'
import HomeContext from '../../utils/HomeContext'


const TaskDraggableList = () => {
  const { taskList, handleTaskCheck, setTaskList } = useContext(HomeContext)

  return (
    <ReactSortable 
      list={taskList} 
      setList={setTaskList}
      handle='.makeStyles-handle-2'
      animation={150}
      delayOnTouchStart={true}
      delay={2}
    >
      {taskList.map((task, index) => {
        return (
          <div key={task.id}>
            <TaskAccordion
              index={index}
              setChecked={handleTaskCheck}
              {...task} 
            />
          </div>
        )
      })}
    </ReactSortable>
  )
}

export default TaskDraggableList