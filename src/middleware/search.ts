import { Middleware } from '@reduxjs/toolkit';
import { setSearchResults } from '@app/store/features/search';
import { searchApi } from '@app/services/search';

const searchMiddleware: Middleware = store => next => async action => {
    const result = next(action);

    if (searchApi.endpoints.search.matchFulfilled(action)) {
        store.dispatch(setSearchResults(action.payload));
    }

    return result;
};

export default searchMiddleware;
