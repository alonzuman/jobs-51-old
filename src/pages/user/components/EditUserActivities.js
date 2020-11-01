import { Divider, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import LocationSelect from '../../../v2/molecules/LocationSelect'
import PageSection from '../../../v2/atoms/PageSection'
import PageSectionTitle from '../../../v2/atoms/PageSectionTitle'

const Container = styled.div`
  margin-bottom: 32px;
`

const EditUserActivities = ({
  isVolunteer,
  isAdmin,
  stateRegion,
  setRegion,
  stateApproved,
  setApproved,
  statePending,
  setPending,
}) => {
  const { translation } = useSelector(state => state.theme)
  const { regions } = useSelector(state => state.constants?.locations)

  const locationHelperText = () => {
    if (isAdmin) {
      return ''
    } else if (!isAdmin && stateRegion === '') {
      return translation.afterSetOnlyAdminCanChange
    } else if (!isAdmin && stateRegion !== '') {
      return translation.onlyAdminCanChange
    }
  }


  if (!isVolunteer) {
    return null
  } else {
    return (
      <PageSection>
        <PageSectionTitle title={translation.manageVolunteering} />
        <LocationSelect
          helperText={locationHelperText()}
          disabled={!isAdmin && stateRegion}
          label={translation.activityRegion}
          size='small'
          location={stateRegion}
          setLocation={setRegion}
          className='mxw-224 mt-1'
          options={regions}
        />
        {isAdmin &&
          <>
            <Typography className='mb-5' variant='subtitle1'>{translation.activityHours}</Typography>
            <div className='flex align__center flex__row'>
              <TextField className='ml-5 mxw-196' size='small' variant='outlined' label={translation.approved} type='number' value={stateApproved} onChange={e => setApproved(parseInt(e.target.value))} />
              <TextField className='mxw-196' size='small' variant='outlined' label={translation.pending} type='number' value={statePending} onChange={e => setPending(parseInt(e.target.value))} />
            </div>
          </>}
        <Divider className='mt-1' />
      </PageSection>
    )
  }
}

export default EditUserActivities
