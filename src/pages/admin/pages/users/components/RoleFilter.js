import { Chip, Grid, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { roles } from '../../../../../utils'

const Container = styled.div`
  margin-bottom: 8px;
`

const RoleFilter = ({ selectedRole, setSelectedRole, ...rest }) => {
  const { translation } = useSelector(state => state.theme)

  const handleClick = role => {
    if (selectedRole === role) {
      setSelectedRole('')
    } else {
      setSelectedRole(role)
    }
  }

  return (
    <Container>
      <Typography className='mb-1' variant='h2'>{translation.filterByRole}</Typography>
      <Grid container spacing={1}>
        {[...roles, 'pending']?.map((role, index) => (
          <Grid key={index} item>
            <Chip
              color={role === selectedRole ? 'primary' : 'default'}
              label={translation.roles[role]}
              onClick={() => handleClick(role)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default RoleFilter
