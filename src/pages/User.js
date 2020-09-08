import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../actions/users'
import { Avatar, Box, Typography, Container, Grid, Chip, IconButton } from '@material-ui/core'
import UserRoleActions from './admin/components/UserRoleActions'
import TopBar from '../components/layout/TopBar'
import { Skeleton } from '@material-ui/lab'
import { checkPermissions } from '../utils'
import PageContainer from '../components/layout/PageContainer'
import ChipsSkeleton from '../components/skeletons/ChipsSkeleton'
import StatsList from '../components/lists/StatsList'
import ImageLightbox from '../components/general/ImageLightbox'
import PaperContainer from '../components/layout/PaperContainer'
import CustomChip from '../components/cards/CustomChip'
import ToggleVolunteer from '../components/forms/profile/ToggleVolunteer'
import ChangeRegion from '../components/forms/profile/ChangeRegion'
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

const User = ({ match }) => {
  const [imageOpen, setImageOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const { translation } = useSelector(state => state.theme)
  const { role } = useSelector(state => state.auth)
  const { loading, user } = useSelector(state => state.users)
  const uid = match.url.split('/')[2]
  const dispatch = useDispatch()

  useEffect(() => { dispatch(getUser(uid)) }, [])

  const items = [
    {
      label: translation.approved,
      big: user?.activities?.approved.toFixed(1),
      link: `/users/${uid}/activities`,
      marker: "#4caf50",
    },
    {
      label: translation.pending,
      big: user?.activities?.pending.toFixed(1),
      link: `/users/${uid}/activities`,
      marker: "#e15757",
    },
  ];

  return (
    <>
      <TopBar
        sticky={true}
        backButton={true}
        title={
          !loading ? (
            `${user?.firstName} ${user?.lastName}`
          ) : (
            <Skeleton width={180} />
          )
        }
        subtitle={
          !loading ? (
            user.serviceYear ? (
              `${translation.serviceYear} ${user?.serviceYear}`
            ) : (
              ""
            )
          ) : (
            <Skeleton width={100} />
          )
        }
        actionOnClick={() => setEditing(!editing)}
        action={
          checkPermissions(role) > checkPermissions(user?.role) && (
            <IconButton>{editing ? <DoneIcon /> : <EditIcon />}</IconButton>
          )
        }
      >
        {!loading ? (
          <Avatar
            style={{ cursor: "pointer" }}
            onClick={user?.avatar ? () => setImageOpen(true) : null}
            className="avatar__md"
            src={user?.avatar}
            alt={user?.firstName}
          >
            {user?.firstName?.charAt(0)}
          </Avatar>
        ) : (
          <Skeleton variant="circle" className="avatar__md" />
        )}
      </TopBar>
      <PageContainer className="flex justify__between align__center flex__column">
        {editing && checkPermissions(role) >= 3 && (
          <PaperContainer style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {translation.userType}
                </Typography>
                <UserRoleActions />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {translation.region}
                </Typography>
                <ChangeRegion />
              </Grid>
            </Grid>
            <ToggleVolunteer user={user} />
          </PaperContainer>
        )}
        {!editing && user?.lookingForJob && (
          <CustomChip
            style={{ marginBottom: "1rem" }}
            color="primary"
            label={user.lookingForJob ? translation.iAmLookingForAJob : ""}
          />
        )}
        {!editing && user?.volunteer && user?.region && (
          <PaperContainer style={{ marginBottom: "1rem" }}>
            {!loading ? (
              <>
                <Typography
                  style={{ marginBottom: ".5rem" }}
                  variant="subtitle1"
                >
                  {!loading ? (
                    `${translation.totalHoursInRegion} ${user?.region}`
                  ) : (
                    <Skeleton height={18} width={80} />
                  )}
                </Typography>
                <StatsList items={items} />
              </>
            ) : (
              <div className="flex justify__between align__center">
                <Skeleton
                  className="border__radius_1"
                  style={{ marginLeft: "1rem" }}
                  height={180}
                  width={"100%"}
                />
                <Skeleton
                  className="border__radius_1"
                  height={180}
                  width={"100%"}
                />
              </div>
            )}
          </PaperContainer>
        )}
        {!editing && (
          <PaperContainer style={{ marginBottom: "1rem" }}>
            <Typography variant="subtitle1">
              {!editing && !loading ? (
                translation.contactDetails
              ) : (
                <Skeleton height={18} width={70} />
              )}
            </Typography>
            <Typography variant="body1">
              {!loading ? user?.email : <Skeleton height={32} width={120} />}
            </Typography>
            <Typography variant="body1">
              {!loading ? (
                user?.phone ? (
                  user?.phone
                ) : (
                  ""
                )
              ) : (
                <Skeleton height={32} width={90} />
              )}
            </Typography>
            {user?.preferredLocation && (
              <Typography variant="body1">
                {!loading ? (
                  user?.preferredLocation
                ) : (
                  <Skeleton height={32} width={110} />
                )}
              </Typography>
            )}
          </PaperContainer>
        )}
        {!loading ? (
          user?.lastPosition &&
          !editing && (
            <PaperContainer style={{ marginBottom: "1rem" }}>
              <Typography variant="subtitle1">
                {translation.lastPosition}
              </Typography>
              <Typography variant="body1">{user?.lastPosition}</Typography>
            </PaperContainer>
          )
        ) : (
          <Skeleton height={32} width={110} />
        )}
        {!editing &&!loading ? (
          user?.skills &&
          user.skills.length > 0 && (
            <PaperContainer style={{ marginBottom: "1rem" }}>
              <Typography variant="subtitle1">
                {translation.skillsInterestedIn}
              </Typography>
              <Grid container spacing={1}>
                {user?.skills?.map((skill, index) => (
                  <Grid item key={index}>
                    <Chip label={skill} />
                  </Grid>
                ))}
              </Grid>
            </PaperContainer>
          )
        ) : (
          !editing && <ChipsSkeleton
            style={{ marginBottom: ".5rem", marginTop: ".5rem" }}
            count={4}
          />
        )}
        <ImageLightbox
          open={imageOpen}
          onClose={() => setImageOpen(false)}
          imgUrl={user?.avatar}
        />
      </PageContainer>
    </>
  );
}

export default User
