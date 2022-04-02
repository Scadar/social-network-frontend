import React, {FC, useEffect} from 'react';
import {friendApi} from '../../../services/friendService';
import {UserToUserRelationship} from '../../../models/friendModels';
import ChatAddTopPanel from './ChatAddTopPanel';
import ChatAddCenterPanel from './ChatAddCenterPanel';
import PageWrapper from '../../../layouts/pageWrapper/PageWrapper';

const ChatAdd: FC = () => {

  const [fetchUsers, {data: friends, isLoading}] = friendApi.useLazyFindUsersByFriendStatusQuery();

  useEffect(() => {
    fetchUsers({status: UserToUserRelationship.FRIEND});
  }, [fetchUsers]);

  return (
      <PageWrapper
          top={
            <ChatAddTopPanel/>
          }
          center={
            <ChatAddCenterPanel
                isLoading={isLoading}
                friends={friends}
            />
          }
      />
  );
};

export default ChatAdd;
