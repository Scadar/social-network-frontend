import {Box} from '@mui/material';
import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';
import Layout from '../Layout';
import SideBar from './SideBar';

const PrivateLayout: FC = () => {
  return (
      <Layout>
        <Box
            sx={{
              alignItems: 'flex-start',
              position: 'relative',
              display: 'flex',
              minHeight: 'inherit',
              flexDirection: 'row',
            }}
        >
          <SideBar/>
          <Box
              sx={theme => ({
                position: 'relative',
                display: 'flex',
                width: theme.layoutSize.mainWidth,
                minWidth: theme.layoutSize.mainWidth,
                ml: 2,
                minHeight: 'inherit'
              })}
          >
            <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  minHeight: 'inherit'
                }}
            >
              <Outlet/>
            </Box>
          </Box>
        </Box>
      </Layout>
  );
};

export default PrivateLayout;
