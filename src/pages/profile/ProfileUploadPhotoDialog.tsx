import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Close} from '@mui/icons-material';
import FlexCenter from '../../components/UI/FlexCenter';
import {userApi} from '../../services/userService';
import {toast} from 'react-toastify';
import AvatarEditor from 'react-avatar-editor';

type ProfileUploadPhotoDialogProps = {
  open: boolean
  handleClose: () => void
}

function dataURLtoFile(dataurl: any, filename: any) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type: mime});
}

const ProfileUploadPhotoDialog: FC<ProfileUploadPhotoDialogProps> = ({open, handleClose}) => {

  const [file, setFile] = useState<(File & { preview: string }) | null>(null);
  const [updatePhoto, {isLoading}] = userApi.useUpdatePhotoProfileMutation();
  const [scale, setScale] = useState(1);
  const cropper = useRef(null);

  const saveNewPhoto = async () => {
    //@ts-ignore
    const newImg = dataURLtoFile(cropper.current.getImageScaledToCanvas().toDataURL());

    const formData = new FormData();
    formData.append('img', newImg!);
    updatePhoto(formData)
        .unwrap()
        .then(() => {
          handleClose();
        })
        .catch(() => {
          toast.error('Ошибка');
        });

  };

  const clearFile = useCallback(() => {
    setFile(null);
  }, [setFile]);

  useEffect(() => {
    return () => {
      clearFile();
    };
  }, [clearFile]);

  const {open: openUploader} = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: 'image/png,image/jpeg,image/jpg',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      const f = acceptedFiles[0];
      setFile(Object.assign(f, {
        preview: URL.createObjectURL(f),
      }));
    },
  });

  return (
      <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="xl"
      >
        <DialogTitle>
          <Stack justifyContent="space-between" direction="row" alignItems="center">
            <Typography variant="h5">
              Загрузка новой фотографии
            </Typography>
            <IconButton onClick={handleClose}>
              <Close/>
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider/>
        <DialogContent>
          {
            file
                ?
                <>
                  <Box>
                    <AvatarEditor
                        //@ts-ignore
                        ref={cropper}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        image={file}
                        width={200}
                        height={200}
                        scale={scale}
                    />
                  </Box>
                  <Slider
                      size="small"
                      min={0.7}
                      max={3}
                      step={0.1}
                      value={scale}
                      onChange={(e, newValue) => setScale(newValue as number)}
                  />
                  <FlexCenter>
                    <Stack
                        sx={{mt: 2}}
                        spacing={2}
                        direction="row"
                    >
                      <Button variant="contained" onClick={saveNewPhoto} disabled={isLoading}>
                        Сохранить и продолжить
                      </Button>
                      <Button onClick={clearFile} disabled={isLoading}>
                        Вернуться назад
                      </Button>
                    </Stack>
                  </FlexCenter>
                </>
                :
                <>
                  <DialogContentText textAlign="center">
                    Друзьям будет проще узнать вас, если вы загрузите свою настоящую фотографию.
                    Вы можете загрузить изображение в формате JPG, JPEG или PNG.
                  </DialogContentText>
                  <FlexCenter>
                    <Button
                        onClick={openUploader}
                        sx={{mt: 2}}
                    >
                      Выбрать файл
                    </Button>
                  </FlexCenter>
                </>
          }
        </DialogContent>
      </Dialog>
  );
};

export default ProfileUploadPhotoDialog;
