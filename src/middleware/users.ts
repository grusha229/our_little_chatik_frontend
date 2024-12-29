import { Middleware } from '@reduxjs/toolkit';

const usersMiddleware: Middleware = (store) => (next) => async (action) => {

  console.log('Users Middleware triggered:', action);
  return next(action);

};

export default usersMiddleware;
