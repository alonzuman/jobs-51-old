import React, { createContext, useState } from 'react';

export const ActivitiesFilterContext = createContext({})

const ActivitiesFilterProvider = ({ children }) => {
  const [queryParams, setQueryParams] = useState({
    region: '',
    type: '',
    status: '',
    view: 'list'
  })

  const handleQueryParamsChange = (key, value) => {
    return setQueryParams({
      ...queryParams,
      [key]: value
    })
  }

  const clearFilters = () => setQueryParams({
    ...queryParams,
    region: '',
    type: '',
    status: ''
  })

  const value = {
    queryParams,
    setQueryParams,
    handleQueryParamsChange,
    clearFilters
  }

  return (
    <ActivitiesFilterContext.Provider value={value}>
      {children}
    </ActivitiesFilterContext.Provider>
  )
}

export default ActivitiesFilterProvider
