import React from 'react'
import { Alert } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { clearAlert } from '../../actions';

const CustomAlert = () => {
  const dispatch = useDispatch()
  const { isOn, msg, type } = useSelector(state => state.alert)

  const boxStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    padding: '1rem 1rem 5rem 1rem',
    zIndex: 999999,
  }

  const alertStyle = {

  }

  if (isOn) {
    return (
    <Box style={boxStyle}>
      {isOn && <Alert severity={type} style={alertStyle} onClose={() => dispatch(clearAlert())}>{msg}</Alert>}
    </Box>
  )} else {
    return null
  }
}

export default CustomAlert
