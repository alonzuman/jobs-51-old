import { Button, CircularProgress, FormGroup, IconButton, List, ListItem, ListItemText, TextField } from '@material-ui/core'
import React, { useContext } from 'react'
import PageSection from '../../../../../components/atoms/PageSection'
import PageSectionTitle from '../../../../../components/atoms/PageSectionTitle'
import { EditRegionsContext } from './EditRegionsContext'
import RegionCard from './RegionCard'
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux'
import { Skeleton } from '@material-ui/lab'

const EditRegions = () => {
  const { translation } = useSelector(state => state.theme)
  const { isFetching, isUpdating, isDeleting } = useSelector(state => state.constants.locations)
  const { isEditing, handleEditing, regions, regionToAdd, setRegionToAdd, handleRegionAdd, handleRegionToAddChange, errors } = useContext(EditRegionsContext)


  if (isFetching) {
    return (
      <PageSection transparent disableGutters>
        <PageSectionTitle title={<Skeleton height={32} width={104} />} />
        <ListItem disableGutters>
          <ListItemText primary={<Skeleton height={16} width={144} />} />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary={<Skeleton height={16} width={96} />} />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary={<Skeleton height={16} width={196} />} />
        </ListItem>
      </PageSection>
    )
  } else {
    return (
      <PageSection transparent disableGutters>
        <PageSectionTitle
          title={translation.manageRegions}
          action={<IconButton onClick={handleEditing} size='small'>{isEditing ? <CloseIcon fontSize='inherit' /> : <EditIcon fontSize='inherit' />}</IconButton>}
        />
        <List>
          {regions.map((region, i) => {
            return <RegionCard key={i} region={region} />
          })}
        </List>
        {isEditing &&
          <form onSubmit={handleRegionAdd}>
            <FormGroup>
              <TextField
                size='small'
                variant='outlined'
                placeholder={translation.placeholders.addRegion}
                label={translation.addRegion}
                value={regionToAdd}
                error={Boolean(errors.region)}
                helperText={errors.region}
                onChange={handleRegionToAddChange}
              />
            </FormGroup>
            <Button
              type='submit'
              size='large'
              color='primary'
              variant='contained'
              disabled={isUpdating || isDeleting}
            >{isUpdating ? <CircularProgress className='button-spinner' /> : translation.addRegion}</Button>
        </form>}
      </PageSection>
    )
  }
}

export default EditRegions
