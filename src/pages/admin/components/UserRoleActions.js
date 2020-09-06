import React, { useState, useEffect } from 'react'
import { Select, MenuItem, InputLabel, FormControl, CircularProgress, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { changeUserRole } from '../../../actions/users'
import { Skeleton } from '@material-ui/lab'

const roles = ['pending', 'user', 'volunteer', 'manager', 'moderator', 'admin']

const UserRoleActions = () => {
  const { translation } = useSelector(state => state.theme)
  const { loading, user } = useSelector(state => state.users)
  const [button, setButton] = useState(false)
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (user.role) {
      setValue(user.role)
    }
  }, [user.role])

  const handleRoleChange = e => {
    setValue(e.target.value)
    setButton(true)
  }

  const handleSubmit = () => {
    dispatch(changeUserRole(user.uid, value))
  }

  return (
    <FormControl>
      {(loading || !user) && <Skeleton variant='rect' width={'100%'} height={60} />}
      {(!loading && user.role) &&
      <>
        <InputLabel>{translation.role}</InputLabel>
        <Select value={value} onChange={handleRoleChange} variant='outlined' className='full__width'>
          {roles.map((role, index) => <MenuItem style={{ direction: 'rtl' }} key={index} value={role}>{translation.roles[role]}</MenuItem>)}
        </Select>
        <br />
        {button && <Button className='button-style' onClick={handleSubmit}>{loading ? <CircularProgress className='button-spinner' /> : translation.saveChanges}</Button>}
      </>}
    </FormControl>
  )
}

export default UserRoleActions
