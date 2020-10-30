import { Badge, IconButton } from '@material-ui/core'
import React from 'react'
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import { useSelector } from 'react-redux';

const ActivityIcon = () => {
  const { unseen, loading } = useSelector(state => state.notifications)

  if (loading) {
    return (
      <AssessmentOutlinedIcon />
    )
  } else {
    return (
      <Badge badgeContent={unseen?.length} color='error'>
        <AssessmentOutlinedIcon />
      </Badge>
    )
  }
}

export default ActivityIcon
