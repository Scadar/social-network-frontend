import React, {FC, useState} from 'react';
import {Avatar, Box, Button, ButtonGroup, Paper, Stack} from '@mui/material';
import ProfileUploadPhotoDialog from './ProfileUploadPhotoDialog';
import {baseStaticUrl} from '../../services/config/query';
import {IUser} from '../../models/authModels';
import {userApi} from '../../services/userService';

type ProfilePhotoProps = {
  user: IUser
  isOwner: boolean
}

const ProfilePhotoBlock: FC<ProfilePhotoProps> = ({user, isOwner}) => {

  const [deletePhoto, {isLoading}] = userApi.useDeletePhotoProfileMutation();
  const [isOpenPhotoUploader, setIsOpenPhotoUploader] = useState(false);

  const closePhotoUploader = () => {
    setIsOpenPhotoUploader(false);
  };

  const openPhotoUploader = () => {
    setIsOpenPhotoUploader(true);
  };

  const handleDeletePhoto = () => {
    deletePhoto().unwrap();
  };

  return (
      <Paper sx={{padding: 2}}>
        <Stack
            direction="column"
            spacing={2}
        >
          <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
          >
            <Avatar
                src={`${baseStaticUrl}${user.pictureURL ?? 'emptyUser.png'}`}
                sx={{
                  height: '200px',
                  width: '200px',
                  borderRadius: 0,
                }}
            />
          </Box>
          {
              isOwner &&
              <ButtonGroup>
                <Button onClick={openPhotoUploader}>
                  Загрузить фото
                </Button>
                <Button onClick={handleDeletePhoto} disabled={isLoading} color="error">
                  Удалить фото
                </Button>
              </ButtonGroup>

          }
        </Stack>
        {
            isOpenPhotoUploader &&
            <ProfileUploadPhotoDialog open={isOpenPhotoUploader} handleClose={closePhotoUploader}/>
        }
      </Paper>
  );
};

export default ProfilePhotoBlock;
