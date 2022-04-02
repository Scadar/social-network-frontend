import React, {FC} from 'react';
import NavBar from './navBar/NavBar';
import {Box} from '@mui/material';
import LayoutContainer from './LayoutContainer';

const Layout: FC = ({children}) => {
  return (
      <Box sx={{position: 'relative'}}>
        <Box>
          <NavBar/>
        </Box>
        <Box
            sx={theme => ({
              position: 'relative',
              minHeight: `calc(100vh - ${theme.layoutSize.headerHeight})`,
              top: `${theme.layoutSize.headerHeight}`,
            })}
        >
          <Box
              sx={{
                position: 'relative',
                minHeight: 'inherit',
              }}
          >
            <LayoutContainer>
              {children}
            </LayoutContainer>
          </Box>
        </Box>
      </Box>
  );
};

export default Layout;
