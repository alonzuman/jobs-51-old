import React from 'react'
import { useSelector } from 'react-redux'

const Feedback = () => {
  const { isOn, msg, type } = useSelector(state => state.feedback)

  return (
    <>
     {isOn && <h1>{msg}, {type}</h1>}
    </>
  )
}

export default Feedback
