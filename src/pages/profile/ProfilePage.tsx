import React, {FC, useEffect, useMemo, useState} from 'react';
import {Box, Stack} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useAuthenticatedUser} from '../../hooks/useAuthenticatedUser';
import {userApi} from '../../services/userService';
import {IUser} from '../../models/authModels';
import Loading from '../../components/UI/Loading';
import PageInfoBlock from './PageInfoBlock';
import ProfilePhotoBlock from './ProfilePhotoBlock';

const ProfilePage: FC = () => {

  const [user, setUser] = useState<IUser | null>(null);
  const me = useAuthenticatedUser();
  const {userId: queryUserId} = useParams<{ userId: string }>();
  const isOwner = useMemo(() => me._id === queryUserId, [me, queryUserId]);

  const {data: queryUser, isLoading: queryUserIsLoading}
      = userApi.useFetchUserByIdQuery(queryUserId!, {skip: isOwner});

  useEffect(() => {
    if (isOwner) {
      setUser(me);
    } else if (queryUser) {
      setUser(queryUser);
    }
  }, [queryUser, isOwner, me]);

  if (!user || queryUserIsLoading) {
    return <Loading/>;
  }

  return (
      <Box
        sx={theme => ({
          flexGrow: 1,
          mt: theme.layoutSize.spacing
        })}
      >
        <Stack spacing={2}>
          <Stack spacing={2} direction="row">
            <ProfilePhotoBlock user={user} isOwner={isOwner}/>
            <Box sx={{flexGrow: 1}}>
              <PageInfoBlock user={user}/>
            </Box>
          </Stack>
        </Stack>
      </Box>
  );
};

export default ProfilePage;
