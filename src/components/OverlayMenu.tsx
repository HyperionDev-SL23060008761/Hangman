"use client";

//External Imports
import React from "react";

//Setup the Overlay Menu Component
export default function OverlayMenu({
	children,
	title,
	className,
	onClose,
}: {
	children: JSX.Element | Array<JSX.Element>;
	title: string;
	className?: string;
	onClose?: () => void;
}) {
	//Return the Component's Content
	return (
		<div className="absolute h-screen w-screen left-0 top-0 z-10 justify-center items-center flex flex-col gap-10">
			{/*Setup the Overlay*/}
			<div className="absolute h-screen w-screen backdrop-blur-lg bg-black/50"></div>

			{/*Setup the Main Content*/}
			<div
				className={`bg-gray-900 text-white w-1/2 h-1/2 flex flex-col justify-baseline items-center shadow-[0_0_15px_7px] shadow-[#0000004D] p-5 z-[1] ${className}`}
			>
				{/*Setup the Title*/}
				<h1 className="text-2xl font-bold font-pixelify drop-shadow-[0_0px_5px_#FFFFFFFF] select-none">
					{title}
				</h1>

				{/*Setup the Options Area*/}
				<div className="h-full w-full flex flex-col justify-evenly items-center py-4">
					{/*Setup the Content*/}
					{children}
				</div>

				{/*Setup the Close Button*/}
				<div className="w-[100%] flex flex-row justify-center items-end">
					<button
						onClick={() => (onClose ? onClose() : null)}
						className="w-40 hover:translate-y-[-2px] transition duration-300 hover:animate-pulse hover:shadow-[0px_1px_5px_#1c76fc] shadow-[0px_2px_10px_#00000095] bg-[#16212d]  hover:translate-y-[-2px] hover:text-[#1c76fc] px-4 py-2 border-1 border-solid outline-none transition duration-400 ease-in-out text-md font-bold rounded-lg text-center select-none font-pixelify font-bold"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
