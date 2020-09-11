import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormControl, MenuItem, Select, Button, CircularProgress } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { toggleRegion } from '../../../actions/users';

const regions = ["תל אביב", "חיפה", "באר שבע", "שרון", "ירושלים"];

const ChangeRegion = () => {
  const [region, setRegion] = useState('')
  const [button, setButton] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { user, loading } = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user.region) return setRegion(user.region)
  }, [user.region])

  const handleRegionChange = e => {
    setRegion(e.target.value)
    setButton(true)
  }

  const handleSubmit = () => {
    dispatch(toggleRegion({ uid: user.uid, region }))
  }

  return (
    <FormControl>
      {(loading || !user) && <Skeleton variant="rect" width={"100%"} height={60} />}
      {(!loading && user) &&
      <>
      <Select variant='outlined' value={region} onChange={handleRegionChange}>
        {regions.map((region, index) => (
          <MenuItem style={{ direction: "rtl" }} key={region} value={region}>
            {region}
          </MenuItem>
        ))}
      </Select>
      {button &&
        <Button className='mt-1' onClick={() => handleSubmit()}>
          {loading ? <CircularProgress className="button-spinner" /> : translation.saveChanges}
        </Button>}
      </>}
    </FormControl>
  );
}

export default ChangeRegion
