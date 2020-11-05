import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import { Button, Dialog, DialogContent } from '@material-ui/core';
import { useSelector } from 'react-redux';
import CustomDialogHeader from '../../../../../v2/molecules/CustomDialogHeader';
import DialogActionsContainer from '../../../../../v2/atoms/DialogActionsContainer';
import Transition from '../../../../../v2/atoms/Transition';
import useWindowSize from '../../../../../hooks/useWindowSize';
import TopBar from '../../../../../v2/layout/TopBar';
import ActivityTypesFilter from './ActivityTypesFilter';
import { ActivitiesFilterContext } from './ActivitiesFilterContext';
import ActivityStatusFilter from './ActivityStatusFilter';
import ActivityRegionFilter from './ActivityRegionFilter';

const ActivitiesFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { translation } = useSelector(state => state.theme);
  const { windowWidth } = useWindowSize()
  const history = useHistory();
  const { search } = history.location;
  const { queryParams, setQueryParams, clearFilters } = useContext(ActivitiesFilterContext)

  useEffect(() => {
    const query = qs.parse(search)
    setQueryParams(query)
  }, [search])

  const handleOpen = () => setIsOpen(!isOpen)

  const handleSubmit = e => {
    e.preventDefault()
    const query = qs.stringify(queryParams)

    history.push({
      pathname: '/admin/activities',
      search: query
    })

    handleOpen()
  }

  const toggleView = () => {
    const { view } = queryParams;
    const newQuery = {
      ...queryParams,
      view: view === 'list' ? 'table' : 'list'
    }
    const query = qs.stringify(newQuery)
    history.push({
      pathname: '/admin/activities',
      search: query
    })
  }

  return (
    <TopBar sticky>
      <Button size='large' onClick={handleOpen} variant='outlined' className='mobile_full__width'>{translation.filterResults}</Button>
      <Button size='large' onClick={toggleView} variant='outlined' className='mobile_full__width mr-5'>{translation.changeView}</Button>
      <Dialog fullScreen={windowWidth <= 768} fullWidth TransitionComponent={Transition} dir='rtl' open={isOpen} onClose={handleOpen}>
        <CustomDialogHeader title={translation.filterResults} exitButton onClose={handleOpen} />
        <DialogContent>
          <ActivityRegionFilter />
          <ActivityStatusFilter />
          <ActivityTypesFilter />
        </DialogContent>
        <DialogActionsContainer>
          <Button disabled={!queryParams} onClick={clearFilters}>{translation.clear}</Button>
          <Button onClick={handleSubmit} color='primary' variant='contained'>{translation.apply}</Button>
        </DialogActionsContainer>
      </Dialog>
    </TopBar>
  )
}

export default ActivitiesFilter
