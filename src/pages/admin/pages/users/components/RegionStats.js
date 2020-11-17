import React from 'react'
import useCurrentUser from '../../../../../hooks/useCurrentUser';
import useStats from '../../../../../hooks/useStats';
import useTheme from '../../../../../hooks/useTheme';
import PageSection from '../../../../../v2/atoms/PageSection';
import PageSectionTitle from '../../../../../v2/atoms/PageSectionTitle';
import { Bar } from 'react-chartjs-2';
import { Skeleton } from '@material-ui/lab';

const RegionStats = () => {
  const { region } = useCurrentUser();
  const { translation, theme } = useTheme();
  const { isFetched, isFetching, all: { pendingActivityHoursByRegionCount, approvedActivityHoursByRegionCount } } = useStats();

  const data = {
    labels: [translation.pendingHours, translation.approvedHours],
    datasets: [
      {
        label: 'hi',
        data: [isFetched ? pendingActivityHoursByRegionCount[region] : 0, isFetched ? approvedActivityHoursByRegionCount[region] : 0],
        backgroundColor: [
          theme.palette.border.main,
          theme.palette.primary.dark,
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
        <PageSectionTitle title={`${translation.generalStats} ${translation.region} ${region}`} />
        <Bar data={data} options={options} />
      </PageSection>
    )
  } else {
    return null
  }
}

export default RegionStats
