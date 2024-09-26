// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./features/auth/authSlice";
// import formReducer from "./features/UserFeature/UserSlice";
// import userReducer from "./features/UserFeature/getUserSlice";
// import editReducer from "./features/UserFeature/EditSlice";
// import deleteReducer from "./features/UserFeature/deleteUserSlice";
// import stateReducer from "./features/Statefeature/stateSlice";
// import nameReducer from "./features/nameFeature/nameSlice";
// import userSearchReducer from "./features/UserFeature/SearchSlice";
// import historicalReducer from "./features/historicalFeature/historicalSlice";
// import inviteReducer from "./features/UserFeature/inviteSlice";
// import messagesReducer from "./features/chatFeature/chatSlice";
// import connectionReducer from "./features/connectionFeature/connectionSlice";
// import { authApi } from "./features/auth/authServive";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["fetchDetails"], // only fetchDetails will be persisted
// };

// const persistedReducer = persistReducer(persistConfig, formReducer);

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     form: formReducer,
//     person: userReducer,
//     edit: editReducer,
//     delete: deleteReducer,
//     state: stateReducer,
//     name: nameReducer,
//     userSearch: userSearchReducer,
//     historicalPeople: historicalReducer,
//     invite: inviteReducer,
//     messages: messagesReducer,
//     connectionRequests: connectionReducer,

//     [authApi.reducerPath]: authApi.reducer, // Ensure this path is used correctly
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST"],
//       },
//     }).concat(authApi.middleware),
// });

// export const persistor = persistStore(store);
// export default store;
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import formReducer from "./features/UserFeature/UserSlice";
import userReducer from "./features/UserFeature/getUserSlice";
import editReducer from "./features/UserFeature/EditSlice";
import deleteReducer from "./features/UserFeature/deleteUserSlice";
import stateReducer from "./features/Statefeature/stateSlice";
import nameReducer from "./features/nameFeature/nameSlice";
import userSearchReducer from "./features/UserFeature/SearchSlice";
import historicalReducer from "./features/historicalFeature/historicalSlice";
import inviteReducer from "./features/UserFeature/inviteSlice";
import messagesReducer from "./features/chatFeature/chatSlice";
import connectionReducer from "./features/connectionFeature/connectionSlice";
import { authApi } from "./features/auth/authServive";
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

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "form"], // Persist auth and form states, adjust as needed
};

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  person: userReducer,
  edit: editReducer,
  delete: deleteReducer,
  state: stateReducer,
  name: nameReducer,
  userSearch: userSearchReducer,
  historicalPeople: historicalReducer,
  invite: inviteReducer,
  messages: messagesReducer,
  connectionRequests: connectionReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);
export default store;
