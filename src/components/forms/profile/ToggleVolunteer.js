import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Switch, Typography } from "@material-ui/core";
import { toggleVolunteer } from '../../../actions/users';

const ToggleVolunteer = ({ style, user }) => {
  const { translation } = useSelector(state => state.theme)
  const [volunteer, setVolunteer] = useState(user.volunteer)
  const dispatch = useDispatch()

  const handleVolunteerChange = () => {
    dispatch(toggleVolunteer({ uid: user.uid, currentValue: !user.volunteer }));
    setVolunteer(!volunteer)
  }

  return (
    <div style={{ ...style }}>
      <Typography variant="subtitle1">
        {translation.volunteer}
      </Typography>
      <Switch
        color="primary"
        checked={!!volunteer}
        onChange={handleVolunteerChange}
      />
    </div>
  );
}

export default ToggleVolunteer
