import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  createMovieReducer,
  fetchMovieReducer,
  deleteMovieReducer,
  favMovieReducer,
} from './movieReducer';
import { userAuthReducer } from './userReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userAuthReducer'],
};

const rootReducer = combineReducers({
  createMovieReducer,
  fetchMovieReducer,
  deleteMovieReducer,
  userAuthReducer,
  favMovieReducer,
});

export default persistReducer(persistConfig, rootReducer);
