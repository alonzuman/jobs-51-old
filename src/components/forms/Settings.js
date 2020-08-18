import React from 'react'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../actions'

const Settings = () => {
  const { authenticated } = useSelector(state => state.auth)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  return (
    <div>
      {authenticated && <Button className='button-style' color='primary' variant='outlined' onClick={() => dispatch(signOut())}>{translation.signOut}</Button>}
    </div>
  )
}

export default Settings
