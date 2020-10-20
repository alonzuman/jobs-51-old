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
import useWindowSize from '../../hooks/useWindowSize'
import IndustryFilter from './IndustryFilter'
import Slide from '@material-ui/core/Slide';
import DialogActionsContainer from '../../v2/atoms/DialogActionsContainer'
import DateFilter from './DateFilter'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: ${props => props.background};
  margin-bottom: 8px;
`

const JobsFilter = () => {
  const history = useHistory()
  const { location, skills } = qs.parse(history.location.search)
  const [isOpen, setIsOpen] = useState(false)
  const { windowWidth } = useWindowSize()
  const { translation, theme } = useSelector(state => state.theme)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedIndustry, setSelectedIndustry] = useState(translation.all)
  const [selectedMinDate, setSelectedMinDate] = useState(0)

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
      skills: selectedSkills,
      industry: selectedIndustry,
      date: selectedMinDate
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
    setSelectedIndustry(translation.all)
    setSelectedMinDate(0)
  }
  const handleClose = () => setIsOpen(false)

  return (
    <Container background={theme?.palette?.background?.main}>
      <Button className='mobile_full__width' color={skills || location ? 'primary' : 'default'} variant='outlined' onClick={() => setIsOpen(true)}>{translation.filterResults} <TuneIcon className='mr-1' /></Button>
      <Dialog TransitionComponent={Transition} fullScreen={windowWidth <= 768} dir='rtl' open={isOpen} onClose={handleClose}>
        <CustomDialogHeader title={translation.filterResults} exitButton onClose={handleClose} />
        <DialogContent>
          <LocationFilter selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
          <SkillsFilter selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />
          <IndustryFilter selectedIndustry={selectedIndustry} setSelectedIndustry={setSelectedIndustry} />
          <DateFilter selectedMinDate={selectedMinDate} setSelectedMinDate={setSelectedMinDate} />
        </DialogContent>
        <DialogActionsContainer border={theme?.palette?.border?.strong}>
          <Button size='large' color='default' onClick={clearFilters}>{translation.clear}</Button>
          <Button size='large' color='primary' variant='contained' onClick={updateQuery}>{translation.showResults}</Button>
        </DialogActionsContainer>
      </Dialog>
    </Container>
  )
}

export default JobsFilter
