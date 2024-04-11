import { ReactElement } from "react";
import { IconType } from "react-icons";

//Create the Menu Item Class
export class MenuItem {
	//Setup the Public Properties
	name: string;
	path: string;
	icon: {
		normal: ReactElement<IconType>;
		hover: ReactElement<IconType>;
	};

	//Setup the Constructor
	constructor(name: string, path: string, normalIcon: IconType, hoverIcon: IconType) {
		//Update the Public Properties
		this.name = name;
		this.path = path;
		this.icon = {
			normal: normalIcon({ className: "pointer-events-none" }),
			hover: hoverIcon({ className: "pointer-events-none" }),
		};
	}
}
