import React, {FC} from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {Box, Link, List, ListItemIcon, ListItemText, styled} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import {useAuthenticatedUser} from '../../hooks/useAuthenticatedUser';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SideBarList = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
  '& .MuiListItemButton-root': {
    padding: '4px',
    ':hover': {
      borderRadius: 4,
    },
  },
  '& .MuiTypography-root': {
    width: 'auto',
  },
  padding: 1,
});

const createMenu = (id: string) => {
  return [
    {
      label: 'Моя страница',
      icon: <AccountCircleOutlinedIcon/>,
      path: `/profile/${id}`,
    },
    {
      label: 'Новости',
      icon: <ArticleOutlinedIcon/>,
      path: '/news',
    },
    {
      label: 'Мессенджер',
      icon: <EmailOutlinedIcon/>,
      path: '/messages',
    },
    {
      label: 'Друзья',
      icon: <PeopleAltOutlinedIcon/>,
      path: '/friends',
    },
    {
      label: 'Диск',
      icon: <SaveOutlinedIcon/>,
      path: '/disk',
    },
    {
      label: 'Поиск',
      icon: <SearchOutlinedIcon/>,
      path: '/search',
    },
  ];
};

const SideBar: FC = () => {

  const user = useAuthenticatedUser();

  return (
      <Box
          sx={theme => ({
            overflow: 'hidden',
            maxWidth: theme.layoutSize.sidebarWidth,
            position: 'sticky',
            minWidth: theme.layoutSize.sidebarWidth,
            minHeight: 'inherit',
            top: theme.layoutSize.headerHeight,
          })}
      >
        <Box
            sx={{
              mt: 2,
              position: 'relative',
            }}
        >
          <SideBarList>
            {
              createMenu(user._id).map(item => {
                return (
                    <ListItemButton
                        key={item.path}
                        component={Link}
                        href={item.path}
                        sx={{
                          '& .MuiListItemIcon-root': {
                            mr: 1,
                          },
                        }}
                    >
                      <ListItemIcon sx={{color: 'primary.main'}}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{fontSize: '0.9rem'}}
                      />
                    </ListItemButton>
                );
              })
            }
          </SideBarList>
        </Box>
      </Box>
  );
};

export default SideBar;
