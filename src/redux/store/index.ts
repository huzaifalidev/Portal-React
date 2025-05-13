import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../slices/admin";
import loadingReducer from "../slices/loading";
import sidebarReducer from "../slices/sidebar";
const store = configureStore({
  reducer: {
    admin: adminReducer,
    loading: loadingReducer,
    sidebar: sidebarReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
