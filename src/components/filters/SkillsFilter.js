import { Chip, Divider, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 8px;
`

const SkillsFilter = ({ selectedSkills, setSelectedSkills }) => {
  const { translation } = useSelector(state => state.theme)
  const { listedSkills } = useSelector(state => state?.constants)

  const handleClick = newValue => {
    if (selectedSkills?.includes(newValue)) {
      setSelectedSkills([...selectedSkills.filter(v => v !== newValue)])
    } else {
      setSelectedSkills([...selectedSkills, newValue])
    }
  }

  return (
    <Container>
      <Typography variant='h3'>{translation.filterBySkills}</Typography>
      <Typography variant='subtitle1'>{translation.skills}</Typography>
      <Grid container spacing={1}>
        {Object.keys(listedSkills)?.map((v, i) => (
          <Grid item key={i}>
            <Chip label={v} onClick={() => handleClick(v)} color={selectedSkills?.includes(v) ? 'primary' : 'default'} />
          </Grid>
        ))}
      </Grid>
      <Divider className='mt-2' />
    </Container>
  )
}

export default SkillsFilter
