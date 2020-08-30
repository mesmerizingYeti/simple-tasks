import React, { useContext } from 'react'
import TitleBanner from '../../components/TitleBanner'
import AddTaskForm from '../../components/AddTaskForm'
import TaskDraggableList from '../../components/TaskDraggableList'
import NoTasks from '../../components/NoTasks'
import AppContext from '../../utils/AppContext'

const Home = () => {
  const { homeList } = useContext(AppContext)

  return (
    <div>
      <TitleBanner title="Home Page" />
      <br />
      <AddTaskForm />
      <br />
      {homeList.length === 0
        ? <NoTasks page="home" />
        : <TaskDraggableList page="home" />
      }
    </div>
  )
}

export default Home