import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

const LocationSelect = ({ location, setLocation }) => {
  const { translation } = useSelector(state => state.theme)
  const options = useSelector(state => state.constants?.locations?.all)

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option,
    limit: 30
  });

  return (
    <Autocomplete
      options={options}
      filterOptions={filterOptions}
      handleHomeEndKeys
      autoHighlight
      value={location}
      onChange={(e, value) => setLocation(value)}
      noOptionsText={<span style={{ direction: 'rtl', textAlign: 'right', width: '100%' }}>No Results</span>}
      getOptionLabel={option => option}
      renderInput={params => <TextField {...params} label={translation.location} variant="outlined" />}
      renderOption={v => <div style={{ direction: 'rtl', textAlign: 'right', width: '100%' }} dir='rtl'>{v}</div>}
      placeholder={translation.preferredLocationPlaceholder}
      label={translation.preferredLocation}
      variant='outlined'
    />
  )
}

export default LocationSelect
