import React, { useState } from 'react'
import { Avatar, Typography } from '@material-ui/core'
import ImageLightbox from '../general/ImageLightbox'
import { Link } from 'react-router-dom'

const UserInfo = ({ user }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <ImageLightbox
        open={open}
        onClose={() => setOpen(false)}
        imgUrl={user?.avatar}
      />
      <Link to={`/users/${user.id}`}>
        <Avatar
          onClick={() => setOpen(true)}
          src={user?.avatar}
          alt={user?.firstName}
        />
        <Typography variant="body1"> {user?.firstName} {user?.lastName} </Typography>
      </Link>
    </>
  );
}

export default UserInfo
