import React, { useState } from 'react'
import { Chip } from '@material-ui/core'

const SelectionChip = ({ label }) => {
  const [selected, setSelected] = useState(false)

  return (
    <Chip color={selected ? 'primary' : 'default'} className={selected ? 'selected-chip' : ''} onClick={() => setSelected(!selected)} label={label} />
  )
}

export default SelectionChip
