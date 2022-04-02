import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';
import {Box} from '@mui/material';
import {flexStyles} from '../../utils/styleUtils';
import Layout from '../Layout';

const PublicLayout: FC = () => {
  return (
      <Layout>
        <Box
            sx={{
              ...flexStyles('center', 'center', 'column'),
              height: '100%',
              minHeight: 'inherit',
            }}
        >
          <Outlet/>
        </Box>
      </Layout>
  );
};

export default PublicLayout;
