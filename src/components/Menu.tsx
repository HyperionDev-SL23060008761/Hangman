//External Imports
import React, { useState } from "react";

//Internal Imports
import { MenuItem } from "../types/types";

//Setup the Menu Component
export default function Menu({
	menuItems,
	className,
	onClick,
	onMouseEnter,
}: {
	menuItems: Array<MenuItem>;
	className?: string;
	onClick?: (clickEvent: React.MouseEvent<HTMLElement>) => void;
	onMouseEnter?: (mouseEnterEvent: React.MouseEvent<HTMLElement>) => void;
}) {
	//Setup the State Updater (just a useState to be updated to refresh the state)
	const [activeMenuItem, setActiveMenuItem] = useState<MenuItem | null>(null);

	//Handles Mouse Enter Events
	function mouseEnterHandler(mouseEnterEvent: React.MouseEvent<HTMLElement>, menuItem: MenuItem) {
		//Update the Hovering Status
		setActiveMenuItem(menuItem);

		//Run the User's Custom Event, if provided
		if (onMouseEnter) onMouseEnter(mouseEnterEvent);
	}

	//Handles Mouse Leave Events
	function mouseLeaveHandler(mouseEnterEvent: React.MouseEvent<HTMLElement>, menuItem: MenuItem) {
		//Update the Hovering Status
		setActiveMenuItem(null);
	}

	//Return the Component's Content
	return (
		<div className={`flex flex-row h-20 w-full justify-between ${className} gap-60`}>
			{/*Loop through the Menu Items and Add them into the Menu*/}
			{menuItems.map((menuItem, index) => (
				<div key={`${index}-${menuItem.name}`} className="w-full flex justify-center">
					<button
						data-name={menuItem.name}
						data-path={menuItem.path}
						className="transition duration-300 ease-in-out h-full text-4xl hover:scale-150 hover:animate-pulse hover:translate-y-[-10px] font-bold hover:text-rose-600 px-4 py-2 rounded-lg text-center drop-shadow-[0px_0px_5px_white] hover:drop-shadow-[0_0_15px_red] select-none font-pixelify font-bold"
						onMouseEnter={event => mouseEnterHandler(event, menuItem)}
						onMouseLeave={event => mouseLeaveHandler(event, menuItem)}
						onClick={onClick}
					>
						{menuItem === activeMenuItem && menuItem.icon?.hover}
						{menuItem !== activeMenuItem && menuItem.icon?.normal}
						{!menuItem.icon && menuItem.name}
					</button>
				</div>
			))}
		</div>
	);
}
