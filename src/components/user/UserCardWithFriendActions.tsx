import React, {FC, useCallback, useState} from 'react';
import {IUserWithFriendStatus} from '../../models/authModels';
import {useUpdateEffect} from '../../hooks/useUpdateEffect';
import {toast} from 'react-toastify';
import UserFriendButton from './UserFriendButton';
import UserCard from './UserCard';
import {friendApi} from '../../services/friendService';

type UserCardWithFriendButtonProps = {
  user: IUserWithFriendStatus
  withDivider: boolean
  isFetching: boolean
  thenFn?: () => void
  catchFn?: (e: any) => void
  finallyFn?: () => void
}

const UserCardWithFriendActions: FC<UserCardWithFriendButtonProps> = ({
                                                                       user,
                                                                       withDivider,
                                                                       isFetching,
                                                                       thenFn,
                                                                       catchFn,
                                                                       finallyFn,
                                                                     }) => {

  const [fetchInvite, {isLoading: inviteLoading}] = friendApi.useInviteFriendMutation();
  const [fetchDelete, {isLoading: deleteLoading}] = friendApi.useDeleteFriendMutation();

  const [isUpdated, setIsUpdated] = useState(false);

  useUpdateEffect(() => {
    if (!isFetching) {
      setIsUpdated(false);
    }
  }, [isFetching, setIsUpdated]);

  const inviteFriend = useCallback((targetId: string) => {
    fetchInvite(targetId)
        .unwrap()
        .then(() => {
          if (thenFn) {
            thenFn();
          }
        })
        .catch((e) => {
          if (catchFn) {
            catchFn(e);
          } else {
            toast.error('Ошибка');
          }
        })
        .finally(() => {
          if (finallyFn) {
            finallyFn();
          }
          setIsUpdated(true);
        });
  }, [fetchInvite, thenFn, catchFn, finallyFn]);

  const deleteFriend = useCallback((targetId: string) => {
    fetchDelete(targetId)
        .unwrap()
        .then(() => {
          if (thenFn) {
            thenFn();
          }
        })
        .catch((e) => {
          if (catchFn) {
            catchFn(e);
          } else {
            toast.error('Ошибка');
          }
        })
        .finally(() => {
          if (finallyFn) {
            finallyFn();
          }
          setIsUpdated(true);
        });
  }, [fetchDelete, thenFn, catchFn, finallyFn]);

  return (
      <UserCard
          user={user}
          withDivider={withDivider}
      >
        <UserFriendButton
            isLoading={(inviteLoading || deleteLoading) || (isFetching && isUpdated)}
            inviteFriend={() => inviteFriend(user._id)}
            deleteFriend={() => deleteFriend(user._id)}
            status={user.friendStatus}
        />
      </UserCard>
  );
};

export default UserCardWithFriendActions;
