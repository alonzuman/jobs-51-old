import { IconButton, List, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Container from '../../../../v2/atoms/Container'
import PageSection from '../../../../v2/atoms/PageSection'
import PageHeader from '../../../../v2/organisms/PageHeader'
import ActivityTypeCard from './components/ActivityTypeCard'
import styled from 'styled-components'
import AddActivityType from './components/AddActivityType'

// Icons
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

const SubtitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const GeneralManagement = () => {
  const { translation } = useSelector(state => state.theme)
  const { isUpdating, isDeleting, activityTypes } = useSelector(state => state.constants)
  const { all } = activityTypes
  const [isEditing, setIsEditing] = useState(false)

  const handleIsEditing = () => setIsEditing(!isEditing)

  return (
    <Container>
      <PageSection>
        <PageHeader
          backButton
          title={translation.generalManagement}
        />
      </PageSection>
      <PageSection>
        <SubtitleContainer>
          <Typography variant='subtitle1'>{translation.manageActivityTypes}</Typography>
          <IconButton onClick={handleIsEditing} size='small'>
            {isEditing ? <CloseIcon fontSize='inherit' /> : <EditIcon fontSize='inherit' />}
          </IconButton>
        </SubtitleContainer>
        <List>
          {all?.map((activity, i) => (
            <ActivityTypeCard isEditing={isEditing} isDeleting={isDeleting} isUpdating={isUpdating} activity={activity} key={i}  />
          ))}
        </List>
        {isEditing && <AddActivityType />}
      </PageSection>
    </Container>
  )
}

export default GeneralManagement
