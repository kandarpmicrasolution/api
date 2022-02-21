import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

import customerReducer from "./customer/slice"; // auth reducer

const rootReducer = {
  customer: customerReducer,
};
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
export default configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});
