import { TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import LocationSelect from '../../components/forms/profile/LocationSelect'
import ImageLightbox from '../../components/general/ImageLightbox'
import BackButton from '../../v2/atoms/BackButton'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: ${props => props.spaceBottom ? '16px' : ''};

  @media (max-width: 768px) {
    margin-top: ${props => props.spaceTop ? '64px' : ''};
  }
`

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

const TextContainer = styled.div`

`

const SecondaryContainer = styled.div`

`

const ActionsWrapper = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const PageHeader = ({ imgUrl, title, action, subtitle, secondary, backButton, spaceBottom, spaceTop, className }) => {
  const [isImageOpen, setIsImageOpen] = useState(false)
  const handleOpenImage = () => setIsImageOpen(!isImageOpen)

  return (
    <Container className={className} spaceBottom={spaceBottom} spaceTop={spaceTop}>
      <ImageLightbox
        open={isImageOpen}
        onClose={handleOpenImage}
        imgUrl={imgUrl}
      />
      <ActionsWrapper>
        {backButton && <BackButton className='mb-1' />}
        {action && action}
      </ActionsWrapper>
      <ItemsWrapper>
        <TextContainer>
          <Typography className='p-0' variant='h1'>{title}</Typography>
          <Typography variant='subtitle1'>{subtitle}</Typography>
        </TextContainer>
        <SecondaryContainer onClick={imgUrl && handleOpenImage}>
          {secondary}
        </SecondaryContainer>
      </ItemsWrapper>
    </Container>
  )
}

export default PageHeader
