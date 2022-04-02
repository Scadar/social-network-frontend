import React, {FC} from 'react';
import ListWrapper from '../../components/UI/ListWrapper';
import UserCardWithFriendActions from '../../components/user/UserCardWithFriendActions';
import {Box} from '@mui/material';
import {IUserWithFriendStatus} from '../../models/authModels';

type SearchCenterPanelProps = {
  isLoading: boolean
  users?: IUserWithFriendStatus[]
  isFetching: boolean
}

const SearchCenterPanel: FC<SearchCenterPanelProps> = ({isLoading, users, isFetching}) => {
  return (
      <Box sx={{p: 1, height: '100%'}}>
        <ListWrapper
            isLoading={isLoading}
            isEmpty={!users || users?.length === 0}
        >
          {users?.map((user, index) =>
              <UserCardWithFriendActions
                  key={user._id}
                  user={user}
                  withDivider={index !== users?.length - 1}
                  isFetching={isFetching}
              />,
          )}
        </ListWrapper>
      </Box>
  );
};

export default SearchCenterPanel;
