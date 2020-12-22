import { Chip, Divider, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import SkillsSelect from '../../../components/molecules/SkillsSelect'
import PageSection from '../../../components/atoms/PageSection'
import PageSectionTitle from '../../../components/atoms/PageSectionTitle'
import moment from 'moment'
import useJobsConstants from '../../../hooks/useJobsConstants'

const JobPageDetails = ({ loading, job, editing, description, setDescription, skills, setSkills, industry, setIndustry, error, helperText }) => {
  const { translation } = useSelector(state => state.theme)
  const { industries } = useJobsConstants()

  const timeAgo = () => {
    moment.locale('he')
    return moment(job?.dateCreated).fromNow()
  }

  if (loading) {
    return (
      <PageSection>
        <Skeleton width={104} height={32} />
      </PageSection>
    )
  } else if (editing) {
    return (
      <PageSection>
        <Divider className='mb-2' />
        <PageSectionTitle title={translation.jobDescription} />
        <TextField className='mxw-512' size='small' variant='outlined' multiline rows={4} value={description} onChange={e => setDescription(e.target.value)} />
        <Typography className='mb-5' variant='subtitle1'>{translation.fieldsOfWork}</Typography>
        <SkillsSelect className='mxw-312' size='small' skills={skills} setSkills={setSkills} helperText={helperText} error={error} />
        <Typography variant='subtitle1'>{translation.industry}</Typography>
        <FormControl className='mxw-256 mb-3' size='small' >
          <Select variant='outlined' value={industry} onChange={e => setIndustry(e.target.value)}>
            {industries.map((v, i) => <MenuItem className='rtl text__right' value={v} key={i}>{v}</MenuItem>)}
          </Select>
        </FormControl>
      </PageSection>
    )
  } else {
    return (
      <PageSection>
        <Divider className='mb-1' />
        <Typography variant='h4' className='mb-1 primary__color'>{timeAgo()}</Typography>
        <PageSectionTitle title={translation.jobDescription} />
        <Typography className='mb-1 text__wrap' variant='body1'>{job?.description}</Typography>
        {job?.skills && job?.skills?.length !== 0 &&
          <PageSection disableGutters>
            <Typography className='mb-25' variant='subtitle1'>{translation.fieldsOfWork}</Typography>
            <Grid container spacing={1}>
              {job?.skills?.map((v, i) => <Grid item key={i}><Chip color='primary' size='small' variant='outlined' label={v} /></Grid>)}
            </Grid>
          </PageSection>}
        {job?.industry &&
          <PageSection disableGutters>
            <Typography variant='subtitle1'>{translation.industry}</Typography>
            <Typography variant='body1'>{job?.industry}</Typography>
          </PageSection>}
      </PageSection>
    )
  }
}

export default JobPageDetails
