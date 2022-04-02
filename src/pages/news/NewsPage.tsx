import React, {FC} from 'react';
import PageWrapper from '../../layouts/pageWrapper/PageWrapper';
import {Button} from '@mui/material';

const NewsPage: FC = () => {

  return (
      <PageWrapper
          center={
            <Button>Send</Button>
          }
      />
  );
};

export default NewsPage;
