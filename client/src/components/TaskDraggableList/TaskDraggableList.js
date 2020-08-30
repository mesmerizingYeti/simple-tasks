import React, { useContext } from 'react'
import { ReactSortable } from 'react-sortablejs'
import TaskAccordion from '../TaskAccordion'
import AppContext from '../../utils/AppContext'


const TaskDraggableList = props => {
  const { 
    homeList, 
    archiveList, 
    updateDatabase,
    setHomeList, 
    setArchiveList 
  } = useContext(AppContext)

  return (
    <ReactSortable 
      list={props.page === "home" ? homeList : archiveList} 
      setList={props.page === "home" ? setHomeList : setArchiveList}
      handle='.draggableHandle'
      animation={150}
      delayOnTouchStart={true}
      delay={2}
      onEnd={() => 
        updateDatabase(
          props.page === "home" ? homeList : archiveList, 
          props.page === "home" ? false : true
        )
          .then(() => console.log('Updated database successfully'))
          .catch(err => console.error(err))
      }
    >
      {(props.page === "home" ? homeList : archiveList)
        .map((task, index) => {
          return (
            <div key={task._id}>
              <TaskAccordion
                index={index}
                {...task} 
              />
            </div>
          )
        })
      }
    </ReactSortable>
  )
}

export default TaskDraggableList