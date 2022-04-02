import React, {FC} from 'react';
import {useThemeColorMode} from '../../ThemeContainer';
import {Box, IconButton, SxProps} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

type ThemeSwitcherProps = {
  sx?: SxProps;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({sx}) => {
  const {toggle, mode} = useThemeColorMode()
  return (
      <Box
        sx={{
          color: 'text.primary',
        }}
      >
        <IconButton sx={sx} onClick={toggle} color={'inherit'}>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
  );
};

export default ThemeSwitcher;
