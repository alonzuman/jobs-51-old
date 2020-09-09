import React from 'react'

const CardMarker = ({ color, style }) => {
  const markerStyle = {
    right: 0,
    position: "absolute",
    marginRight: "-.25rem",
    borderRadius: ".5rem",
    width: ".5rem",
    height: "1.5rem",
    backgroundColor: color,
    ...style
  };

  return <div style={markerStyle} />
}

export default CardMarker
