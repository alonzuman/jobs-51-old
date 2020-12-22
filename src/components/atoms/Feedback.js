import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { removeFeedback } from '../../actions/feedback'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  bottom: 64px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;
  direction: rtl;
  min-width: 300px;
`

const Feedback = () => {
  const dispatch = useDispatch()
  const { isOn, msg, type } = useSelector(state => state.feedback)

  const handleClose = () => dispatch(removeFeedback())

  if (isOn) {
    return (
      <Container onClick={handleClose}>
        <Alert className='full__width' severity={type} onClose={handleClose}>
          {msg}
        </Alert>
      </Container>
    )
  } else {
    return null
  }
}

export default Feedback
