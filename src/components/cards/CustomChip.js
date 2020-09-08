import React from 'react'
import { Chip } from '@material-ui/core'

const CustomChip = ({
  style,
  size,
  onClick,
  label,
  color,
  variant,
  onDelete,
}) => {
  return (
    <Chip
      style={{ ...style }}
      onClick={onClick}
      size={size ? size : "medium"}
      color={color ? color : "default"}
      variant={variant ? variant : "default"}
      label={label}
      onDelete={onDelete}
    />
  );
};

export default CustomChip
