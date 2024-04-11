//External Imports
import storage from "redux-persist/lib/storage";

export const persistConfig = {
	key: "root", // Key prefix for persisted data
	storage, // Storage engine (localStorage or sessionStorage)
	whitelist: ["settings"], // Persist only the "settings" slice
};
