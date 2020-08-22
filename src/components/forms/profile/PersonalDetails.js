import React, { useState, useEffect } from 'react'
import { TextField, Button, Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import AddChips from '../AddChips'
import { addPersonalDetails } from '../../../actions'
import { auth } from 'firebase'
import FormSkeleton from '../FormSkeleton'

const PersonalDetails = () => {
  const user = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()
  const [skillsArray, setSkillsArray] = useState(user?.skills || [])
  const [personalDetails, setPersonalDetails] = useState({
    serviceYear: user.serviceYear || '',
    lastPosition: user.lastPosition || '',
    preferredLocation: user.preferredLocation || '',
    skills: user.skills || ''
  })

  useEffect(() => {
    setPersonalDetails({
      serviceYear: user.serviceYear,
      lastPosition: user.lastPosition,
      preferredLocation: user.preferredLocation,
      skills: user.skills
    })
    setSkillsArray(user.skills)
  }, [user])

  const handleInputChange = e => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const userPersonalDetails = {
      ...personalDetails,
      skills: skillsArray
    }
    dispatch(addPersonalDetails(user, userPersonalDetails, user.uid))
  }

  return (
    <form onSubmit={handleSubmit}>
      {user &&
      <>
        <TextField label={translation.serviceYear} variant='outlined' name='serviceYear' value={personalDetails.serviceYear} onChange={handleInputChange} />
        <TextField label={translation.lastPosition} variant='outlined' name='lastPosition' value={personalDetails.lastPosition} onChange={handleInputChange} />
        <TextField label={translation.preferredLocation} variant='outlined' name='preferredLocation' value={personalDetails.preferredLocation} onChange={handleInputChange} />
        <AddChips label={translation.skills} chips={skillsArray} setChips={setSkillsArray} />
        <Button className='button-style' variant='contained' color='primary' type='submit'>{translation.update}</Button>
      </>}
    </form>
  )
}

export default PersonalDetails
