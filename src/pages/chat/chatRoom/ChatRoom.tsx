import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';
import {roomApi} from '../../../services/roomService';
import ChatRoomBottomPanel from './ChatRoomBottomPanel';
import ChatRoomTopPanel from './ChatRoomTopPanel';
import {isFetchBaseQueryError} from '../../../utils/queryErrors';
import ChatRoomCenterPanel from './ChatRoomCenterPanel';
import PageWrapper from '../../../layouts/pageWrapper/PageWrapper';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {ChatEvent, RoomsEvent} from '../../../models/socket';
import {addMessagesToStart} from '../../../store/slices/messages';
import {IChatMessageWithSenderDto} from '../../../models/chatMessage';
import {useSocket} from '../../../socket/useSocket';
import {useAuthenticatedUser} from '../../../hooks/useAuthenticatedUser';

const ChatRoom: FC = () => {
  const {id: roomId} = useParams();
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const {_id: ownerId} = useAuthenticatedUser()
  const {data: partner, isLoading: partnerLoading, error} = roomApi.useFindRoomInfoQuery(roomId!);

  const handleSendMessage = (message: string) => {
    socket?.emit(ChatEvent.CHAT_MESSAGE, roomId, {message}, (newMessage: IChatMessageWithSenderDto) => {
      dispatch(addMessagesToStart([newMessage]));
    });
  };

  useEffect(() => {
    socket?.emit(RoomsEvent.JOIN_ROOM, roomId, (roomUsers: any) => {
      console.log('connected to room', roomUsers);
    });
    socket?.on(ChatEvent.CHAT_MESSAGE, (message) => {
      dispatch(addMessagesToStart([message]));
    });
    socket?.on(RoomsEvent.JOINED_TO_ROOM, (userId: string) => {
      console.log('JOINED_TO_ROOM ', userId);
    });
    socket?.on(RoomsEvent.LEFT_THE_ROOM, (userId: string) => {
      console.log('LEFT_THE_ROOM ', userId);
    });
    return () => {
      socket?.emit(RoomsEvent.LEAVE_ROOM, roomId);
    };
  }, [socket, roomId, dispatch]);

  if (error && isFetchBaseQueryError(error) && error?.status === 403) {
    return <Box>Доступ запрещен</Box>;
  }

  return (
      <PageWrapper
          top={
            <ChatRoomTopPanel
                user={partner?.user}
                isLoading={partnerLoading}
            />
          }
          center={
            <ChatRoomCenterPanel
                chatRoomId={roomId!}
                ownerId={ownerId}
            />
          }
          bottom={
            <ChatRoomBottomPanel
                chatRoomId={roomId!}
                sendMessage={handleSendMessage}
            />
          }
      />
  );
};

export default ChatRoom;
