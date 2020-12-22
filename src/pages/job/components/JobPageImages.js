import { Divider } from '@material-ui/core'
import React from 'react'
import PageSection from '../../../components/atoms/PageSection'
import PageSectionTitle from '../../../components/atoms/PageSectionTitle'
import ImagesGrid from '../../../components/molecules/ImagesGrid'
import useTheme from '../../../hooks/useTheme'

const JobPageImages = ({ images = [] }) => {
  const { translation } = useTheme();

  if (images?.length !== 0) {
    return (
      <PageSection>
        <Divider className='mb-1' />
        <PageSectionTitle title={images.length === 1 ? translation.image : translation.images} />
        <ImagesGrid images={images} />
        <br />
      </PageSection>
    )
  }

  return null;
}

export default JobPageImages
