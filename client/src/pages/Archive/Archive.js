import React from 'react'
import TitleBanner from '../../components/TitleBanner'
import NoTasks from '../../components/NoTasks'

const Archive = () => {
  return (
    <div>
      <TitleBanner title="Archive Page" />
      <br />
      <NoTasks page="archive" />
    </div>
  )
}

export default Archive