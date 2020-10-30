import React from 'react'
import { Dialog, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'

const Image = styled.img`
  min-width: 220px!important;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImageLightbox = ({ imgUrl, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton className='m-5 absolute' onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <Image src={imgUrl} className='image__lightbox__image' alt={'User avatar'} />
    </Dialog>
  )
}

export default ImageLightbox
