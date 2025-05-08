import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../slices/admin";
import loadingReducer from "../slices/loading";
const store = configureStore({
  reducer: {
    admin: adminReducer,
    loading: loadingReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
