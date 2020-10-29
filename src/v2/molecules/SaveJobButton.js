import React from 'react'
import { IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { saveJob, unsaveJob } from '../../actions';

const SaveJobButton = ({ className, job }) => {
  const dispatch = useDispatch()
  const { uid } = useSelector(state => state.auth)
  const isSaved = job?.savedIds?.includes(uid)

  const handleFavorite = () => {
    if (isSaved) {
      dispatch(unsaveJob(uid, job.id, job))
    } else {
      dispatch(saveJob(uid, job.id, job))
    }
  }

  if (uid === job?.uid) {
    return null
  } else {
    return (
      <IconButton className={className} size='small' onClick={handleFavorite}>
        {isSaved ? <FavoriteIcon className='red' /> : <FavoriteBorderIcon />}
      </IconButton>
    )
  }
}

export default SaveJobButton
