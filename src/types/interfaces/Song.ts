//External Imports
import { PlayFunction } from "use-sound/dist/types";

//Setup the Music Item Interface
export interface Song {
	play: PlayFunction;
	pause: (id?: string | undefined) => void;
	duration: number | null;
	sound: any;
}
