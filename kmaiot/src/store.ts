import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authReducer} from './redux/slices/auth.slice';
import appSlice from './redux/slices/app.slice';
import {authApi} from './redux/api/auth.api';
import {processApi} from './redux/api/process.api';

//
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'chatSearch', 'profile', 'cache', 'community', 'setting'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  counter: appSlice,
  [authApi.reducerPath]: authApi.reducer,
  [processApi.reducerPath]: processApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([authApi.middleware, processApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
export const persistor = persistStore(store);
