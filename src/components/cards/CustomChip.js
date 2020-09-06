import React from 'react'
import { Chip } from '@material-ui/core'
import { useSelector } from 'react-redux'

const CustomChip = ({ style, size, onClick, label, color, variant }) => {
  const { theme } = useSelector(state => state.theme)

  const chipStyle = {
    backgroundColor: theme.palette.background.main,
    ...style,
  }

  return (
    <Chip
      onClick={onClick}
      style={chipStyle}
      size={size ? size : ''}
      color={color ? color : ''}
      variant={variant ? variant : 'outlined'}
      label={label}
    />
  )
}

export default CustomChip
