//External Imports
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

//Interrnal Imports
import { rootReducer } from "./reducers"; // Import your combined reducers
import { persistConfig } from "./persistConfig";

//Setup the Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Setup the Data Store
export const store = configureStore({
	reducer: persistedReducer,
});

//Export the Persistor
export const persistor = persistStore(store);
