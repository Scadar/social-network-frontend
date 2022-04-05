import React, {FC} from 'react';
import {Box} from '@mui/material';
import Loading from '../../components/UI/Loading';
import FileList from './FileList';
import FlexCenter from '../../components/UI/FlexCenter';
import {IFile} from '../../models/file';

type DiskCenterPanelProps = {
  files?: IFile[]
  onDoubleClickFile: (file: IFile) => void
  isLoading: boolean
}

const DiskCenterPanel: FC<DiskCenterPanelProps> = ({files, onDoubleClickFile, isLoading}) => {

  if (isLoading) {
    return <FlexCenter sx={{height: '100%'}}><Loading/></FlexCenter>;
  }

  return (
      <Box sx={{p: 1, height: '100%'}}>
        <FileList
            files={files}
            onDoubleClickFile={onDoubleClickFile}
        />
      </Box>
  );
};

export default DiskCenterPanel;
