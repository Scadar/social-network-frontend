import React, {FC, useState} from 'react';
import {diskApi} from '../../services/diskService';
import {Box, Button, Paper, TextField} from '@mui/material';
import Loading from '../../components/UI/Loading';
import {toast} from 'react-toastify';

const DiskCenterPanel: FC = () => {

  const [dirName, setDirName] = useState('');

  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const [createDir] = diskApi.useCreateDirMutation();
  const {data, isLoading, error} = diskApi.useGetFilesByParentQuery({parentId: parentId});

  const handleCreateDir = () => {
    if (!dirName) return;

    createDir({name: dirName})
        .unwrap()
        .then(() => {
          toast.success('Папка создана');
          setDirName('');
        })
        .catch(() => {
          toast.error('Ошибка');
        });
  };

  if (isLoading) {
    return <Loading/>;
  }

  return (
      <Box sx={{p: 1}}>
        <Box>
          <TextField value={dirName} onChange={e => setDirName(e.target.value)}/>
          <Button onClick={handleCreateDir}>Создать</Button>
        </Box>
        {
            data && data.length === 0 && <Box>Пусто</Box>
        }
        {
          data?.map(file => {
            return (
                <Paper variant={'outlined'} key={file._id}>
                  {file.name}
                </Paper>
            );
          })
        }

      </Box>
  );
};

export default DiskCenterPanel;
