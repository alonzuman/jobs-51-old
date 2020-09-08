import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Switch, Typography } from "@material-ui/core";
import { toggleVolunteer } from '../../../actions/users';

const ToggleVolunteer = ({ style }) => {
  const { translation } = useSelector(state => state.theme)
  const { user } = useSelector(state => state.users)
  const dispatch = useDispatch()

  const handleVolunteerChange = () => {
    dispatch(toggleVolunteer({ uid: user.uid, currentValue: !user.volunteer }));
  }

  return (
    <div style={{ ...style }}>
      <Typography variant="subtitle1">
        {translation.volunteer}
      </Typography>
      <Switch
        color="primary"
        checked={!!user.volunteer}
        onChange={handleVolunteerChange}
      />
    </div>
  );
}

export default ToggleVolunteer
