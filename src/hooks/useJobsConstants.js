import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getJobsConstants, getSkills } from '../actions';

const useJobsConstants = () => {
  const dispatch = useDispatch()
  const { listedJobLocations, listedJobSkills, jobIndustries, skills } = useSelector(state => state.constants);
  const { isFetching: locationsFetching, isFetched: locationsFetched, all: listedLocations } = listedJobLocations;
  const { isFetching: listedSkillsFetching, isFetched: listedSkillsFetched, all: listedSkills } = listedJobSkills;
  const { isFetching: skillsFetching, isFetched: skillsFetched, all: allSkills } = skills;
  const { isFetching: industriesFetching, isFetched: industriesFetched, all: industries } = jobIndustries;

  const isFetching = locationsFetching || listedSkillsFetching || industriesFetching || skillsFetching;
  const isFetched = locationsFetched || listedSkillsFetched || industriesFetched || skillsFetched;

  useEffect(() => {
    if (!locationsFetched && !listedSkillsFetched && !industriesFetched) {
      dispatch(getJobsConstants())
    }
  }, [])

  useEffect(() => {
    if (!skillsFetched) {
      dispatch(getSkills())
    }
  }, [])

  return {
    isFetching,
    isFetched,
    listedLocations,
    listedSkills,
    industries,
    skills
  }
}


export default useJobsConstants;
