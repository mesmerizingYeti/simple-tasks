import React, { useContext } from 'react'
import { ReactSortable } from 'react-sortablejs'
import TaskAccordion from '../TaskAccordion'
import AppContext from '../../utils/AppContext'


const TaskDraggableList = props => {
  const { 
    homeList, 
    archiveList, 
    handleToggleChecked, 
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
        updateDatabase(props.page === "home" ? homeList : archiveList)
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
                toggleChecked={handleToggleChecked}
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