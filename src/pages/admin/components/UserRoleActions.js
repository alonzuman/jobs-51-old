import React, { useState, useEffect } from 'react'
import { Select, MenuItem, InputLabel, FormControl, CircularProgress, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { changeUserRole } from '../../../actions/users'

const roles = ['pending', 'user', 'volunteer', 'manager', 'moderator', 'admin']

const UserRoleActions = () => {
  const { translation } = useSelector(state => state.theme)
  const { loading, user } = useSelector(state => state.users)
  const [button, setButton] = useState(false)
  const [value, setValue] = useState('pending')
  const dispatch = useDispatch()

  useEffect(() => { setValue(user.role) }, [user])

  const handleRoleChange = e => {
    setValue(e.target.value)
    setButton(true)
  }

  const handleSubmit = () => {
    dispatch(changeUserRole(user.uid, value))
  }

  if (loading || !user) {
    return <CircularProgress />
  } else {
    return (
      <>
      <FormControl>
        <InputLabel>{translation.role}</InputLabel>
        <Select onChange={handleRoleChange} variant='outlined' style={{width: '100%'}} value={value}>
          {roles.map((role, index) => <MenuItem key={index} value={role}>{translation.roles[role]}</MenuItem>)}
        </Select>
        <br />
        {button && <Button className='button-style' onClick={handleSubmit}>{loading ? <CircularProgress className='button-spinner' /> : translation.saveChanges}</Button>}
      </FormControl>
      </>
    )
  }
}

export default UserRoleActions
