import React from 'react'
import './CardContainer.css'
import { Card } from '@material-ui/core'
import { useSelector } from 'react-redux'

const CardContainer = ({ children, style }) => {
  const { direction } = useSelector(state => state.theme)

  const cardContainerStyle = {
    direction,
    ...style,
  }

  return (
    <Card className='card__container' style={cardContainerStyle}>
      { children }
    </Card>
  )
}

export default CardContainer
