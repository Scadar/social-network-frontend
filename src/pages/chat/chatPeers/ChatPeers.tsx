import React, {FC} from 'react';
import {roomApi} from '../../../services/roomService';
import ChatPeersTopPanel from './ChatPeersTopPanel';
import ChatPeersCenterPanel from './ChatPeersCenterPanel';
import PageWrapper from '../../../layouts/pageWrapper/PageWrapper';
import {useAuthenticatedUser} from '../../../hooks/useAuthenticatedUser';

const ChatPeers: FC = () => {
  const {data: rooms, isLoading} = roomApi.useFindAllMyRoomsQuery(undefined, {refetchOnMountOrArgChange: true});
  const me = useAuthenticatedUser()

  return (
      <PageWrapper
          top={<ChatPeersTopPanel/>}
          center={
            <ChatPeersCenterPanel
                isLoading={isLoading}
                rooms={rooms}
                me={me}
            />
          }
      />
  );
};

export default ChatPeers;
