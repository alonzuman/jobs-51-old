import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { useSelector } from 'react-redux';

const SkillsSelect = ({ skills, setSkills, helperText, error }) => {
  const { translation } = useSelector(state => state.theme)
  const { isFetching } = useSelector(state => state.constants)
  const options = useSelector(state => state.constants?.skills?.all)

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
      options={options}
      getOptionLabel={v => v}
      renderInput={params => <TextField error={error} helperText={helperText} {...params} variant="outlined" label={translation.skills} />}
    />
  )
}

export default SkillsSelect
