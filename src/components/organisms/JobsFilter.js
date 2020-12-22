import React, { useContext, useState } from 'react'
import { Button, Dialog, DialogContent } from '@material-ui/core'
import CustomDialogHeader from '../molecules/CustomDialogHeader'
import TuneIcon from '@material-ui/icons/Tune';
import styled from 'styled-components'
import DialogActionsContainer from '../atoms/DialogActionsContainer'
import Transition from '../atoms/Transition'
import useTheme from '../../hooks/useTheme';
import useWindowSize from '../../hooks/useWindowSize';
import { JobsFilterContext } from '../../contexts/JobsFilterContext';
import LocationFilter from '../../pages/Jobs/components/LocationFilter';
import IndustryFilter from '../../pages/Jobs/components/IndustryFilter';
import DatePostedFilter from '../../pages/Jobs/components/DatePostedFilter';

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
  const { translation } = useTheme();
  const { windowWidth } = useWindowSize();
  const { clearFilters, handleSubmit } = useContext(JobsFilterContext)
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen)
  const handleQuerySubmit = async () => {
    await handleSubmit();
    await handleOpen()
  }

  return (
    <Container>
      <Button
        size='large'
        onClick={handleOpen}
        variant='outlined'
        className='mobile_full__width'
      >{translation.filterResults}<TuneIcon className='mr-1' /></Button>
      <Dialog dir='rtl' fullScreen={windowWidth <= 768} fullWidth TransitionComponent={Transition} open={isOpen} onClose={handleOpen}>
        <CustomDialogHeader title={translation.filterResults} exitButton onClose={handleOpen} />
        <DialogContent>
          <LocationFilter />
          <IndustryFilter />
          {/* <SkillsFilter /> */}
          <DatePostedFilter />
        </DialogContent>
        <DialogActionsContainer>
          <Button onClick={clearFilters} >{translation.clear}</Button>
          <Button onClick={handleQuerySubmit} color='primary' variant='contained'>{translation.apply}</Button>
        </DialogActionsContainer>
      </Dialog>
    </Container>
  )
}

export default JobsFilter
