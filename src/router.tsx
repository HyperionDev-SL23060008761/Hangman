//External Imports
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";

//Setup the Router
const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
]);

//Export the Router
export default function Router() {
	return <RouterProvider router={router} />;
}
