import React, {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import PublicLayout from '../layouts/public/PublicLayout';
import AuthPage from '../pages/auth/AuthPage';

const PublicRoutes: FC = () => {
  return (
      <Routes>
        <Route path="/" element={<PublicLayout/>}>
          <Route index element={<Navigate to="/login"/>}/>
          <Route path="login" element={<AuthPage page="login"/>}/>
          <Route path="register" element={<AuthPage page="register"/>}/>
          <Route path="*" element={<Navigate to="/login"/>}/>
        </Route>
      </Routes>
  );
};

export default PublicRoutes;
