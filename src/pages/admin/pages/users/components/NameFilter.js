import { TextField, Typography } from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getListedMembers } from '../../../../../actions/constants'
import { onlyUnique } from '../../../../../utils'
import PageSection from '../../../../../components/atoms/PageSection'
import PageSectionTitle from '../../../../../components/atoms/PageSectionTitle'
import { UsersFilterContext } from './UsersFilterContext'

const Container = styled.div`
  margin-bottom: 8px;
`

const NameFilter = () => {
  const { listedMembers, isFetching, isFetched } = useSelector(state => state.constants)
  const { all } = listedMembers;
  const { queryParams, handleQueryParamsChange } = useContext(UsersFilterContext)
  const { translation } = useSelector(state => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isFetched) {
      dispatch(getListedMembers())
    }
  }, [])

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option,
    limit: 30
  });

  return (
    <PageSection transparent disableGutters>
      <PageSectionTitle title={translation.filterByFullName} />
      <Autocomplete
        size='small'
        loading={isFetching}
        options={all?.filter(onlyUnique)}
        filterOptions={filterOptions}
        handleHomeEndKeys
        autoHighlight
        value={queryParams.fullName}
        onChange={(e, value) => handleQueryParamsChange('fullName', value)}
        noOptionsText={<span style={{ direction: 'rtl', textAlign: 'right', width: '100%' }}>No Results</span>}
        getOptionLabel={option => option}
        renderInput={params => <TextField label={translation.userFullName} {...params} variant='outlined' />}
        renderOption={v => <div style={{ direction: 'rtl', textAlign: 'right', width: '100%' }} dir='rtl'>{v}</div>}
        placeholder={translation.preferredLocationPlaceholder}
        label={translation.preferredLocation}
        variant='outlined'
      />
    </PageSection>
  )
}

export default NameFilter
