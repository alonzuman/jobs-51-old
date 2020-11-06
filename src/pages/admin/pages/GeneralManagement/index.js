import { IconButton, List, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../../../v2/atoms/Container'
import PageSection from '../../../../v2/atoms/PageSection'
import PageHeader from '../../../../v2/organisms/PageHeader'
import ActivityTypeCard from './components/ActivityTypeCard'
import styled from 'styled-components'
import AddActivityType from './components/AddActivityType'

// Icons
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { getActivityTypes } from '../../../../actions/constants'
import EditRegions from './components/EditRegions'
import EditRegionsProvider from './components/EditRegionsContext'
import PageSectionTitle from '../../../../v2/atoms/PageSectionTitle'

const GeneralManagement = () => {
  const { translation } = useSelector(state => state.theme)
  const { isFetched, isUpdating, isDeleting, all } = useSelector(state => state.constants.activityTypes)
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isFetched) {
      dispatch(getActivityTypes())
    }
  }, [])

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
        <PageSectionTitle
        title={translation.manageActivityTypes}
          action={<IconButton onClick={handleIsEditing} size='small'>
            {isEditing ? <CloseIcon fontSize='inherit' /> : <EditIcon fontSize='inherit' />}
          </IconButton>}
        />
        <List>
          {all?.map((activity, i) => (
            <ActivityTypeCard isEditing={isEditing} isDeleting={isDeleting} isUpdating={isUpdating} activity={activity} key={i}  />
          ))}
        </List>
        {isEditing && <AddActivityType />}
        <PageSection disableGutters divider>
          <EditRegionsProvider>
            <EditRegions />
          </EditRegionsProvider>
        </PageSection>
      </PageSection>
    </Container>
  )
}

export default GeneralManagement
