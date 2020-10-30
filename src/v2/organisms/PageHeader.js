import { Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useState } from 'react'
import styled from 'styled-components'
import ImageLightbox from '../../components/general/ImageLightbox'
import BackButton from '../../v2/atoms/BackButton'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: ${props => props.spaceBottom ? '16px' : ''};

  @media (max-width: 768px) {
    margin-top: ${props => props.spaceTop ? '48px' : '0'};
  }
`

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: 16px;
  height: 58px;
`

const TextContainer = styled.div`

`

const SecondaryContainer = styled.div`

`

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
`

const PageHeader = ({ loading, imgUrl, title, titleClassName = '', titleVariant = 'h1', action, subtitle, secondary, backButton, className, backLink }) => {
  const [isImageOpen, setIsImageOpen] = useState(false)
  const handleOpenImage = () => setIsImageOpen(!isImageOpen)

  if (loading) {
    return (
      <Container className={className} spaceTop spaceBottom>
        <Skeleton width={128} height={32} />
      </Container>
    )
  } else {
    return (
      <Container className={className} spaceTop={!backButton}>
        <ImageLightbox
          open={isImageOpen}
          onClose={handleOpenImage}
          imgUrl={imgUrl}
        />
        {(action || backButton) && <ActionsWrapper>
          {backButton && <BackButton backLink={backLink} />}
          {action && action}
        </ActionsWrapper>}
        <ItemsWrapper className={titleClassName}>
          <TextContainer>
            <Typography className='p-0' variant={titleVariant}>{title}</Typography>
            <Typography variant='subtitle1'>{subtitle}</Typography>
          </TextContainer>
          <SecondaryContainer onClick={imgUrl && handleOpenImage}>
            {secondary}
          </SecondaryContainer>
        </ItemsWrapper>
      </Container>
    )
  }
}

export default PageHeader
