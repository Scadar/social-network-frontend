import React, {FC, memo} from 'react';
import {GroupedMessage} from '../../../store/slices/messages';
import {Box, Link, Paper, Stack, Typography} from '@mui/material';
import UserAvatar from '../../../components/user/UserAvatar';
import {blue, grey} from '@mui/material/colors';

type MessageGroupProps = {
  group: GroupedMessage
  ownerId: string
}

const addZero = (value: number): string => {
  const strValue = value.toString();
  if (strValue.length === 1) {
    return `0${strValue}`;
  }
  return strValue;
};

const formatDate = (date: Date): string => {
  // const year = date.getFullYear();
  const month = addZero(date.getUTCMonth() + 1);
  const day = addZero(date.getDate());
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  return `${hours}:${minutes}  ${day}/${month}`;
};

const MessageGroup: FC<MessageGroupProps> = memo(({group, ownerId}) => {
  const isOwner = ownerId === group.senderDto._id;
  return (
      <Box>
        <Stack
            spacing={1}
            direction={'row'}
            alignItems={'center'}
            sx={{
              p: 1,
            }}
        >
          <UserAvatar
              user={group.senderDto}
              sx={{
                mr: 1,
              }}
          />
          <Box>
            <Typography
                fontWeight="medium"
                color="primary.main"
                component={Link}
                href={`/profile/${group.senderDto._id}`}
                sx={{
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                }}
            >
              {`${group.senderDto.firstName}`}
            </Typography>
          </Box>

        </Stack>
        {
          group.body.map(msg => {
            const createdAt = formatDate(new Date(msg.createdAt));
            return (
                <Box
                    key={msg._id}
                    sx={theme => ({
                      minHeight: '40px',
                      overflow: 'hidden',
                      p: 1,
                    })}
                >

                  <Stack
                      spacing={1}
                      direction="column"
                      alignItems="flex-start"
                      flexGrow={1}
                  >
                    <Stack direction="row" spacing={1}>
                      <Paper
                          sx={{
                            display: 'table',
                            tableLayout: 'fixed',
                            width: '100%',
                            wordWrap: 'break-word',
                            backgroundColor: isOwner ? blue[50] : grey[100],
                            p: 1,
                          }}
                      >
                        <Typography sx={{fontSize: '0.9rem'}}>
                          {msg.message}
                        </Typography>
                      </Paper>
                      <Box>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            lineHeight={1.5}
                            letterSpacing={'0.03em'}
                        >
                          {createdAt}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
            );
          })
        }
      </Box>
  );
}, (prev, next) => {
  return prev.group.body.length === next.group.body.length;
});

export default MessageGroup;
