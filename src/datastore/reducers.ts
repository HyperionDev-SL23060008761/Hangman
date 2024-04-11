//External Imports
import { combineReducers } from "@reduxjs/toolkit";

//Internal Imports
import settingsReducer from "./slices/settings";

//Setup the Root Reducer
export const rootReducer = combineReducers({
	settings: settingsReducer,
});
