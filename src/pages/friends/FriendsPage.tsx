import React, {FC, SyntheticEvent} from 'react';
import {TabContext} from '@mui/lab';
import {UserToUserRelationship} from '../../models/friendModels';
import {useAppSearchParams} from '../../hooks/useAppSearchParams';
import FriendsTopPanel from './FriendsTopPanel';
import FriendsCenterPanel from './FriendsCenterPanel';
import PageWrapper from '../../layouts/pageWrapper/PageWrapper';

const FriendsPage: FC = () => {

  const [section, setSection] = useAppSearchParams<UserToUserRelationship>({
    paramName: 'section',
    defaultValue: UserToUserRelationship.FRIEND,
  });

  const handleChangeSection = (event: SyntheticEvent, newValue: UserToUserRelationship) => {
    setSection(newValue);
  };

  return (
      <TabContext value={section}>
        <PageWrapper
            top={
              <FriendsTopPanel
                  section={section}
                  handleChangeSection={handleChangeSection}
              />
            }
            center={
              <FriendsCenterPanel section={section}/>
            }
        />
      </TabContext>
  );
};

export default FriendsPage;
