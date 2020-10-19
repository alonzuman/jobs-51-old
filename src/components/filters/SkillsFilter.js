import { Chip, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

const SkillsFilter = ({ selectedSkills, setSelectedSkills }) => {
  const { translation } = useSelector(state => state.theme)
  const { listedSkills } = useSelector(state => state?.constants)

  const handleClick = newValue => {
    if (selectedSkills?.length > 0 && !selectedSkills?.includes(newValue)) {
      setSelectedSkills([...selectedSkills, newValue])
    } else if (selectedSkills?.length > 0 && selectedSkills?.includes(newValue)) {
      setSelectedSkills([...selectedSkills.filter(v => v !== newValue)])
    } else {
      setSelectedSkills([newValue])
    }
  }

  return (
    <>
      <Typography variant='subtitle1'>{translation.skills}</Typography>
      <Grid container spacing={1}>
        {Object.keys(listedSkills)?.map((v, i) => (
          <Grid item key={i}>
            <Chip label={v} onClick={() => handleClick(v)} color={selectedSkills?.includes(v) ? 'primary' : 'default'} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default SkillsFilter
