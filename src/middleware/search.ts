import { Middleware } from '@reduxjs/toolkit';
import { setSearchResults } from '../store/features/search';
import { searchApi } from '../services/search';

const searchMiddleware: Middleware = (store) => (next) => async (action) => {
  const result = next(action);

  if (searchApi.endpoints.search.matchFulfilled(action)) {

    store.dispatch(setSearchResults(action.payload));
  }

  return result;
};

export default searchMiddleware;
