//Internal Imports
import { CachedSettings } from "./CachedSettings";

//Setup the Data Store Type
export interface DataStore {
	settings: CachedSettings; // Include other slices' state types here
}
