import React from 'react'
import useCurrentUser from '../../../../../hooks/useCurrentUser';
import useStats from '../../../../../hooks/useStats';
import useTheme from '../../../../../hooks/useTheme';
import PageSection from '../../../../../v2/atoms/PageSection';
import PageSectionTitle from '../../../../../v2/atoms/PageSectionTitle';
import { Bar } from 'react-chartjs-2';
import { Skeleton } from '@material-ui/lab';
import { Box, Typography } from '@material-ui/core';
import { numberWithCommas } from '../../../../../utils';

const GeneralStats = () => {
  const { region } = useCurrentUser();
  const { translation, theme } = useTheme();
  const {
    isFetched,
    isFetching,
    all: {
      pendingActivityHoursByRegionCount,
      approvedActivityHoursByRegionCount,
      approvedActivityHoursCount,
      pendingActivityHoursCount
    }
  } = useStats();
  let regionsArray = [];
  let approvedHoursArray = [];
  let pendingHoursArray = [];

  if (isFetched) {
    regionsArray = Object.keys(approvedActivityHoursByRegionCount)
    approvedHoursArray = Object.values(approvedActivityHoursByRegionCount);
    pendingHoursArray = Object.values(pendingActivityHoursByRegionCount);
  }

  const data1 = {
    labels: regionsArray,
    datasets: [
      {
        data: [...approvedHoursArray],
        backgroundColor: [
          theme.palette.primary.dark,
          theme.palette.primary.dark,
          theme.palette.primary.dark,
          theme.palette.primary.dark,
          theme.palette.primary.dark,
        ],
        borderWidth: 1,
      },
    ],
  }

  const data2 = {
    labels: regionsArray,
    datasets: [
      {
        data: [...pendingHoursArray],
        backgroundColor: [
          theme.palette.border.dark,
          theme.palette.border.dark,
          theme.palette.border.dark,
          theme.palette.border.dark,
          theme.palette.border.dark,
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
  }

  if (isFetching) {
    return (
      <PageSection disableGutters>
        <Skeleton height={42} width={96} />
        <Skeleton height={24} width={144} />
        <Skeleton height={24} width={144} />
      </PageSection>
    )
  } else if (isFetched) {
    return (
      <PageSection disableGutters>
        <PageSection spaceBottom disableGutters>
          <PageSectionTitle title={translation.totalActivityHours} />
          <Box display='flex' alignItems='center' justifyContent='space-around'>
            <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
              <Typography variant='h1'>{numberWithCommas(approvedActivityHoursCount)}</Typography>
              <Typography variant='subtitle1'>{translation.approvedHours}</Typography>
            </Box>
            <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
              <Typography variant='h1'>{numberWithCommas(pendingActivityHoursCount)}</Typography>
              <Typography variant='subtitle1'>{translation.pendingHours}</Typography>
            </Box>
          </Box>
        </PageSection>
        <PageSectionTitle title={translation.approvedHours} />
        <Bar data={data1} options={options} />
        <PageSectionTitle title={translation.pendingHours} />
        <Bar data={data2} options={options} />
      </PageSection>
    )
  } else {
    return null
  }
}

export default GeneralStats