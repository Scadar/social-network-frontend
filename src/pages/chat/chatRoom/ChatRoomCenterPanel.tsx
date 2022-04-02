import React, {FC, useEffect, useState} from 'react';
import {Box} from '@mui/material';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {chatMessageApi} from '../../../services/chatMessageService';
import DocumentInfinityScroller from '../../../components/DocumentInfinityScroller';
import Message from './Message';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {clearMessages} from '../../../store/slices/messages';
import Loading from '../../../components/UI/Loading';
import FlexCenter from '../../../components/UI/FlexCenter';

type ChatRoomCenterPanelProps = {
  chatRoomId: string
}

const ChatRoomCenterPanel: FC<ChatRoomCenterPanelProps> = ({chatRoomId}) => {

  const pageSize = 40;
  const [skip, setSkip] = useState(0);
  const dispatch = useAppDispatch();

  const {data: lastMessages} = chatMessageApi.useGetMessagesQuery(
      {chatRoomId, skip, pageSize},
      {refetchOnMountOrArgChange: true},
  );

  const {messages} = useAppSelector(state => state.messages);

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  const fetchMoreData = () => {
    setSkip(messages.length);
  };

  return (
      <Box sx={{py: 2, height: '100%'}}>
        <DocumentInfinityScroller
            dataLength={messages.length}
            next={fetchMoreData}
            hasMore={lastMessages ? lastMessages.length === pageSize : true}
            loader={<FlexCenter><Loading/></FlexCenter>}
            inverse={true}
            endMessage={
              <FlexCenter>Сообщений больше нет</FlexCenter>
            }
        >
          {
            messages.map(msg => {
              return (
                  <Message
                      key={msg._id}
                      message={msg}
                  />
              );
            })
          }
        </DocumentInfinityScroller>
      </Box>
  );
};

export default ChatRoomCenterPanel;
