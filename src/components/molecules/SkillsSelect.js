import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { useSelector } from 'react-redux';
import useJobsConstants from '../../hooks/useJobsConstants';
import useTheme from '../../hooks/useTheme';

const SkillsSelect = ({ skills, setSkills, helperText, error, ...rest }) => {
  const { translation } = useTheme();
  const { isFetching, skills: { all } } = useJobsConstants();

  const handleChange = (e, values) => {
    setSkills(values)
  }

  return (
    <Autocomplete
      freeSolo
      loading={isFetching}
      multiple
      value={skills}
      onChange={handleChange}
      limitTags={2}
      options={all}
      getOptionLabel={v => v}
      renderInput={params => <TextField error={error} helperText={helperText} {...params} variant="outlined" label={translation.skills} />}
      {...rest}
    />
  )
}

export default SkillsSelect
