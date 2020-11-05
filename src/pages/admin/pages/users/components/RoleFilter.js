import { Chip, Grid, TextField, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { roles } from '../../../../../utils'
import PageSection from '../../../../../v2/atoms/PageSection'
import PageSectionTitle from '../../../../../v2/atoms/PageSectionTitle'
import { UsersFilterContext } from './UsersFilterContext'

const RoleFilter = () => {
  const { translation } = useSelector(state => state.theme)
  const { queryParams, handleQueryParamsChange } = useContext(UsersFilterContext)

  return (
    <PageSection transparent disableGutters>
      <PageSectionTitle title={translation.filterByRole} />
      <Grid container spacing={1}>
        {[...roles, 'pending']?.map((role, i) => (
          <Grid key={i} item>
            <Chip
              color={queryParams.role === role ? 'primary' : 'default'}
              label={translation.roles[role]}
              onClick={() => handleQueryParamsChange('role', role)}
            />
          </Grid>
        ))}
      </Grid>
    </PageSection>
  )
}

export default RoleFilter
