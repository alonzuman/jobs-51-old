import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRegion, deleteRegion, getLocations } from '../../../../../actions/constants';

export const EditRegionsContext = createContext({})

const EditRegionsProvider = ({ children }) => {
  const { translation } = useSelector(state => state.theme)
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState({})
  const [regionToAdd, setRegionToAdd] = useState('')
  const { isFetched,  regions } = useSelector(state => state.constants.locations);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isFetched) {
      dispatch(getLocations())
    }
  }, [isFetched])

  const handleRegionToAddChange = e => {
    setErrors({});
    setRegionToAdd(e.target.value)
  }

  const handleEditing = () => setIsEditing(v => !v)

  const handleRegionAdd = async e => {
    e.preventDefault()
    if (regionToAdd.trim()?.length !== 0) {
      await dispatch(addRegion(regionToAdd))
      setRegionToAdd('')
    } else {
      setErrors({
        ...errors,
        region: translation.formErrors.regionError
      })
    }
  }

  const handleRegionDelete = async region => {
    dispatch(deleteRegion(region))
  }

  const value = {
    isEditing,
    regions,
    regionToAdd,
    errors,
    setRegionToAdd,
    handleEditing,
    handleRegionAdd,
    handleRegionDelete,
    handleRegionToAddChange,
  };

  return (
    <EditRegionsContext.Provider value={value}>
      {children}
    </EditRegionsContext.Provider>
  )
}

export default EditRegionsProvider;
