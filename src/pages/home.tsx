//External Imports
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GrPlay, GrPlayFill } from "react-icons/gr";
import { TbSettings, TbSettingsFilled } from "react-icons/tb";
import { BiHelpCircle } from "react-icons/bi";
import { BiSolidHelpCircle } from "react-icons/bi";

//Internal Imports
import Menu from "../components/Menu";
import { DataStore, MenuItem, MusicItem } from "../types/types";
import MusicPlayer from "../components/MusicPlayer";
import ContentLoader from "../components/ContentLoader";
import Settings from "../components/Settings";
import Hangman from "../components/Hangman";
import OverlayMenu from "../components/OverlayMenu";

//Setup the Home Page Component
export default function HomePage() {
	//Setup the State to Check if the user has opened the settings
	const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);

	//Setup the State to Check if the user has opened the settings
	const [isGameOpen, setGameOpen] = useState<boolean>(false);

	//Setup the State to Check if the user has Paused the Game
	const [isPaused, setPaused] = useState<boolean>(false);

	//Setup the State to Check if the Help Menu is Open
	const [isHelpOpen, setHelpOpen] = useState<boolean>(false);

	//Setup the Settings Store
	const settingsStore = useSelector((state: DataStore) => state.settings);

	//Setup the Pause Menu Items

	const PauseMenuItems = new Array<MenuItem>();

	//Add the Pause Menu Items to the list
	PauseMenuItems.push(new MenuItem("Settings", "/settings", TbSettings, TbSettingsFilled));
	PauseMenuItems.push(new MenuItem("Back", "/", BiHelpCircle, BiSolidHelpCircle));

	//Setup the Menu Items
	const menuItems = new Array<MenuItem>();

	//Setup the Song List
	const songList = new Array<MusicItem>();

	//Add the Menu Items to the list
	menuItems.push(new MenuItem("Settings", "/settings", TbSettings, TbSettingsFilled));
	menuItems.push(new MenuItem("Play", "/game", GrPlay, GrPlayFill));
	menuItems.push(new MenuItem("Help", "/help", BiHelpCircle, BiSolidHelpCircle));

	//Add the Songs to the Song List
	songList.push({ name: "Background Music", path: "/assets/BackgroundMusic.mp3" });

	//Listen for Click Events
	document.onclick = event => {
		//Get the Requested Element
		const targetElement = event.target as HTMLElement;

		//Check if the Target Element is not a Button
		if (targetElement.tagName !== "BUTTON") return;

		//Get the Button Element
		const buttonElement = targetElement as HTMLButtonElement;

		//Check if the Button is not disabled and play the sound
		if (!buttonElement.disabled) playSound("/assets/Click.ogg");
	};

	//Listen for Mouse Over Events
	document.onmouseover = event => {
		//Get the Requested Element
		const targetElement = event.target as HTMLElement;

		//Check if the Target Element is not a Button
		if (targetElement.tagName !== "BUTTON") return;

		//Get the Button Element
		const buttonElement = targetElement as HTMLButtonElement;

		//Check if the Button is not disabled and play the sound
		if (!buttonElement.disabled) playSound("/assets/HoverOver.ogg");
	};

	//Plays a Sound
	function playSound(path: string) {
		//Create the Audio Player
		const audioPlayer = document.createElement("audio");

		//Add the Audio Player to the Document
		document.body.appendChild(audioPlayer);

		//Check if the Audio Player is invalid
		if (!audioPlayer) return console.error("Invalid Audio Player");

		//Update the Audio Player's Volume
		audioPlayer.volume = settingsStore.volume.effects / 100;

		//Update the Audio Player's Source if it is different and not currently playing something and is paused
		audioPlayer.src = path;

		//Play the Audio and delete the audio player after the audio has played
		audioPlayer.onended = () => audioPlayer.remove();

		//Play the Audio
		audioPlayer.play().catch(err => audioPlayer.remove());
	}

	//Handles Menu Item Click Events
	function handleClickEvents(clickEvent: React.MouseEvent<HTMLElement>) {
		//Get the Selected Button
		const selectedButton = clickEvent.currentTarget;

		//Check if the Settings Button was Clicked
		if (selectedButton.dataset.name?.toLowerCase() === "settings") setSettingsOpen(true);

		//Check if the Play Button was Clicked
		if (selectedButton.dataset.name?.toLowerCase() === "play") setGameOpen(true);

		//Check if the Help Button was pressed
		if (selectedButton.dataset.name?.toLowerCase() === "help") setHelpOpen(true);
	}

	//Exits the Game
	function exitGame() {
		//Close all the Menus
		setPaused(false);
		setGameOpen(false);
		setSettingsOpen(false);
	}

	//Return the Page's Content
	return (
		<main className="bg-gray-900 text-white min-w-screen min-h-screen flex flex-col justify-between items-center gap-20 p-10">
			{/*Show the Content Loader*/}
			<ContentLoader />

			{/*Show Game Open Screen*/}
			{isGameOpen && (
				<React.Fragment>
					{/*Show the Pause Menu Item*/}
					<button className="absolute top-5 right-5" onClick={() => setPaused(true)}>
						<TbSettings className="pointer-events-none text-2xl" />
					</button>

					{/*Show the Hangman Game*/}
					<Hangman />

					{/*Check if the Game is Paused and show the Pause Menu*/}
					{isPaused && (
						<OverlayMenu className="w-1/4 min-w-60" title="Paused" onClose={() => setPaused(false)}>
							<button
								onClick={() => {
									setSettingsOpen(true);
								}}
								className="w-40 hover:drop-shadow-[0_0px_8px_#1c76fc] hover:animate-pulse hover:translate-y-[-2px] transition duration-300 text-md rounded bg-blue-600/50 text-white font-bold font-pixelify py-2 hover:bg-blue-700/50 drop-shadow-[0_0px_5px_#1c76fc]"
							>
								Settings
							</button>
							<button
								onClick={() => {
									setHelpOpen(true);
								}}
								className="w-40 hover:drop-shadow-[0_0px_8px_#1c76fc] hover:animate-pulse hover:translate-y-[-2px] transition duration-300 text-md rounded bg-blue-600/50 text-white font-bold font-pixelify py-2 hover:bg-blue-700/50 drop-shadow-[0_0px_5px_#1c76fc]"
							>
								Help
							</button>
							<button
								onClick={() => exitGame()}
								className="w-40 hover:drop-shadow-[0_0px_8px_#fc2b1c] hover:animate-pulse hover:translate-y-[-2px] transition duration-300 text-md rounded bg-red-600 text-white font-bold font-pixelify py-2 hover:bg-red-700 drop-shadow-[0_0px_5px_#fc2b1c]"
							>
								Exit to Menu
							</button>
						</OverlayMenu>
					)}
				</React.Fragment>
			)}

			{/*Check if the Help Menu is Open and show the Help Menu*/}
			{isHelpOpen && (
				<OverlayMenu
					className="w-1/2 h-3/4 min-w-60"
					title="Paused"
					onClose={() => setHelpOpen(false)}
				>
					<div className="w-full h-full flex flex-col items-center justify-center gap-4">
						<h1 className="font-pixelify text-2xl font-bold">Attention Agent:</h1>
						<p className="font-pixelify text-lg text-center">
							Your team is trapped inside a facility. To rescue them, you need to crack the network
							password within 5 attempts. Time is running out as toxins are building up throughout
							the facility.
						</p>

						<p className="font-pixelify text-lg text-center">
							Don't worry, you have a special program that can analyze your guesses based on network
							response times. It will tell you if you're on the right track.
						</p>

						<p className="font-pixelify text-lg text-center">Good luck, Agent!</p>
					</div>
				</OverlayMenu>
			)}

			{/*Show Game Closed Screen*/}
			{!isGameOpen && (
				<React.Fragment>
					{/*Setup the Title*/}
					<h1 className="text-8xl font-bold font-pixelify drop-shadow-[0_0px_5px_#FFFFFFFF] select-none">
						Hangman
					</h1>

					{/*Setup the Menu*/}
					<Menu menuItems={menuItems} className="self-center" onClick={handleClickEvents} />
				</React.Fragment>
			)}

			{/*Load the Music Player*/}
			<MusicPlayer songList={songList} className="absolute top-2 left-2" />

			{/*Show the Settings Page if the Settings is Active*/}
			{isSettingsOpen && <Settings onClose={() => setSettingsOpen(false)} />}
		</main>
	);
}
