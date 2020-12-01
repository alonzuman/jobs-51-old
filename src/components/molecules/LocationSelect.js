import { Autocomplete } from '@material-ui/lab'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { getLocations } from '../../actions/constants';

const LocationSelect = ({ location, setLocation, label, helperText = '', error = '', placeholder, ...rest }) => {
  const { translation } = useSelector(state => state.theme)
  const { locations } = useSelector(state => state.constants)
  const { isFetched, isFetching, all } = locations;
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isFetched) {
      dispatch(getLocations())
    }
  }, [])

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option,
    limit: 30
  });

  return (
    <Autocomplete
      options={all}
      filterOptions={filterOptions}
      handleHomeEndKeys
      loading={isFetching}
      autoHighlight
      value={location}
      onChange={(e, value) => setLocation(value)}
      noOptionsText={<span style={{ direction: 'rtl', textAlign: 'right', width: '100%' }}>No Results</span>}
      getOptionLabel={option => option}
      renderInput={params => <TextField helperText={helperText} error={Boolean(error)} {...params} placeholder={placeholder || translation.telAviv} label={label || translation.location} variant="outlined" />}
      renderOption={v => <div style={{ direction: 'rtl', textAlign: 'right', width: '100%' }} dir='rtl'>{v}</div>}
      variant='outlined'
      {...rest}
    />
  )
}

export default LocationSelect
