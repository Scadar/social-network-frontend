import React, {FC, FormEvent, useState} from 'react';
import {IconButton, Stack, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PageBottomWrapper from '../../../layouts/pageWrapper/PageBottomWrapper';

type ChatRoomBottomPanelProps = {
  chatRoomId: string;
  sendMessage: (message: string) => void
}

const ChatRoomBottomPanel: FC<ChatRoomBottomPanelProps> = ({chatRoomId, sendMessage}) => {
  const [messageText, setMessageText] = useState('');
  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(messageText);
    setMessageText('');
  };

  return (
      <PageBottomWrapper>
        <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="center"
            component="form"
            onSubmit={handleSendMessage}
        >
          <IconButton>
            <AttachFileIcon/>
          </IconButton>
          <TextField
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              fullWidth
              autoComplete="off"
              autoFocus
          />
          <IconButton type="submit">
            <SendIcon/>
          </IconButton>
        </Stack>
      </PageBottomWrapper>
  );
};

export default ChatRoomBottomPanel;
