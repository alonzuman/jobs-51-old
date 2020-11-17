import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity } from '../actions';
import { formatDate } from '../utils';

export const AddActivityContext = createContext({})

const AddActivityProvider = ({ children, onClose }) => {
  const { translation } = useSelector(state => state.theme)
  const { uid, firstName, lastName, avatar, region, phone } = useSelector(state => state.auth)
  const [activity, setActivity] = useState({
    type: '',
    description: '',
    region,
    date: formatDate(Date.now()),
    approved: false,
    total: '',
    user: {
      firstName,
      lastName,
      avatar,
      region,
      phone,
    },
    uid
  })
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    const { total, type, description, region } = activity;

    // Validate region field
    if (!region || region?.length === 0) {
      return setErrors({
        ...errors,
        region: translation.formErrors.regionError
      })
    }

    // Validate type field
    if (!type || type?.length === 0) {
      return setErrors({
        ...errors,
        type: translation.formErrors.typeError
      })
    }

    // Validate description field
    if (description.trim()?.length === 0) {
      return setErrors({
        ...errors,
        description: translation.formErrors.descriptionError
      })
    }

    // Validate total hours field
    if (isNaN(total) || total < .5 || total > 24 || !total) {
      return setErrors({
        ...errors,
        total: translation.formErrors.hoursError
      })
    }

    let fixedActivity = {
      ...activity,
      total: parseFloat(activity.total)
    }

    await dispatch(addActivity(fixedActivity))
    onClose()
  }

  const handleActivityChange = (key, value) => {
    clearErrors()
    // Validate if type is number
    if (key === 'total') {
      if (!isNaN(value) || value === '.' || value < .5 || value > 24 || value === '') {
        setActivity({
          ...activity,
          [key]: value,
        })
      } else {
        return setErrors({
          [key]: translation.formErrors.numberValidationError
        })
      }
    } else {
      setActivity({
        ...activity,
        [key]: value,
      })
    }
  }

  const clearErrors = () => setErrors({})

  const value = {
    activity,
    errors,
    handleSubmit,
    handleActivityChange
  }

  return (
    <AddActivityContext.Provider value={value}>
      {children}
    </AddActivityContext.Provider>
  )
}

export default AddActivityProvider
