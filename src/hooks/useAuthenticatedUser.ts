import {useAppSelector} from './useAppSelector';

export const useAuthenticatedUser = () => {
  const {user} = useAppSelector(state => state.auth);
  return user!;
};
