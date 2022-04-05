import React, {FC} from 'react';
import {Box, IconButton, Stack, Typography} from '@mui/material';
import Loading from '../../components/UI/Loading';
import FileList from './FileList';
import FlexCenter from '../../components/UI/FlexCenter';
import {IFile} from '../../models/file';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

type DiskCenterPanelProps = {
  selectedFile?: IFile
  files?: IFile[]
  onDoubleClickFile: (file: IFile) => void
  isLoading: boolean
  onBack: () => void
}

const DiskCenterPanel: FC<DiskCenterPanelProps> = ({selectedFile, files, onDoubleClickFile, isLoading, onBack}) => {

  if (isLoading) {
    return <FlexCenter sx={{height: '100%'}}><Loading/></FlexCenter>;
  }

  return (
      <Box sx={{p: 1, minHeight: '100%', display: 'flex', flexDirection: 'column'}}>
        {
            selectedFile &&
            <Stack
                direction={'row'}
                spacing={1}
                sx={{
                  my: 1,
                }}
                alignItems={'center'}
            >
              <IconButton onClick={onBack}>
                <ArrowBackOutlinedIcon/>
              </IconButton>
              <Stack
                  direction={'row'}
                  alignItems={'center'}
                  sx={{
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
              >
                <Typography variant="h5" noWrap>
                  {selectedFile.name}
                </Typography>
                <MoreVertOutlinedIcon/>
              </Stack>
            </Stack>
        }
        <Box sx={{flexGrow: 1, display: 'flex'}}>
          <FileList
              files={files}
              onDoubleClickFile={onDoubleClickFile}
          />
        </Box>
      </Box>
  );
};

export default DiskCenterPanel;
