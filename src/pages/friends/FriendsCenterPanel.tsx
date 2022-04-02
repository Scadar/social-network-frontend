import React, {FC, useCallback, useEffect} from 'react';
import {TabPanel} from '@mui/lab';
import ListWrapper from '../../components/UI/ListWrapper';
import UserCardWithFriendActions from '../../components/user/UserCardWithFriendActions';
import {Box} from '@mui/material';
import {UserToUserRelationship} from '../../models/friendModels';
import {friendApi} from '../../services/friendService';
import {toast} from 'react-toastify';

const tabPanels = [
  UserToUserRelationship.FRIEND,
  UserToUserRelationship.I_FOLLOWER,
  UserToUserRelationship.YOUR_FOLLOWER,
  UserToUserRelationship.REQUEST_SENT,
  UserToUserRelationship.PENDING_ACTION,
];

type FriendsCenterPanelProps = {
  section: UserToUserRelationship
}

const FriendsCenterPanel: FC<FriendsCenterPanelProps> = ({section}) => {

  const [fetchUsers, {data: users, isLoading, isFetching}] = friendApi.useLazyFindUsersByFriendStatusQuery();

  const handleFetchUsers = useCallback(() => {
    fetchUsers({status: section!})
        .unwrap()
        .catch(() => {
          toast.error('Ошибка');
        });
  }, [section, fetchUsers]);

  useEffect(() => {
    handleFetchUsers();
  }, [handleFetchUsers]);

  return (
      <Box sx={{height: '100%'}}>
        {
          tabPanels.map(item => {
            return (
                <TabPanel key={item} value={item} sx={{height: '100%', p: 1}}>
                  <ListWrapper
                      isEmpty={!users || users.length === 0}
                      isLoading={isLoading}
                  >
                    {
                      users?.map((user, index) =>
                          <UserCardWithFriendActions
                              key={user._id}
                              user={user}
                              withDivider={index !== users.length - 1}
                              isFetching={isFetching}
                              finallyFn={handleFetchUsers}
                          />,
                      )
                    }
                  </ListWrapper>
                </TabPanel>
            );
          })
        }
      </Box>
  );
};

export default FriendsCenterPanel;
