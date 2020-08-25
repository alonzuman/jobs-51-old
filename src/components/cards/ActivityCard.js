import React from 'react'
import { Grid, Card, CardHeader, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

const ActivityCard = ({ activity }) => {
  const cardContainerStyle = {
    direction: 'rtl'
  }

  return (
    <ListItem button>
      <ListItemAvatar>
        <h1>{activity.date}</h1>
      </ListItemAvatar>
      <ListItemText
        primary={activity.description}
        secondary={activity.total}
      />
    </ListItem>
  )
}

export default ActivityCard
