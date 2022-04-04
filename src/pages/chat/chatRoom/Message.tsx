import React, {FC, memo} from 'react';
import {IChatMessage} from '../../../models/chatMessage';
import {Box, Link, Paper, Stack, Typography} from '@mui/material';
import UserAvatar from '../../../components/user/UserAvatar';
import {blue, grey} from '@mui/material/colors';

type MessageProps = {
  message: IChatMessage
  ownerId: string
}

const formatDate = (date: Date): string => {
  // const year = date.getFullYear();
  const month = addZero(date.getUTCMonth() + 1);
  const day = addZero(date.getDate());
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  return `${hours}:${minutes}  ${day}/${month}`;
};

const addZero = (value: number): string => {
  const strValue = value.toString();
  if (strValue.length === 1) {
    return `0${strValue}`;
  }
  return strValue;
};

const Message: FC<MessageProps> = memo(({message, ownerId}) => {
  const isOwner = ownerId === message.senderDto._id;
  const createdAt = formatDate(new Date(message.createdAt));

  return (
      <Box
          sx={theme => ({
            px: 2,
            py: 1,
            minHeight: '40px',
            overflow: 'hidden',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          })}
      >
        <Stack
            spacing={1}
            direction="row"
            alignItems="flex-start"
        >
          {
            !isOwner &&
              <UserAvatar
                  user={message.senderDto}
                  sx={{
                    mr: 1,
                  }}
              />
          }
          <Stack
              spacing={1}
              direction="column"
              alignItems="flex-start"
              flexGrow={1}
          >
            <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                flexGrow={1}
                sx={{
                  width: '100%',
                }}
            >
              <Typography
                  fontWeight="medium"
                  color="primary.main"
                  component={Link}
                  href={`/profile/${message.senderDto._id}`}
                  sx={{
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                  }}
              >
                {`${message.senderDto.firstName}`}
              </Typography>
              <Typography
                  variant="caption"
                  color="text.secondary"
                  lineHeight={1.5}
                  letterSpacing={'0.03em'}
              >
                {createdAt}
              </Typography>
            </Stack>
            <Box
                sx={{
                  display: 'table',
                  tableLayout: 'fixed',
                  width: '100%',
                  wordWrap: 'break-word',
                }}
            >
              <Paper
                sx={{
                  p: 1,
                  backgroundColor: isOwner ? blue[50] : grey[100]
                }}
              >
                <Typography sx={{fontSize: '0.9rem'}}>
                  {message.message}
                </Typography>
              </Paper>
            </Box>
          </Stack>
        </Stack>
      </Box>
  );
}, () => {
  return true;
});

export default Message;
