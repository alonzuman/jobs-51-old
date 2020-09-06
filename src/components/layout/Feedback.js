import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { removeFeedback } from '../../actions/feedback'

const Feedback = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)
  const { isOn, msg, type } = useSelector(state => state.feedback)

  const feedbackContainer = {
    position: 'fixed',
    bottom: '6.5rem',
    zIndex: 999,
    width: '100%',
    padding: '1rem'
  }

  const feedbackStyle = {
    maxWidth: 600
  }

  if (isOn) {
    return (
      <div onClick={() => dispatch(removeFeedback())} style={feedbackContainer}>
        {isOn && <Alert style={feedbackStyle} severity={type} onClose={() => dispatch(removeFeedback())}>{translation[msg]}</Alert>}
      </div>
    )
  } else {
    return <div />
  }
}

export default Feedback