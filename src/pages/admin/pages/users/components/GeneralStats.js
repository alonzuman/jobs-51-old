import React from 'react'
import useCurrentUser from '../../../../../hooks/useCurrentUser';
import useStats from '../../../../../hooks/useStats';
import useTheme from '../../../../../hooks/useTheme';
import PageSection from '../../../../../v2/atoms/PageSection';
import PageSectionTitle from '../../../../../v2/atoms/PageSectionTitle';
import { Bar } from 'react-chartjs-2';
import { Skeleton } from '@material-ui/lab';
import { Box, Divider, Typography } from '@material-ui/core';
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

  const data1 = {
    labels: isFetched ? Object.keys(approvedActivityHoursByRegionCount) : [],
    datasets: [
      {
        data: isFetched ? Object.values(approvedActivityHoursByRegionCount) : [],
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
    labels: isFetched ? Object.keys(pendingActivityHoursByRegionCount) : [],
    datasets: [
      {
        data: isFetched ? Object.values(pendingActivityHoursByRegionCount) : [],
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
    }
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
          <Box className='mt-1' display='flex' alignItems='center' justifyContent='space-around'>
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
        <Divider className='mt-2 mb-1' />
        <PageSection disableGutters spaceBottom transparent>
          <PageSectionTitle title={translation.approvedHours} />
          <Bar data={data1} options={options} />
        </PageSection>
        <PageSection disableGutters spaceBottom transparent>
          <PageSectionTitle title={translation.pendingHours} />
          <Bar data={data2} options={options} />
        </PageSection>
      </PageSection>
    )
  } else {
    return null
  }
}

export default GeneralStats
