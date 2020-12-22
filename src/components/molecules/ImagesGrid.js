import { Box } from '@material-ui/core'
import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import GridImage from '../atoms/GridImage'

const ImagesGrid = ({ images = [] }) => {
  const { windowWidth } = useWindowSize();

  if (images?.length === 1) {
    return <GridImage src={images[0]} />
  }

  if (images?.length === 2) {
    return (
      <Box display='flex' height='100%' width='100%'>
        <Box flex={1} height='100%' width='100%' flex={3} height={windowWidth < 768 ? 256 : 328}>
          <GridImage src={images[0]} />
        </Box>
        <Box display='flex' flexDirection='column' flex={2}>
          <GridImage src={images[1]} />
        </Box>
      </Box>
    )
  }

  return (
    <Box display='flex' height='100%' width='100%'>
      <Box flex={1} height='100%' width='100%' flex={3} height={windowWidth < 768 ? 256 : 328}>
        <GridImage src={images[0]} />
      </Box>
      <Box display='flex' flexDirection='column' flex={2}>
        {images?.slice(1)?.map(img => <Box height={windowWidth < 768 ? 128 : 164}><GridImage src={img} /></Box>)}
      </Box>
    </Box>
  )
}

export default ImagesGrid
