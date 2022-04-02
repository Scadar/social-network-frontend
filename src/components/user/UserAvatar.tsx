import React, {FC} from 'react';
import {Avatar, Link, SxProps} from '@mui/material';
import {baseStaticUrl} from '../../services/config/query';
import {IUser} from '../../models/authModels';

type UserAvatarSize = 'small' | 'medium' | 'large';

type UserAvatarProps = {
  user: IUser
  size?: UserAvatarSize;
  stopPropagation?: boolean
  sx?: SxProps
  alt?: string
  disableLink?: boolean
}

const getWidthAndHeightBySize = (size: UserAvatarSize) => {
  switch (size) {
    case 'small':
      return {
        width: 34,
        height: 34,
      };
    case 'medium':
      return {
        width: 50,
        height: 50,
      };
    case 'large':
      return {
        width: 80,
        height: 80,
      };
  }
};

const pictureURLOrLetters = (firstName: string, lastName: string, pictureURL?: string) => {
  if (pictureURL) {
    return {
      src: `${baseStaticUrl}${pictureURL}`,
    };
  } else {
    return {
      children: `${firstName[0]}${lastName[0]}`,
    };
  }
};

const getLinkProps = (disableLink: boolean, userId: string) => {
  if (disableLink) {
    return {};
  } else {
    return {
      component: Link,
      href: `/profile/${userId}`,
    };
  }
};

const UserAvatar: FC<UserAvatarProps> = ({
                                           user,
                                           alt,
                                           size = 'medium',
                                           stopPropagation,
                                           sx,
                                           disableLink = false,
                                         }) => {
  const {pictureURL, firstName, lastName, _id} = user;
  return (
      <Avatar
          alt={alt || 'User'}
          sx={{
            ...getWidthAndHeightBySize(size),
            ...sx,
          }}
          {...pictureURLOrLetters(firstName, lastName, pictureURL)}
          {...getLinkProps(disableLink, _id)}
          onClick={(e: any) => stopPropagation ? e.stopPropagation() : undefined}
      />
  );
};

export default UserAvatar;
