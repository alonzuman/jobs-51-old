import { Typography } from '@material-ui/core';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { roundNumber } from '../../utils';

const DoughnutContainer = styled.div`
  height: fit-content;
  width: fit-content;
  position: relative;
`

const DoughnutLabel = styled.div`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const ActivitiesProgress = ({ approved, pending }) => {
  const { theme, translation } = useSelector(state => state.theme);
  const remainder = 100 - (approved + pending);

  const data = {
    labels: [
      translation.approved,
      translation.pending,
      translation.remaining,
    ],
    datasets: [{
      data: [pending, approved, remainder],
      backgroundColor: [
        theme.palette.primary.main,
        theme.palette.primary.light,
        theme.palette.background.default
      ],
      hoverBackgroundColor: [
        theme.palette.primary.main,
        theme.palette.primary.light,
        theme.palette.background.default
      ]
    }]
  };

  const options = {
    responsive: true,
    cutoutPercentage: 90,
    legend: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  }

  return (
    <DoughnutContainer>
      <DoughnutLabel>
        <Typography variant='h1'>
          {roundNumber(approved)}
        </Typography>
        <Typography variant='subtitle1'>
          {translation.approvedHours}
        </Typography>
      </DoughnutLabel>
      <Doughnut options={options} data={data} />
    </DoughnutContainer>
  )
}

export default ActivitiesProgress;
