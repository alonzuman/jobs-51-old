import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { clearAlert } from '../../actions';

const CustomAlert = () => {
  const dispatch = useDispatch()
  const { isOn, msg, type } = useSelector(state => state.alert)

  return (
    <Box>
      {isOn && <Alert severity={type} onClose={() => dispatch(clearAlert())}>{msg}</Alert>}
    </Box>
  )
}

export default CustomAlert
