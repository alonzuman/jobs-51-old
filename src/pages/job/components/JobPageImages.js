import { Divider } from '@material-ui/core'
import React from 'react'
import PageSection from '../../../components/atoms/PageSection'
import PageSectionTitle from '../../../components/atoms/PageSectionTitle'
import ImagesGrid from '../../../components/molecules/ImagesGrid'
import useTheme from '../../../hooks/useTheme'

const mockImages = [
  // "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  // "https://images.unsplash.com/photo-1608607261815-84bcae9cad8f?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  // "https://images.unsplash.com/photo-1608552938503-9211bf554f22?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
]

const JobPageImages = ({ images = [] }) => {
  const { translation } = useTheme();

  if (mockImages?.length !== 0) {
    return (
      <PageSection>
        <Divider className='mb-1' />
        <PageSectionTitle title={mockImages.length === 1 ? translation.image : translation.images} />
        <ImagesGrid images={mockImages} />
        <br />
      </PageSection>
    )
  }

  return null;
}

export default JobPageImages
