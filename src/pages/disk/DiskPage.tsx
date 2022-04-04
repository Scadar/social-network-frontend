import React, {FC} from 'react';
import PageWrapper from '../../layouts/pageWrapper/PageWrapper';
import DiskCenterPanel from './DiskCenterPanel';

const DiskPage: FC = () => {

  return (
      <PageWrapper
          center={<DiskCenterPanel/>}
      />
  );
};

export default DiskPage;
