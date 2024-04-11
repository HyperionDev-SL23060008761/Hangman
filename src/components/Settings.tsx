"use client";

//External Imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { encode as base64Encode } from "base-64";

//Internal Imports
import { DataStore } from "../types/types";
import { Slider } from "@mui/material";
import { updateMusicVolume, updateEffectsVolume } from "../datastore/slices/settings";

//Setup the Settings Component
export default function Settings({ onClose }: { onClose?: () => void }) {
	//Setup the Settings Store
	const settingsStore = useSelector((state: DataStore) => state.settings);

	//Setup the Datastore Dispatcher
	const dispatch = useDispatch();

	//Plays a Sound
	function playSound(path: string, volume: number) {
		//Create an ID for the specified path
		const pathID = base64Encode(path).replace(/[^a-zA-Z]/g, "");

		//Check if there are too many audio sources and prevent playing
		if (document.querySelectorAll(`#effect-${pathID}`).length > 0) return;
		//Create the Audio Player
		const audioPlayer = document.createElement("audio");

		//Set the Audio Player's ID
		audioPlayer.id = `effect-${pathID}`;

		//Add the Audio Player to the Document
		document.body.appendChild(audioPlayer);

		//Check if the Audio Player is invalid
		if (!audioPlayer) return console.error("Invalid Audio Player");

		//Update the Audio Player's Volume
		audioPlayer.volume = volume / 100;

		//Update the Audio Player's Source if it is different and not currently playing something and is paused
		audioPlayer.src = path;

		//Play the Audio and delete the audio player after the audio has played
		audioPlayer.onended = () => audioPlayer.remove();

		//Play the Audio
		audioPlayer.play().catch(err => audioPlayer.remove());
	}

	//Handles Music Volume Change Events
	function handleMusicVolumeChange(event: Event, value: number | number[]) {
		//Get the New Value
		const newValue = typeof value == "number" ? value : value[0];

		//Update the Settings in the DataStore
		dispatch(updateMusicVolume(newValue));
	}

	//Handles Effects Volume Change Events
	function handleEffectsVolumeChange(event: Event, value: number | number[]) {
		//Get the New Value
		const newValue = typeof value == "number" ? value : value[0];

		//Update the Settings in the DataStore
		dispatch(updateEffectsVolume(newValue));

		//Play the Click Sound
		playSound("/assets/Click.ogg", newValue);
	}

	//Return the Component's Content
	return (
		<div className="absolute h-screen w-screen left-0 top-0 z-10 justify-center items-center flex flex-col gap-10">
			{/*Setup the Overlay*/}
			<div className="absolute h-screen w-screen backdrop-blur-lg bg-black/50"></div>

			{/*Setup the Main Content*/}
			<div className="bg-gray-900 text-white w-1/2 h-1/2 flex flex-col justify-baseline items-center shadow-[0_0_15px_7px] shadow-[#0000004D] p-5 z-[1]">
				{/*Setup the Title*/}
				<h1 className="text-2xl font-bold font-pixelify drop-shadow-[0_0px_5px_#FFFFFFFF] select-none">
					Settings
				</h1>

				{/*Setup the Options Area*/}
				<div className="h-full w-full flex flex-col justify-center items-center gap-5">
					{/*Setup the Music Volume Setting*/}
					<div className="w-full flex flex-row justify-between items-center">
						{/*Setup the Label*/}
						<label className="w-2/3 text-xl font-pixelify drop-shadow-[0_0px_5px_#FFFFFFFF] select-none">
							Music Volume
						</label>

						{/*Setup the Input Field*/}
						<Slider
							size="medium"
							defaultValue={settingsStore.volume.music}
							min={0}
							max={50}
							name="musicVolumeSetting"
							className="w-1/3 drop-shadow-[0_0px_5px] drop-shadow-[#0015FF4D] hover:cursor-grab active:cursor-grabbing"
							onChange={handleMusicVolumeChange}
						/>
					</div>

					{/*Setup the Effects Volume Setting*/}
					<div className="w-full flex flex-row justify-between items-center">
						{/*Setup the Label*/}
						<label className="w-2/3 text-xl font-pixelify drop-shadow-[0_0px_5px_#FFFFFFFF] select-none">
							Effects Volume
						</label>

						{/*Setup the Input Field*/}
						<Slider
							size="medium"
							defaultValue={settingsStore.volume.effects}
							min={0}
							max={100}
							name="effectsVolumeSetting"
							className="w-1/3 drop-shadow-[0_0px_5px] drop-shadow-[#0015FF4D] hover:cursor-grab active:cursor-grabbing"
							onChange={handleEffectsVolumeChange}
						/>
					</div>
				</div>
				<button
					onClick={onClose}
					className="hover:translate-y-[-5px] hover:shadow-[1px_2px_7px_#0288D1] hover:scale-110 bg-blue-600 hover:bg-blue-700 duration-100 text-xl rounded-md font-bold px-4 py-2 font-pixelify font-bold"
				>
					Close
				</button>
			</div>
		</div>
	);
}
