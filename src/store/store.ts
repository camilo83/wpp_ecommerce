import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartReducer from '../redux/shopCarSlice';

export const store = configureStore({
  reducer: {
    shopcarState: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
