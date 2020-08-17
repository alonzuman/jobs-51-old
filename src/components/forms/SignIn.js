import React, { useState } from 'react'
import { TextField, Button, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { signIn, closeDialogs, openSigningUp } from '../../actions'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(signIn({ email, password }))
  }

  const handleClick = () => {
    dispatch(closeDialogs())
    dispatch(openSigningUp())
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField required type='email' label={translation.email} variant='outlined' value={email} onChange={e => setEmail(e.target.value)} />
      <TextField required type='password' label={translation.password} variant='outlined' value={password} onChange={e => setPassword(e.target.value)} />
      <Button color='primary' variant='contained' type='submit'>{translation.signIn}</Button>
      <br />
      <br />
      <Typography variant='body1'>{translation.notSignedUp}<a className='anchor' onClick={handleClick}>{translation.signUp}</a></Typography>
    </form>
  )
}

export default SignIn
