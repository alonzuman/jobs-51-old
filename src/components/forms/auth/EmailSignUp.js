import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../../actions'
import { emailValidation } from '../../../utils'
import Container from '../../../v2/atoms/Container'
import DialogActionsContainer from '../../../v2/atoms/DialogActionsContainer'
import LocationSelect from '../profile/LocationSelect'

const EmailSignUp = () => {
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hometown, setHometown] = useState('');
  const { translation } = useSelector(state => state.theme)
  const [errors, setErrors] = useState({
    password: '',
    field: ''
  })
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: '',
    hometown: '',
    volunteer: false,
    region: '',
    serviceYear: '',
  })
  const dispatch = useDispatch()

  const handleChange = e => {
    setErrors({})
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (step === 1) {
      if (validateNamePhoneAndHometown(user.firstName, user.lastName, user.phone, hometown)) {
        const newUser = {
          ...user,
          hometown,
        }
        dispatch(signUp(newUser, password))
      }
    }
  }

  const validateEmailAndPassword = (email, password) => {
    if (!emailValidation(email)) {
      setErrors({
        ...errors,
        email: translation.emailNotValid
      })
    } else if (password !== confirmPassword) {
      setErrors({
        ...errors,
        password: translation.passwordsDontMatch
      })
    } else if (password.length <= 7) {
      setErrors({
        ...errors,
        password: translation.passwordTooShort
      })
    } else {
      return true
    }
  }

  const validateNamePhoneAndHometown = (firstName, lastName, phone) => {
    if (!firstName) {
      setErrors({
        ...errors,
        firstName: translation.pleaseFillThisField
      })
    } else if (!lastName) {
      setErrors({
        ...errors,
        lastName: translation.pleaseFillThisField
      })
    } else if (!phone) {
      setErrors({
        ...errors,
        phone: translation.pleaseFillThisField
      })
    } else if (!hometown) {
      setErrors({
        ...errors,
        hometown: translation.pleaseFillThisField
      })
    } else {
      return true
    }
  }

  const handleNextStep = () => {
    if (step === 0) {
      if (validateEmailAndPassword(user.email, password)) {
        return setStep(step => step + 1)
      }
    }
  }

  const handlePrevStep = () => {
    if (step !== 0) {
      setStep(step => step - 1)
    }
  }

  return (
    <Container className='pb-0'>
      {step === 0 &&
        <>
          <TextField
            label={translation.email}
            size='small'
            variant='outlined'
            name='email'
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            label={translation.password}
            type='password'
            size='small'
            variant='outlined'
            error={Boolean(errors.password)}
            value={password} onChange={e => setPassword(e.target.value)}
          />
          <TextField
            label={translation.confirmPassword}
            type='password'
            size='small'
            variant='outlined'
            value={confirmPassword}
            error={Boolean(errors.password)}
            helperText={errors.password}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </>}
      {step === 1 &&
        <>
          <TextField
            label={translation.firstName}
            size='small'
            variant='outlined'
            name='firstName'
            onChange={handleChange}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
          />
          <TextField
            label={translation.lastName}
            size='small'
            variant='outlined'
            name='lastName'
            onChange={handleChange}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
          <TextField
            label={translation.phone}
            size='small'
            variant='outlined'
            name='phone'
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
          <LocationSelect
            size='small'
            label={translation.hometown}
            location={hometown}
            setLocation={setHometown}
            error={Boolean(errors.hometown)}
            helperText={errors.hometown}
          />
        </>}
      <DialogActionsContainer className='pb-0 pr-0 pl-0'>
        <Button size='large' type='button' disabled={step === 0} onClick={handlePrevStep}>{translation.back}</Button>
        {step !== 1 && <Button variant='contained' color='primary' size='large' type='button' disabled={step === 2} onClick={handleNextStep}>{translation.next}</Button>}
        {step === 1 && <Button variant='contained' color='primary' size='large' onClick={handleSubmit}>{translation.signUp}</Button>}
      </DialogActionsContainer>
    </Container>
  )
}

export default EmailSignUp
