import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import PageSection from '../../../v2/atoms/PageSection'
import PageHeader from '../../../v2/organisms/PageHeader'

const ActivityPageHeader = ({ loading }) => {
  const { translation } = useSelector(state => state.theme)
  return (
    <PageSection>
      <PageHeader loading={loading} spaceTop title={translation.activity} />
    </PageSection>
  )
}

export default ActivityPageHeader
