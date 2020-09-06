import React from 'react'
import { Dialog, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

const ImageLightbox = ({ imgUrl, open, onClose }) => {
  const iconStyle = {
    position: 'absolute',
    margin: '.5rem'
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton onClick={onClose} style={iconStyle}>
        <CloseIcon />
      </IconButton>
      <img src={imgUrl} className='image__lightbox__image' />
    </Dialog>
  )
}

export default ImageLightbox
