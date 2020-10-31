import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../../actions'
import { emailValidation, passwordValidation } from '../../../utils'
import Container from '../../../v2/atoms/Container'
import DialogActionsContainer from '../../../v2/atoms/DialogActionsContainer'

const EmailSignIn = () => {
  const [errors, setErrors] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    if (!emailValidation(email)) {
      setErrors({
        email: translation.emailNotValid
      })
    } else if (password?.length <= 7) {
      setErrors({
        password: translation.passwordTooShort
      })
    } else {
      dispatch(signIn(email, password))
    }
  }

  return (
    <Container className='m-0 full__width pb-0 pr-0 pl-0'>
      <TextField
        size='small'
        variant='outlined'
        label={translation.email}
        value={email}
        error={Boolean(errors.email)}
        helperText={errors.email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        size='small'
        type='password'
        variant='outlined'
        value={password}
        label={translation.password}
        onChange={e => setPassword(e.target.value)}
        error={Boolean(errors.password)}
        helperText={errors.password}
      />
      <DialogActionsContainer className='pr-0 pl-0 pb-0'>
        <Button onClick={handleSubmit} variant='contained' size='large' color='primary' className='full__width'>
          {translation.signIn}
        </Button>
      </DialogActionsContainer>
    </Container>
  )
}

export default EmailSignIn
