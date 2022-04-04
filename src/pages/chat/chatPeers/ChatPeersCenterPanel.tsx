import React, {FC} from 'react';
import UserCardMessage from './UserCardMessage';
import ListWrapper from '../../../components/UI/ListWrapper';
import {Box} from '@mui/material';
import {IChatRoomWithLastMessage} from '../../../services/roomService';
import {IUser} from '../../../models/authModels';

type ChatPeersCenterPanelProps = {
  rooms?: IChatRoomWithLastMessage[]
  isLoading: boolean
  me: IUser
}

const ChatPeersCenterPanel: FC<ChatPeersCenterPanelProps> = ({isLoading, rooms, me}) => {
  return (
      <Box sx={{height: '100%'}}>
        <ListWrapper
            isEmpty={rooms?.length === 0}
            isLoading={isLoading}
        >
          {
            rooms?.map((item, index) =>
                <UserCardMessage
                    key={index}
                    chatRoom={item.room}
                    lastMessage={item.lastMessage}
                    withDivider={index !== rooms?.length - 1}
                    me={me}
                />,
            )
          }
        </ListWrapper>
      </Box>
  );
};

export default ChatPeersCenterPanel;
