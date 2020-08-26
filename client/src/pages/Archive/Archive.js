import React, { useContext } from 'react'
import TitleBanner from '../../components/TitleBanner'
import TaskDraggableList from '../../components/TaskDraggableList'
import NoTasks from '../../components/NoTasks'
import AppContext from '../../utils/AppContext'

const Archive = () => {
  const { archiveList } = useContext(AppContext)

  return (
    <div>
      <TitleBanner title="Archive Page" />
      <br />
      {archiveList.length === 0
        ? <NoTasks page="archive" />
        : <TaskDraggableList page="archive" />
      }
    </div>
  )
}

export default Archive