import React, { useState } from 'react'
import { Avatar, Typography } from '@material-ui/core'
import ImageLightbox from '../general/ImageLightbox'

const UserInfo = ({ user }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <ImageLightbox open={open} onClose={() => setOpen(false)} imgUrl={user?.avatar} />
      <Avatar onClick={() => setOpen(true)} src={user?.avatar} alt={user?.firstName} />
      <Typography variant='body1'>{user?.firstName}</Typography>
    </>
  )
}

export default UserInfo
