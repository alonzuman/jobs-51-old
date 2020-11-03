import { Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useState } from 'react'
import styled from 'styled-components'
import ImageLightbox from '../layout/ImageLightbox'
import BackButton from '../../v2/atoms/BackButton'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
`

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: 16px;
  min-height: 40;
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

const PageHeader = ({ loading, imgUrl, title, action, subtitle, secondary, backButton, backLink, ...rest }) => {
  const [isImageOpen, setIsImageOpen] = useState(false)
  const handleOpenImage = () => setIsImageOpen(!isImageOpen)

  if (loading) {
    return (
      <Container {...rest}>
        <Skeleton width={128} height={32} />
      </Container>
    )
  } else {
    return (
      <>
        {(action || backButton) &&
          <ActionsWrapper>
            {backButton && <BackButton backLink={backLink} />}
            {action && action}
          </ActionsWrapper>}
        <Container backButton={backButton} {...rest}>
          <ImageLightbox
            open={isImageOpen}
            onClose={handleOpenImage}
            imgUrl={imgUrl}
          />
          <ItemsWrapper>
            <TextContainer>
              <Typography className='p-0 m-0' variant='h2'>{title}</Typography>
              <Typography variant='subtitle1'>{subtitle}</Typography>
            </TextContainer>
            <SecondaryContainer onClick={imgUrl && handleOpenImage}>
              {secondary}
            </SecondaryContainer>
          </ItemsWrapper>
        </Container>
      </>
    )
  }
}

export default PageHeader
