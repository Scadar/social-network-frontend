import React, {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import PrivateLayout from '../layouts/private/PrivateLayout';
import ProfilePage from '../pages/profile/ProfilePage';
import NewsPage from '../pages/news/NewsPage';
import SearchPage from '../pages/search/SearchPage';
import FriendsPage from '../pages/friends/FriendsPage';
import ChatPeers from '../pages/chat/chatPeers/ChatPeers';
import ChatAdd from '../pages/chat/chatAdd/ChatAdd';
import ChatRoom from '../pages/chat/chatRoom/ChatRoom';

const PrivateRoutes: FC = () => {
  return (
      <Routes>
        <Route path="/" element={<PrivateLayout/>}>
          <Route path="/news" element={<NewsPage/>}/>
          <Route path="/profile/:userId" element={<ProfilePage/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/friends" element={<FriendsPage/>}/>
          <Route path="messages/">
            <Route index element={<Navigate to={'/messages/peers'}/>}/>
            <Route path="peers" element={<ChatPeers/>}/>
            <Route path="add" element={<ChatAdd/>}/>
            <Route path="room/:id" element={<ChatRoom/>}/>
          </Route>
          <Route index element={<Navigate to="/news"/>}/>
          <Route path="*" element={<Navigate to="/news"/>}/>
        </Route>
      </Routes>
  );
};

export default PrivateRoutes;
