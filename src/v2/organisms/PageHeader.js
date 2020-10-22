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

const PageHeader = ({ subtitleType, editing = false, editingTitle, imgUrl, title, setTitle, titleLabel, action, subtitle, setSubtitle, subtitleLabel, secondary, backButton, spaceBottom, spaceTop, className }) => {
  const [isImageOpen, setIsImageOpen] = useState(false)
  const handleOpenImage = () => setIsImageOpen(!isImageOpen)

  if (editing) {
    return (
      <Container className={className} spaceBottom={spaceBottom} spaceTop={spaceTop}>
        <ActionsWrapper>
          {editingTitle && <Typography variant='h1'>{editingTitle}</Typography>}
          {backButton && <BackButton />}
          {action && action}
        </ActionsWrapper>
        <ItemsWrapper>
          <TextContainer>
            <TextField label={titleLabel} variant='outlined' value={title} onChange={e => setTitle(e.target.value)} />
            {subtitleType === 'location' ?
            <LocationSelect size='small' location={subtitle} setLocation={setSubtitle} />:
            <TextField label={subtitleLabel} variant='outlined' size='small' value={subtitle} onChange={e => setSubtitle(e.target.value)} />}
          </TextContainer>
        </ItemsWrapper>
      </Container>
    )
  } else {
    return (
      <Container className={className} spaceBottom={spaceBottom} spaceTop={spaceTop}>
        <ImageLightbox
          open={isImageOpen}
          onClose={handleOpenImage}
          imgUrl={imgUrl}
        />
        <ActionsWrapper>
          {backButton && <BackButton />}
          {action && action}
        </ActionsWrapper>
        <ItemsWrapper>
          <TextContainer>
            {/* TODO add subheader */}
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
}

export default PageHeader
