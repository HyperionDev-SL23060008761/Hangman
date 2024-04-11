//External Imports
import { createSlice } from "@reduxjs/toolkit";

//Internal Imports
import { CachedSettings } from "../../types/types";

//Setup the Initial State
const initialState: CachedSettings = {
	volume: { music: 5, effects: 50 },
};

//Setup the Settings Slice
const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		//Setup the Music Volume Updater
		updateMusicVolume(state, action: { payload: number }) {
			state.volume.music = action.payload;
		},

		//Setup the Effects Volume Updater
		updateEffectsVolume(state, action: { payload: number }) {
			state.volume.effects = action.payload;
		},
	},
});

//Export the Actions
export const { updateMusicVolume, updateEffectsVolume } = settingsSlice.actions;

//Export the Reducer
export default settingsSlice.reducer;
