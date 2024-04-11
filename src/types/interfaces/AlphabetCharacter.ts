//Setup the Alphabetical Character Interface
export interface AlphabeticalCharacter {
	character: string;
	isSelected: boolean;
	type: "incorrect" | "correct" | "none";
}
