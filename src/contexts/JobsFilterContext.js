import React, { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import qs from 'query-string';

export const JobsFilterContext = createContext({})

const JobsFilterProvider = ({ children }) => {
  const [query, setQuery] = useState({
    location: '',
    skills: [],
    industry: '',
    dateCreated: 0
  });
  const { push } = useHistory();
  const { search } = useHistory().location;

  const handleJobsQueryChange = (key, value) => {
    setQuery({
      ...query,
      [key]: value
    })
  }

  const clearFilters = () => setQuery({
    location: '',
    skills: [],
    industry: '',
    dateCreated: 0
  })

  const handleSubmit = () => {
    const stringifiedQuery = qs.stringify(query);
    push({
      pathname: '/jobs',
      search: stringifiedQuery
    })
  }

  useEffect(() => {
    const parsedQuery = qs.parse(search);
    setQuery({
      ...query,
      ...parsedQuery,
    })
  }, [search])

  const value = {
    query,
    handleJobsQueryChange,
    clearFilters,
    handleSubmit
  }

  return (
    <JobsFilterContext.Provider value={value}>
      {children}
    </JobsFilterContext.Provider>
  )
}

export default JobsFilterProvider
