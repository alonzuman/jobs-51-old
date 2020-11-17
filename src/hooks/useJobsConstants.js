import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getJobsConstants } from '../actions';

const useJobsConstants = () => {
  const dispatch = useDispatch()
  const { listedJobLocations, listedJobSkills, jobIndustries } = useSelector(state => state.constants);
  const { isFetching: locationsFetching, isFetched: locationsFetched, all: listedLocations } = listedJobLocations;
  const { isFetching: listedSkillsFetching, isFetched: listedSkillsFetched, all: listedSkills } = listedJobSkills;
  const { isFetching: industriesFetching, isFetched: industriesFetched, all: industries } = jobIndustries;

  const isFetching = locationsFetching || listedSkillsFetching || industriesFetching;
  const isFetched = locationsFetched || listedSkillsFetched || industriesFetched;

  useEffect(() => {
    if (!locationsFetched && !listedSkillsFetched && !industriesFetched) {
      dispatch(getJobsConstants())
    }
  }, [])

  return {
    isFetching,
    isFetched,
    listedLocations,
    listedSkills,
    industries
  }
}


export default useJobsConstants;
