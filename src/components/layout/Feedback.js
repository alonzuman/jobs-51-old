import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { removeFeedback } from '../../actions/feedback'

const Feedback = () => {
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.theme)
  const { isOn, msg, type } = useSelector(state => state.feedback)

  return (
    <>
      {isOn && <Alert severity={type} onClose={() => dispatch(removeFeedback())}>{translation[msg]}</Alert>}
    </>
  )
}

export default Feedback
