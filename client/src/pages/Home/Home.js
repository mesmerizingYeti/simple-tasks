import React, { useContext } from 'react'
import TitleBanner from '../../components/TitleBanner'
import AddTaskForm from '../../components/AddTaskForm'
import TaskDraggableList from '../../components/TaskDraggableList'
import NoTasks from '../../components/NoTasks'
import AppContext from '../../utils/AppContext'

// Temporary task list for development purposes
const itemList = [{
  title: 'Item 1',
  _id: '1',
  notes: 'Notes for the first item.',
  isChecked: false,
  isArchived: false,
  priority: 3
}, {
  title: 'Item 2',
  _id: '22',
  notes: 'Notes for the second item.',
  isChecked: false,
  isArchived: false,
  priority: 2
}, {
  title: 'Item 3',
  _id: '333',
  notes: 'Notes for the third item.',
  isChecked: true,
  isArchived: false,
  priority: 1
}, {
  title: 'Item 4',
  _id: '4444',
  notes: 'Notes for the fourth item.',
  isChecked: false,
  isArchived: false,
  priority: 4
}, {
  title: 'Item 5',
  _id: "55555",
  notes: "Don't mess with me!",
  isChecked: true,
  isArchived: true,
  priority: -1
}]

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