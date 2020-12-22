import React, { useState } from 'react'
import styled from 'styled-components'
import ImageLightbox from '../layout/ImageLightbox';

const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  max-height: 328px;
  transition: all .15s ease-in-out;
  border-radius: 16px;
  padding: 4px;
  cursor: pointer;

  &:hover {
    filter: brightness(.9);
  }
`

const GridImage = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <ImageLightbox open={isOpen} imgUrl={src} onClose={handleClose} />
      <Image src={src} alt={alt} onClick={handleClick} />
    </>
  )
}

export default GridImage
