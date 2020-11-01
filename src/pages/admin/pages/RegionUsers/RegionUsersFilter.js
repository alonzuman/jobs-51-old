import { Button } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import ListIcon from '@material-ui/icons/List';
import TableChartIcon from '@material-ui/icons/TableChart';
import TopBar from '../../../../v2/layout/TopBar';

const RegionUsersFilter = ({ view, handleView }) => {
  const { translation } = useSelector(state => state.theme);

  return (
    <TopBar sticky>
      <Button size='big' variant='outlined' className='mobile_full__width mnw-fc' onClick={handleView}>
        {translation.changeView}
        {view === 'list' && <ListIcon className='mr-5' />}
        {view === 'table' && <TableChartIcon className='mr-5 small__icon' />}
      </Button>
    </TopBar>
  )
}

export default RegionUsersFilter
