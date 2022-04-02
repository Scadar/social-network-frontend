import React, {FC} from 'react';
import ListWrapper from '../../../components/UI/ListWrapper';
import UserCard from '../../../components/user/UserCard';
import {Box, Button} from '@mui/material';
import {IUserWithFriendStatus} from '../../../models/authModels';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {roomApi} from '../../../services/roomService';

type ChatAddCenterPanelProps = {
  friends?: IUserWithFriendStatus[]
  isLoading: boolean
}

const ChatAddCenterPanel: FC<ChatAddCenterPanelProps> = ({friends, isLoading}) => {
  const [fetchRoom, {isLoading: isRoomLoading}] = roomApi.useFindOrCreatePrivateChatRoomMutation();

  const navigate = useNavigate();
  const goToDialog = (userId: string) => {
    fetchRoom({targetUserId: userId})
        .unwrap()
        .then(data => {
          navigate(`/messages/room/${data._id}`);
        })
        .catch(() => toast.error('Ошибка'));
  };

  return (
      <Box sx={{p: 1, height: '100%'}}>
        <ListWrapper
            isEmpty={!friends || friends.length === 0}
            isLoading={isLoading}
        >
          {
            friends?.map((user, index) => (
                <UserCard
                    key={user._id}
                    user={user}
                    withDivider={index !== friends?.length - 1}
                    size={'small'}
                >
                  <Box>
                    <Button onClick={() => goToDialog(user._id)} disabled={isRoomLoading}>
                      Перейти к диалогу
                    </Button>
                  </Box>
                </UserCard>
            ))
          }
        </ListWrapper>
      </Box>
  );
};

export default ChatAddCenterPanel;
