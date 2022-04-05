import React, {FC, useEffect, useMemo, useState} from 'react';
import PageWrapper from '../../layouts/pageWrapper/PageWrapper';
import DiskCenterPanel from './DiskCenterPanel';
import DiskTopPanel from './DiskTopPanel';
import {useLocation, useNavigate} from 'react-router-dom';
import {IFile} from '../../models/file';
import {diskApi} from '../../services/diskService';

const DiskPage: FC = () => {

  const {pathname} = useLocation();
  const navigate = useNavigate();

  const [path, setPath] = useState<string[]>([]);

  const pathForQuery = useMemo(() => path.join('\\').replaceAll('%20', ' '), [path]);

  const {data, isLoading, isSuccess} = diskApi.useGetFilesByPathQuery({path: pathForQuery});

  useEffect(() => {
    if (isSuccess) {
      if (!data.file && !data.children.length) {
        navigate('/disk');
      }
    }
  }, [isSuccess, data, navigate]);

  useEffect(() => {
    setPath(pathname.split('/').slice(2));
  }, [pathname, setPath]);

  const onDoubleClickFile = (file: IFile) => {
    if (file.type === 'dir') {
      navigate(`${file.fullPath}`);
    }
  };

  const onBack = () => {
    const newPath = pathname.split('/').slice(2);
    newPath.pop();
    navigate('/disk/' + newPath.join('/'));
  };

  return (
      <PageWrapper
          top={
            <DiskTopPanel
                parentId={data?.file?._id}
                path={path}
            />
          }
          center={
            <DiskCenterPanel
                files={data?.children}
                isLoading={isLoading}
                onDoubleClickFile={onDoubleClickFile}
                selectedFile={data?.file}
                onBack={onBack}
            />
          }
      />
  );
};

export default DiskPage;
