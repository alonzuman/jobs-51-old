import React from 'react'
import TopBar from '../layout/TopBar'
import { Skeleton } from '@material-ui/lab'
import { Container } from '@material-ui/core'
import PageContainer from '../layout/PageContainer'

const PageSkeleton = ({ children }) => {
  return (
    <>
      <TopBar backButton={true} title={<Skeleton width={300} height={32} />} />
      <PageContainer>
        { children }
      </PageContainer>
    </>
  )
}

export default PageSkeleton
