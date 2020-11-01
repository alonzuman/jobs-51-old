import { Button, Chip, Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ListIcon from '@material-ui/icons/List';
import TableChartIcon from '@material-ui/icons/TableChart';
import TopBar from '../../../../v2/layout/TopBar';
import Transition from '../../../../v2/atoms/Transition';
import useWindowSize from '../../../../hooks/useWindowSize';
import CustomDialogHeader from '../../../../v2/molecules/CustomDialogHeader';
import DialogActionsContainer from '../../../../v2/atoms/DialogActionsContainer';
import { getActivities } from '../../../../actions';

const RegionActivitiesFilter = ({ view, handleView, region }) => {
  const { translation } = useSelector(state => state.theme);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('all')
  const { windowWidth: width } = useWindowSize()
  const handleOpen = () => setIsOpen(!isOpen)
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    await dispatch(getActivities({ selectedRegion: region, approved: status }))
    await handleOpen()
  }

  const clearFilters = () => {
    setStatus('all')
  }

  return (
    <TopBar sticky>
      <Button size='large' variant='outlined' className='mobile_full__width ml-5' onClick={handleOpen}>
        {translation.filterResults}
      </Button>
      <Button size='large' variant='outlined' className='mobile_full__width' onClick={handleView}>
        {translation.changeView}
        {view === 'list' && <ListIcon className='mr-5' />}
        {view === 'table' && <TableChartIcon className='mr-5 small__icon' />}
      </Button>
      <Dialog fullScreen={width <= 768} fullWidth TransitionComponent={Transition} dir='rtl' open={isOpen} onClose={handleOpen}>
        <CustomDialogHeader title={translation.filterResults} exitButton onClose={handleOpen} />
        <DialogContent>
          <Typography variant='subtitle1'>{translation.activityStatus}</Typography>
          <Grid container spacing={1}>
            <Grid onClick={() => setStatus('approved')} item>
              <Chip className='clickable' color={status === 'approved' ? 'primary' : 'default'} label={translation.approved} />
            </Grid>
            <Grid onClick={() => setStatus('pending')} item>
              <Chip className='clickable' color={status === 'pending' ? 'primary' : 'default'} label={translation.pending} />
            </Grid>
            <Grid onClick={() => setStatus('all')} item>
              <Chip className='clickable' color={status === 'all' ? 'primary' : 'default'} label={translation.all} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActionsContainer>
          <Button onClick={clearFilters}>{translation.clear}</Button>
          <Button variant='contained' color='primary' size='large' onClick={handleSubmit}>{translation.apply}</Button>
        </DialogActionsContainer>
      </Dialog>
    </TopBar>
  )
}

export default RegionActivitiesFilter
