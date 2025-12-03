import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import appReducer from './appSlice';
import authReducer from './authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth',],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  app: appReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

const storage = {
  set: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('AsyncStorage Set Error: ', error);
    }
  },

  get: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error('AsyncStorage Get Error: ', error);
      return null;
    }
  },

  remove: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('AsyncStorage Remove Error: ', error);
    }
  },
};

export { store, persistor, storage };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
