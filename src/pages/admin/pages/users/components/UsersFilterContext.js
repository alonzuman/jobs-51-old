import React, { createContext, useState } from 'react';

export const UsersFilterContext = createContext({})

const UsersFilterProvider = ({ children }) => {
  const [queryParams, setQueryParams] = useState({
    fullName: '',
    region: '',
    role: '',
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
    fullName: '',
    region: '',
    role: '',
  })

  const value = {
    queryParams,
    setQueryParams,
    handleQueryParamsChange,
    clearFilters
  }

  return (
    <UsersFilterContext.Provider value={value}>
      {children}
    </UsersFilterContext.Provider>
  )
}

export default UsersFilterProvider
