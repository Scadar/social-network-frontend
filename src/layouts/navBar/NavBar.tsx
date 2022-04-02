import React, {FC} from 'react';
import {Box, Link, Stack, Typography} from '@mui/material';
import ThemeSwitcher from '../../components/UI/ThemeSwitcher';
import {useAppSelector} from '../../hooks/useAppSelector';
import ProfileMenu from './ProfileMenu';
import LayoutContainer from '../LayoutContainer';

const NavBar: FC = () => {
  const {user} = useAppSelector(state => state.auth);
  return (
      <Box
          sx={theme => ({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            zIndex: theme.zIndex.drawer,
          })}
      >
        <Box
            sx={theme => ({
              display: 'flex',
              height: theme.layoutSize.headerHeight,
              backgroundColor: theme.palette.background.paper,
            })}
        >
          <LayoutContainer>
            <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 'inherit',
                }}
            >
              <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:active': {
                      transform: 'translateY(1px)',
                    },
                  }}
                  href={'/'}
              >
                <Typography
                    variant="h6"
                    noWrap
                    fontWeight="bold"
                    letterSpacing={1}
                >
                  ВКОНТАКТЕ
                </Typography>
              </Link>
              <Stack direction="row" spacing={2} alignItems="center">
                <ThemeSwitcher/>
                {user && <ProfileMenu user={user}/>}
              </Stack>
            </Box>
          </LayoutContainer>

        </Box>
      </Box>
  );
};

export default NavBar;
