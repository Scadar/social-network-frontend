import React, {FC} from 'react';
import {Tab, Tabs} from '@mui/material';
import {UserToUserRelationship} from '../../models/friendModels';
import PageTopWrapper from '../../layouts/pageWrapper/PageTopWrapper';

type FriendsTopPanelProps = {
  section: UserToUserRelationship
  handleChangeSection: (e: any, section: UserToUserRelationship) => void
}

const FriendsTopPanel: FC<FriendsTopPanelProps> = ({handleChangeSection, section}) => {
  return (
      <PageTopWrapper sx={{p: 0}}>
        <Tabs
            value={section}
            onChange={handleChangeSection}
            sx={{
              '& .MuiTabs-flexContainer':{
                height: '100%'
              },
              '& .MuiButtonBase-root': {
                py: 0,
                px: 1,
                textTransform: 'none',
              },
              '& .MuiTouchRipple-root': {
                textTransform: 'none',
              },
              height: '100%',
            }}
        >
          <Tab value={UserToUserRelationship.FRIEND} label="Мои друзья"/>
          <Tab value={UserToUserRelationship.PENDING_ACTION} label="Запросы в друзья"/>
          <Tab value={UserToUserRelationship.YOUR_FOLLOWER} label="Подписчики"/>
          <Tab value={UserToUserRelationship.I_FOLLOWER} label="Мои подписки"/>
          <Tab value={UserToUserRelationship.REQUEST_SENT} label="Отправленные запросы"/>
        </Tabs>
      </PageTopWrapper>
  );
};

export default FriendsTopPanel;
