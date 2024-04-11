//External Imports
import React, { useState } from "react";
import { AlphabeticalCharacter } from "../types/types";

//Setup the Hangman Component
export default function Hangman() {
	//Setup the Alphabet Array State
	const [alphabet, setAlphabet] = useState<Array<AlphabeticalCharacter>>(getAlphabet());

	//Setup the Dictionary State
	const [dictionary, setDictionary] = useState<string[]>();

	//Setup the Current Word State
	const [currentWord, setCurrentWord] = useState<string>();

	//Setup the Current Word State
	const [status, setCurrentStatus] = useState<"guessing" | "failed" | "success">("guessing");

	//Setup the guesses left count
	const [guessesLeft, setGuessesLeft] = useState<number>(5);

	//Check if the Dictionary is not updated and update the Dictionary
	if (!dictionary) updateDictionary();

	//Check the Game's State
	checkGameState();

	//Updates the Dictionary
	async function updateDictionary() {
		//Get the Dictionary Response
		const response = await fetch("/assets/dictionary.txt");

		//Get the Dictionary Content
		const dictionaryContent = await response.text();

		//Setup the New Dictionary
		let newDictionary = dictionaryContent.split("\n");

		//Find the Starting Index
		const startingIndex = newDictionary.indexOf("START");

		//Setup the Last Index
		const lastIndex = newDictionary.length - 1;

		//Remove the Uneccessary words from the New Dictionary
		newDictionary = newDictionary
			.slice(startingIndex, lastIndex)
			.filter(word => word.length > 3 && word.length < 8);

		//Update the Dictionary State
		setDictionary(newDictionary);

		//Get the new Word
		const newWord = getNewWord(newDictionary);

		//Update the Current Word
		setCurrentWord(newWord);
	}

	//Returns a New Word
	function getNewWord(wordList: Array<string>): string {
		//Get a random index
		const randomIndex = randomNumberGenerator(0, wordList.length - 1);

		//Get a New Word using the Random Index
		const newWord = wordList[randomIndex].toUpperCase();

		//return the New Word
		return newWord;
	}

	//Returns each Letter in the Alphabet as an Array
	function getAlphabet(): Array<AlphabeticalCharacter> {
		//Setup the Array
		const newAlphabet = new Array<AlphabeticalCharacter>();

		//Loop through the Character Codes of the Alphabet
		for (let i = 65; i < 91; i++) {
			//Create the New Character
			const newCharacter: AlphabeticalCharacter = {
				character: String.fromCharCode(i),
				isSelected: false,
				type: "none",
			};

			//Add the New Character to the New Alphabet Array
			newAlphabet.push(newCharacter);
		}

		//Return the New Alphabet
		return newAlphabet;
	}

	//Handles Click Events
	function handleClickEvents(event: React.MouseEvent<HTMLElement>, selectedLetterIndex: number) {
		//Check if the Current Word is Invalid
		if (!currentWord) return;

		//Create the New Alphabet
		const newAlphabet: Array<AlphabeticalCharacter> = JSON.parse(JSON.stringify(alphabet));

		//Get the Selected Letter
		const selectedLetter = newAlphabet[selectedLetterIndex];

		//Mark the Letter as Selected
		selectedLetter.isSelected = true;

		//Update the Letter's Type
		selectedLetter.type = currentWord.toLowerCase().includes(selectedLetter.character.toLowerCase())
			? "correct"
			: "incorrect";

		//Update the Try Count if the User was incorrect
		if (selectedLetter.type === "incorrect") setGuessesLeft(guessesLeft - 1);

		//Update the Alphabet State
		setAlphabet(newAlphabet);
	}

	//Checks if a Letter is Visible and should be shown
	function isLetterVisible(selectedCharacter: string): boolean {
		//Find the Letter in the Alphabet
		const selectedLetter = alphabet.find(letter => letter.character === selectedCharacter);

		//Check if the Letter is non alphabetical and mark is visible
		if (!selectedLetter) return true;

		//Return the Letter's Visible Status
		return selectedLetter.isSelected;
	}

	//Returns the Guessed Word
	function getGuessedWord(): string {
		//Check if the Current Word is invalid
		if (!currentWord) return "";

		//Get the Guessed Word
		const guessedWord = currentWord.split("").map(character => {
			return isLetterVisible(character) ? character : "*";
		});

		//Return the Guessed Word
		return guessedWord.join("");
	}

	//Checks the Game's State
	function checkGameState() {
		//Check if the User is not Guessing anymore
		if (status !== "guessing") return;

		//Get the Current Guessed Word
		const guessedWord = getGuessedWord();

		//Update the User Loss State if there are no more guesses left
		if (guessesLeft < 1) setCurrentStatus("failed");

		//Update the Win State if the user guessed the correct word
		if (guessedWord === currentWord) setCurrentStatus("success");
	}

	//Reset's the Game
	function resetGame() {
		//Get the new Word
		const newWord = getNewWord(dictionary || []);

		//Reset the Alphabet
		setAlphabet(getAlphabet());

		//Reset the Current Word
		setCurrentWord(newWord);

		//Reset the Current Word State
		setCurrentStatus("guessing");

		//Reset the guesses left count
		setGuessesLeft(5);
	}
	//Return the Component's Content
	return (
		<div className={`flex flex-col text-center h-full w-full justify-between items-center gap-20`}>
			{/*Setup the Reset Button*/}
			<button
				onClick={event => resetGame()}
				className="absolute top-5 left-5 w-20 hover:drop-shadow-[0_0px_8px_#fc2b1c] hover:animate-pulse hover:translate-y-[-2px] transition duration-300 text-md rounded bg-red-600 text-white font-bold font-pixelify py-2 hover:bg-red-700 drop-shadow-[0_0px_5px_#fc2b1c]"
			>
				Reset
			</button>

			<div>
				{/*Setup the Word Area*/}
				<div className="flex flex-row gap-5 relative w-60 aspect-square justify-center items-center p-5 rounded-full overflow-hidden">
					{/*Setup the Guess Count*/}
					<div className="flex absolute top-5">
						{/*Setup the Wrong Guess Count*/}
						<div className="text-red-400 font-bold font-pixelify text-2xl">
							{"".padEnd(Math.abs(guessesLeft - 5), "X")}
						</div>

						{/*Setup the Max Count*/}
						<div className="text-green-400 font-bold font-pixelify  text-2xl">
							{"".padEnd(guessesLeft, "X")}
						</div>
					</div>

					{/*Setup the Border */}
					<div className="absolute top-0 left-0 w-full h-full border-gray-200 border-[10px] rounded-full z-10"></div>

					{/*Setup the Overlay if the user is still guessing the word*/}
					{status === "guessing" && (
						<div className="absolute top-0 left-0 w-full h-full rounded-full blur-lg z-10 bg-gray-800 opacity-50 overflow-hidden"></div>
					)}

					{/*Setup the Overlay if the user failed to guess the word*/}
					{status === "failed" && (
						<div className="absolute top-0 left-0 w-full h-full rounded-full z-10 bg-red-600 overflow-hidden flex justify-center items-center font-bold">
							<p>You failed to stop the Toxin Buildup</p>
						</div>
					)}

					{/*Setup the Overlay if the User guessed the word*/}
					{status === "success" && (
						<div className="absolute top-0 left-0 w-full h-full rounded-full z-10 bg-green-600 overflow-hidden flex justify-center items-center font-bold">
							<p>You Successfully stopped the Toxin Buildup</p>
						</div>
					)}

					{/*Loop through the Current Word's Characters*/}

					<p className="font-pixelify font-bold text-2xl">{getGuessedWord()}</p>
				</div>
			</div>

			{/*Loop through the Menu Items and Add them into the Menu*/}
			<div className="flex flex-wrap w-1/2 justify-center items-center gap-5">
				{alphabet.map((letter, index) => (
					<div key={`letter-${letter.character}`} className="flex justify-center">
						<button
							disabled={letter.isSelected}
							onClick={event => handleClickEvents(event, index)}
							className={` py-3 px-5 border-1 border-solid outline-none transition duration-300 ease-in-out h-full text-xl font-bold rounded-lg text-center select-none font-pixelify font-bold 
								${
									letter.type === "incorrect" &&
									"bg-red-700 drop-shadow-[0px_0px_10px_rgba(255,0,0,0.58)] text-black text-shadow"
								}
								${
									letter.type === "correct" &&
									"bg-green-700 drop-shadow-[0px_0px_10px_rgba(0,255,0,0.58)] text-white text-shadow"
								}
								${
									!letter.isSelected &&
									"hover:shadow-[0px_2px_5px_#0288D1] bg-[#16212d] drop-shadow-[0px_2px_5px_rgba(0,0,0,0.1)] hover:translate-y-[-5px] hover:text-[#0288D1]"
								} 
								`}
						>
							{letter.character}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

//Create the Randomizer Function
function randomNumberGenerator(min: number, max: number): number {
	//Generate the Random Number
	const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

	//Return the Random Number
	return randomNumber;
}
