import React from 'react'
import { Grid, Card, CardHeader, ListItem, ListItemAvatar, ListItemText, Chip, Box, Typography, Paper } from '@material-ui/core'

const ActivityCard = ({ activity }) => {
  const listItemStyle = {
    direction: 'rtl',
    borderRadius: '1rem',
    padding: 0
  }

  const paperStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '1rem',
    padding: '1rem',
    display: 'flex'
  }

  return (
    <ListItem style={listItemStyle} button>
      <Paper style={paperStyle} elevation={0}>
        <Box>
          <Typography variant='h2'>{activity.date}</Typography>
        </Box>
        <Box>
          <Chip label={activity.type} size='small' variant='outlined' color='primary' />
          <ListItemText
            primary={activity.description}
            secondary={activity.total}
          />
        </Box>
      </Paper>
    </ListItem>
  )
}

export default ActivityCard
