import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import { Button, Dialog, DialogContent, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import CustomDialogHeader from '../../../../../v2/molecules/CustomDialogHeader';
import DialogActionsContainer from '../../../../../v2/atoms/DialogActionsContainer';
import LocationSelect from '../../../../../v2/molecules/LocationSelect';
import styled from 'styled-components';
import Transition from '../../../../../v2/atoms/Transition';
import useWindowSize from '../../../../../hooks/useWindowSize';

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

const ActivitiesFilter = () => {
  const { translation } = useSelector(state => state.theme);
  const { regions } = useSelector(state => state?.constants?.locations);
  const history = useHistory();
  const { windowWidth: width } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState([]);

  const handleOpen = () => setIsOpen(!isOpen)

  useEffect(() => {
    const { search } = history.location;
    const parsedQuery = qs.parse(search);
    setSelectedRegion(parsedQuery?.selectedRegion || '');
  }, [history.location.search])

  const handleSubmit = e => {
    e.preventDefault()
    const query = {
      selectedRegion
    }
    const stringifiedQuery = qs.stringify(query)

    history.push({
      pathname: '/admin/activities',
      search: stringifiedQuery
    })

    handleOpen()
  }

  const clearFilters = () => {
    setSelectedRegion('')
  }

  return (
    <Container>
      <Button onClick={handleOpen} variant='outlined' className='mobile_full__width'>{translation.filterResults}</Button>
      <Dialog fullScreen={width <= 768} fullWidth TransitionComponent={Transition} dir='rtl' open={isOpen} onClose={handleOpen}>
        <CustomDialogHeader title={translation.filterResults} exitButton onClose={handleOpen} />
        <DialogContent>
          <Typography className='mb-1' variant='h2'>{translation.filterByRegion}</Typography>
          <LocationSelect
            className='mt-1'
            location={selectedRegion}
            setLocation={setSelectedRegion}
            options={regions}
          />
        </DialogContent>
        <DialogActionsContainer>
          <Button disabled={!selectedRegion} onClick={clearFilters}>{translation.clear}</Button>
          <Button onClick={handleSubmit} color='primary' variant='contained'>{translation.apply}</Button>
        </DialogActionsContainer>
      </Dialog>
    </Container>
  )
}

export default ActivitiesFilter
