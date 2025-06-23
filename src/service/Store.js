import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./UserApi";
import { productApi } from "./ProductApi";
import { cartApi } from "./CartApi";

import userReducer from "./UserSlice";
import productReducer from "./ProductSlice";
import cartReducer from "./CartSlice";
import notificationReducer from "./NotificationSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist config for user
const userPersistConfig = {
  key: "user",
  storage,
};


const notificationPersistConfig = {
  key: "notifications",
  storage,
};


const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedNotificationReducer = persistReducer(notificationPersistConfig, notificationReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    product: productReducer,
    cart: cartReducer,
    notifications: persistedNotificationReducer, 
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware),
});

export const persistor = persistStore(store);
export default store;
