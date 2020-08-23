import React from 'react'
import { Alert } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { clearAlert } from '../../actions';

const CustomAlert = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)
  const { isOn, msg, type } = useSelector(state => state.alert)

  const boxStyle = {
    direction: 'rtl',
    position: 'fixed',
    bottom: '5rem',
    width: '100%',
    padding: '1rem',
    zIndex: 999999,
  }

  if (isOn) {
    return (
    <Box style={boxStyle}>
      {isOn && <Alert severity={type} onClose={() => dispatch(clearAlert())}>{translation[msg]}</Alert>}
    </Box>
  )} else {
    return null
  }
}

export default CustomAlert
