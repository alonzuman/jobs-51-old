import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const DoughnutContainer = styled.div`
  height: fit-content;
  width: fit-content;
  position: relative;
`

const AvatarContainer = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`

const ActivitiesProgress = ({ approved, pending, children, size = 64 }) => {
  const { theme, translation } = useSelector(state => state.theme);
  const remainder = 100 - (approved + pending);

  const data = {
    labels: [
      translation.approved,
      translation.pending,
      translation.remaining,
    ],
    datasets: [{
      borderWidth: 0,
      data: [approved, pending, remainder],
      backgroundColor: [
        theme.palette.primary.main,
        theme.palette.background.dark,
        theme.palette.background.light
      ],
      hoverBackgroundColor: [
        theme.palette.primary.main,
        theme.palette.background.dark,
        theme.palette.background.light
      ]
    }]
  };

  const options = {
    responsive: true,
    cutoutPercentage: 90,
    legend: false,
    tooltips: {
      enabled: false
    },
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
      <Doughnut height={size} width={size} borderColor='#000' options={options} data={data} />
      <AvatarContainer>
        {children}
      </AvatarContainer>
    </DoughnutContainer>
  )
}

export default ActivitiesProgress;
