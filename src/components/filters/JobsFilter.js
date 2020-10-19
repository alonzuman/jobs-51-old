import React, { useEffect, useState } from 'react'
import qs from 'query-string'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core'
import CustomDialogHeader from '../layout/CustomDialogHeader'
import TuneIcon from '@material-ui/icons/Tune';
import styled from 'styled-components'
import LocationFilter from './LocationFilter'
import SkillsFilter from './SkillsFilter'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
`

const JobsFilter = () => {
  const history = useHistory()
  const { location, skills } = qs.parse(history.location.search)
  const [isOpen, setIsOpen] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])

  useEffect(() => {
    if (typeof skills === 'string') {
      setSelectedSkills([skills])
    } else {
      setSelectedSkills(skills || [])
    }
    setSelectedLocation(location || '')
  }, [history.location.search])

  const updateQuery = () => {
    const query = {
      location: selectedLocation,
      skills: selectedSkills
    }

    history.push({
      pathname: '/jobs',
      search: qs.stringify(query)
    })

    handleClose()
  }

  const clearFilters = () => {
    setSelectedLocation('')
    setSelectedSkills([])
  }
  const handleClose = () => setIsOpen(false)

  return (
    <Container>
      <Button className='full__width' color='primary' variant='outlined' onClick={() => setIsOpen(true)}>{translation.filterResults} <TuneIcon className='mr-1' /></Button>
      <Dialog dir='rtl' open={isOpen} onClose={handleClose}>
        <CustomDialogHeader title={'filterResults'} exitButton onClose={handleClose} />
        <DialogContent>
          <LocationFilter selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
          <SkillsFilter selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />
        </DialogContent>
        <DialogActions>
          <Button color='default' variant='outlined' onClick={clearFilters}>{translation.clear}</Button>
          <Button color='primary' variant='contained' onClick={updateQuery}>{translation.submit}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default JobsFilter
