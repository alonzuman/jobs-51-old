import React from 'react'
import { useSelector } from 'react-redux'
import useCurrentUser from '../../../../../hooks/useCurrentUser';
import useStats from '../../../../../hooks/useStats';
import useTheme from '../../../../../hooks/useTheme';
import PageSection from '../../../../../v2/atoms/PageSection';
import PageSectionTitle from '../../../../../v2/atoms/PageSectionTitle';

const RegionStats = () => {
  const { region } = useCurrentUser();
  const { translation } = useTheme();
  const { isFetching, all } = useStats();

  console.log(isFetching, all)

  if (isFetching) {
    return (
      <h1>skeletons</h1>
    )
  } else {
    return (
      <PageSection disableGutters>
        <PageSectionTitle title={`${translation.generalStats} ${translation.region} ${region}`} />
      </PageSection>
    )
  }
}

export default RegionStats
