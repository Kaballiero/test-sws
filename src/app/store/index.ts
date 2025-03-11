import { combineReducers, configureStore } from '@reduxjs/toolkit';


import rowReducer from './slices/Row.slice';
import entityApi from './api/Entity.api';
import {
  openEdit,
  closedEdit,
  setTableData,
  updateRowData,
  addChildData,
  deleteRowData,
  openAdd,closeAdd
} from './slices/Row.slice'

const rootReducer = combineReducers({
  rowReducer,
  [entityApi.reducerPath]: entityApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const actions = {
  openAdd,
  openEdit,
  closedEdit,
  setTableData,
  updateRowData,
  addChildData,
  deleteRowData,
  closeAdd
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(entityApi.middleware)
});


export { rootReducer, store, actions };

export type AppDispatch = typeof store.dispatch;