//External Imports
import React, { useState } from "react";
import useSound from "use-sound"; // for handling the sound
import { useSelector } from "react-redux";

//Internal Imports
import { DataStore, MusicItem } from "../types/types";

//Setup the Music Player Component
export default function MusicPlayer({
	songList,
	className,
}: {
	songList: Array<MusicItem>;
	className?: string;
}) {
	//Setup the Settings Store
	const settingsStore = useSelector((state: DataStore) => state.settings);

	//Setup the Playing Status State
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	//Setup the user Pause State
	const [userPaused, setUserPaused] = useState<boolean>(false);

	//Setup the Current Song State
	const [play, { pause, duration, sound }] = useSound(songList[0].path, {
		volume: settingsStore.volume.music / 100,
	});

	//Play the Music
	playMusic();

	//Plays the Music
	function playMusic() {
		//Check if the Navigator is not Active
		if (!navigator.userActivation.hasBeenActive) {
			//Run the Function again after a set time
			setTimeout(playMusic, 500);

			//End the Function
			return;
		}

		//Start playing the music
		if (navigator.userActivation.hasBeenActive && !isPlaying && !userPaused) toggleMusic();
	}

	//Loop the Music
	sound?.loop(true);

	//Plays or Pauses a the current Music
	function toggleMusic() {
		//Check if the song is not playing
		if (!isPlaying) {
			//Update the User Paused Status
			setUserPaused(false);

			//Update the Playing Status
			setIsPlaying(true);

			//Play the Song
			return play();
		}

		//Update the User Paused State
		setUserPaused(true);

		//Update the Playing Status
		setIsPlaying(false);

		//Pause the current song
		return pause();
	}

	//Return the Component's Content
	return <div className={className}></div>;
}
