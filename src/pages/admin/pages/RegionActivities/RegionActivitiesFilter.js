import { Button } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ListIcon from '@material-ui/icons/List';
import TableChartIcon from '@material-ui/icons/TableChart';

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

const BarContainer = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
`

const RegionActivitiesFilter = ({ view, handleView }) => {
  const { translation } = useSelector(state => state.theme);

  return (
    <Container>
      <BarContainer>
        <Button size='big' variant='outlined' className='mobile_full__width' onClick={handleView}>
          {translation.changeView}
          {view === 'list' && <ListIcon className='mr-5' />}
          {view === 'table' && <TableChartIcon className='mr-5 small__icon' />}
        </Button>
      </BarContainer>
    </Container>
  )
}

export default RegionActivitiesFilter
