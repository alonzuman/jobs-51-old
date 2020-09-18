import React from 'react'
import { Dialog, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import './ImageLightbox.css'

const ImageLightbox = ({ imgUrl, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton className='m-5 absolute' onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <img src={imgUrl} className='image__lightbox__image' alt={'User avatar'} />
    </Dialog>
  )
}

export default ImageLightbox
