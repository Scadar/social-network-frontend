import React, {FC} from 'react';
import {Box, Divider, Link, Typography} from '@mui/material';
import UserAvatar from './UserAvatar';
import {IUser} from '../../models/authModels';

type UserCardProps = {
  user: IUser
  withDivider?: boolean
  size?: 'small' | 'medium' | 'large'
}

const UserCard: FC<UserCardProps> = ({
                                       user,
                                       children,
                                       withDivider,
                                       size = 'medium',
                                     }) => {
  const {firstName, lastName, _id} = user;
  return (
      <>
        <Box
            sx={{
              display: 'flex',
              alignItems: size === 'small' || size === 'medium' ? 'center' : undefined,
            }}
        >
          <UserAvatar
              user={user}
              size={size}
          />
          <Box
              sx={
                size === 'small' || size === 'medium' ?
                    {
                      flexGrow: 1,
                      pl: 1,
                    } : {
                      flexGrow: 1,
                      paddingLeft: 2,
                      paddingTop: 1,
                    }
              }
          >
            <Typography
                variant="body2"
                component={Link}
                href={`/profile/${_id}`}
                sx={{
                  textDecoration: 'none',
                  fontWeight: 'medium',
                }}
                color="primary"
            >
              {`${firstName} ${lastName}`}
            </Typography>
          </Box>
          {children}
        </Box>
        {withDivider && <Divider sx={{my: size === 'small' || size === 'medium' ? 1 : 2}}/>}
      </>
  );
};

export default UserCard;
