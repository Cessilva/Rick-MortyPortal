import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { characterSaga } from './sagas/characterSaga';
import characterReducer from './slices/characterSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(characterSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
