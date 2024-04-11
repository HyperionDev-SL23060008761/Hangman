//External Imports
import React, { useState } from "react";

//Setup the Content Loader Component
export default function ContentLoader() {
	//Setup the Media Accepted Status
	const [mediaAccepted, setMediaAccepted] = useState<boolean>(
		navigator.userActivation.hasBeenActive
	);

	//Update the Media Accepted Status
	updateMediaAcceptedStatus();

	//Updates the Media Accepted Status
	function updateMediaAcceptedStatus() {
		//Check if the Media is already accepted and return
		if (mediaAccepted) return;

		//Check if the Navigator is not Valid and set the media accepted status to truye
		if (!navigator.userActivation) return setMediaAccepted(true);

		//Check if the Status Changed and Update the Status
		if (navigator.userActivation.hasBeenActive !== mediaAccepted) return setMediaAccepted(true);

		//Update the Status again after 500 milliseconds
		setTimeout(updateMediaAcceptedStatus, 500);
	}

	//Return the Component's Content
	return (
		<React.Fragment>
			{!mediaAccepted && (
				<div className="absolute h-screen w-screen left-0 top-0 z-10 flex justify-center items-center backdrop-blur-lg bg-black/50 flex flex-col gap-10">
					<p className="text-2xl font-bold">
						This site requires you to first Allow the use of media before continuing, please click
						Accept Below
					</p>
					<button className="hover:translate-y-[-5px] hover:shadow-[1px_2px_7px_green] hover:scale-110 duration-150 bg-green-600 text-2xl rounded-md font-bold px-4 py-2">
						Accept
					</button>
				</div>
			)}
		</React.Fragment>
	);
}
