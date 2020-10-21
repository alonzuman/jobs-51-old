import { Divider, TextField, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'

// Icons
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LocationSelect from '../../../components/forms/profile/LocationSelect'
import InfoContainer from './InfoContainer'
import UserPageSection from './UserPageSection'

const UserPageBio = ({ editing, loading, user, hometown, setHometown, phone, setPhone, about, setAbout }) => {
  const { translation } = useSelector(state => state.theme)

  if (loading) {
    return (
      <UserPageSection>
        <Skeleton width={104} height={18} />
      </UserPageSection>
    )
  } else if (editing) {
    return (
      <UserPageSection>
        <Divider />
        <br />
        <Typography className='mb-1' variant='h2'>{translation.aboutMe}</Typography>
        <TextField size='small' multiline rows={4} variant='outlined' label={translation.aboutMe} value={about} onChange={e => setAbout(e.target.value)} />
        <InfoContainer noMargin className='fit__content'>
          <PhoneIcon className='ml-1 mb-5 small__icon' />
          <TextField size='small' variant='outlined' label={translation.phone} value={phone} onChange={e => setPhone(e.target.value)} />
        </InfoContainer>
        <InfoContainer noMargin>
          <LocationCityIcon className='ml-1 mb-5 small__icon' />
          <LocationSelect size='small' location={hometown} setLocation={setHometown} className='mw-224' label={translation.hometown} />
        </InfoContainer>
      </UserPageSection>
    )
  } else if (user?.about || user?.hometown || user?.phone || user?.email) {
    return (
      <UserPageSection>
        <Divider />
        <br />
        <Typography variant='h2'>{translation.aboutMe}</Typography>
        <Typography variant='body1'>{user?.about}</Typography>
        <br />
        {user?.email &&
          <InfoContainer>
            <MailIcon className='ml-5 small__icon' />
            <Typography variant='body1'>{user?.email}</Typography>
          </InfoContainer>}
        {user?.phone &&
          <InfoContainer>
            <PhoneIcon className='ml-5 small__icon' />
            <Typography variant='body1'>{user?.phone}</Typography>
          </InfoContainer>}
        {user?.hometown &&
          <InfoContainer>
            <LocationCityIcon className='ml-5 small__icon' />
            <Typography variant='body1'>{user?.hometown}</Typography>
          </InfoContainer>}
      </UserPageSection>
    )
  } else {
    return null
  }
}

export default UserPageBio
