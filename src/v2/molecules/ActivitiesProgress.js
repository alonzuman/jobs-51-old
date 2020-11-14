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

const DoughnutLabel = styled.h2`
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const ActivitiesProgress = ({ approved, pending }) => {
  const { theme, translation } = useSelector(state => state.theme);

  console.log(approved, pending)

  const data = {
    labels: [
      translation.approved,
      translation.pending,
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        theme.palette.primary.main,
        theme.palette.primary.light,
      ],
      hoverBackgroundColor: [
        theme.palette.primary.main,
        theme.palette.primary.light,
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
      <DoughnutLabel>{roundNumber(approved)} {translation.approvedHours}</DoughnutLabel>
      <Doughnut options={options} data={data} />
    </DoughnutContainer>
  )
}

export default ActivitiesProgress;
