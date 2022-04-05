import React, {FC} from 'react';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import {Box, Stack, Typography} from '@mui/material';
import {IFile} from '../../models/file';
import FlexCenter from '../../components/UI/FlexCenter';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

type FileListType = {
  files?: IFile[]
  onDoubleClickFile: (file: IFile) => void
}

const FileList: FC<FileListType> = ({files, onDoubleClickFile}) => {

  const share = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    console.log('e');
  };

  return (
      <Box sx={{height: '100%'}}>
        {
          !files || !files.length
              ?
              <FlexCenter sx={{height: '100%'}}>
                <Typography>Папка пуста</Typography>
              </FlexCenter>
              :
              files.map(file => {
                return (
                    <Stack
                        key={file._id}
                        direction="row"
                        spacing={1}
                        sx={theme => ({
                          p: 1,
                          borderRadius: 1,
                          '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                          },
                        })}
                        onDoubleClick={() => onDoubleClickFile(file)}
                    >
                      <FolderOpenOutlinedIcon/>
                      <Typography
                          noWrap
                          sx={{
                            overflow: 'hidden',
                            flexGrow: 1,
                            cursor: 'default',
                          }}
                      >
                        {file.name}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ml: 1}} alignItems="center">
                        <Typography
                            noWrap
                            color="text.secondary"
                            variant="caption"
                            sx={{cursor: 'default'}}
                        >
                          {file.createdAt.slice(0, 10)}
                        </Typography>
                        <Typography
                            noWrap
                            color="text.secondary"
                            variant="caption"
                            sx={{cursor: 'default'}}
                        >
                          {file.size}
                        </Typography>
                        <Box
                            sx={{
                              width: '24px',
                              height: '24px',
                            }}
                        >
                          <ShareOutlinedIcon onClick={share} sx={{cursor: 'pointer'}}/>
                        </Box>
                      </Stack>
                    </Stack>
                );
              })
        }
      </Box>
  );
};

export default FileList;
