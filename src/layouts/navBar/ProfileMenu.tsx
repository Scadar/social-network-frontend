import React, {FC} from 'react';
import {Box, ClickAwayListener, IconButton, Link, ListItemIcon, MenuItem, Paper, Popper} from '@mui/material';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {authApi} from '../../services/authService';
import {IUser} from '../../models/authModels';
import UserAvatar from '../../components/user/UserAvatar';

type ProfileMenuProps = {
  user: IUser
}

const ProfileMenu: FC<ProfileMenuProps> = ({user}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [logout] = authApi.useFetchLogOutMutation();
  const open = Boolean(anchorEl);

  const handleLogOut = () => {
    logout().unwrap();
  };

  const togglePopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(prev => prev ? null : event.currentTarget);
  };

  const handleClosePopper = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      label: 'Помощь',
      onClick: () => {
      },
      Icon: HelpCenterOutlinedIcon,
    },
    {
      label: 'Настройки',
      onClick: () => {
      },
      Icon: SettingsApplicationsOutlinedIcon,
    },
    {
      label: 'Выход',
      onClick: handleLogOut,
      Icon: LogoutOutlinedIcon,
    },
  ];

  return (
      <Box>
        <ClickAwayListener onClickAway={handleClosePopper}>
          <IconButton
              onClick={togglePopper}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
          >
            <UserAvatar
                user={user}
                size="small"
                disableLink
            />
          </IconButton>
        </ClickAwayListener>
        <Popper
            anchorEl={anchorEl}
            open={open}
            placement={'bottom-end'}
            transition={false}
            disablePortal={true}
        >
          <Paper
              elevation={6}
          >
            <MenuItem
                sx={{
                  borderBottom: theme => `1px solid ${theme.palette.divider}`,
                  textDecoration: 'none'
                }}
                component={Link}
                href={`/profile/${user._id}`}
            >
              {`${user.firstName} ${user.lastName}`}
            </MenuItem>
            {
              menuItems.map(item => {
                const Icon = item.Icon;
                return (
                    <MenuItem key={item.label} sx={{px: 1}} onClick={item.onClick}>
                      <ListItemIcon sx={{color: 'primary.main'}}>
                        <Icon fontSize="small"/>
                      </ListItemIcon>
                      {item.label}
                    </MenuItem>
                );
              })
            }
          </Paper>
        </Popper>
      </Box>
  );
};

export default ProfileMenu;
