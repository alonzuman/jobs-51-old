import { TextField, Typography } from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { onlyUnique } from '../../../../../utils'

const Container = styled.div`
  margin-bottom: 8px;
`

const NameFilter = ({ selectedFullName, setSelectedFullName, ...rest }) => {
  const options = useSelector(state => state?.constants?.listedMembers?.all)
  const { translation } = useSelector(state => state.theme)

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option,
    limit: 30
  });

  return (
    <Container>
      <Typography className='mb-1' variant='h2'>{translation.filterByFullName}</Typography>
      <Autocomplete
        options={options.filter(onlyUnique)}
        filterOptions={filterOptions}
        handleHomeEndKeys
        autoHighlight
        value={selectedFullName}
        onChange={(e, value) => setSelectedFullName(value)}
        noOptionsText={<span style={{ direction: 'rtl', textAlign: 'right', width: '100%' }}>No Results</span>}
        getOptionLabel={option => option}
        renderInput={params => <TextField label={translation.userFullName} {...params} variant='outlined' />}
        renderOption={v => <div style={{ direction: 'rtl', textAlign: 'right', width: '100%' }} dir='rtl'>{v}</div>}
        placeholder={translation.preferredLocationPlaceholder}
        label={translation.preferredLocation}
        variant='outlined'
        {...rest}
      />
    </Container>
  )
}

export default NameFilter
