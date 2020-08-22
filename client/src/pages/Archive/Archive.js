import React from 'react';
import Typography from '@material-ui/core/Typography'
import NoTasks from '../../components/NoTasks'

const Archive = () => {
  return (
    <div>
      <Typography variant="h3">Archive Page</Typography>
      <NoTasks page="archive" />
    </div>
  )
}

export default Archive