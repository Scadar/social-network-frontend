import React, {FC} from 'react';
import UserCardMessage from './UserCardMessage';
import ListWrapper from '../../../components/UI/ListWrapper';
import {IChatRoom} from '../../../models/chatModels';
import {Box} from '@mui/material';

type ChatPeersCenterPanelProps = {
  rooms?: IChatRoom[]
  isLoading: boolean
}

const ChatPeersCenterPanel: FC<ChatPeersCenterPanelProps> = ({isLoading, rooms}) => {
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
                    chatRoom={item}
                    withDivider={index !== rooms?.length - 1}
                />,
            )
          }
        </ListWrapper>
      </Box>
  );
};

export default ChatPeersCenterPanel;
