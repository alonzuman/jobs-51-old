import React from 'react'
import { Alert } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { clearAlert } from '../../actions';

const CustomAlert = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)
  const { isOn, msg, type } = useSelector(state => state.alerts)

  const boxStyle = {
    position: 'fixed',
    bottom: '5rem',
    width: '100%',
    padding: '1rem',
    direction: 'rtl',
    zIndex: 999999,
  }

  if (isOn) {
    return (
      <>
      <Box onClick={() => dispatch(clearAlert())} style={boxStyle}>
        <Alert severity={type} onClose={() => dispatch(clearAlert())}>{translation[msg]}</Alert>
      </Box>
      </>
    )
  } else {
    return <div/>
  }
}

export default CustomAlert
