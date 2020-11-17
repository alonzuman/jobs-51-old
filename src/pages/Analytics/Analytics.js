import { Button } from '@material-ui/core'
import React from 'react'
import { fixStats, fixUserActivityHoursCount } from '../../utils/db'

const Analytics = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* <Button onClick={fixStats}>Fix Stats</Button> */}
      <Button onClick={fixUserActivityHoursCount}>Fix Activities Count</Button>
    </div>
  )
}

export default Analytics
