//External Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { store, persistor } from "./datastore/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

//Internal Imports
import "./index.css";
import Router from "./router";

//Get the Root Element
const rootElement = document.getElementById("root") as HTMLElement;

//Setup the React Root
const root = ReactDOM.createRoot(rootElement);

//Setup the Query Client
const queryClient = new QueryClient();

//Render the React Root
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<QueryClientProvider client={queryClient}>
				<React.StrictMode>
					<Router />
				</React.StrictMode>
			</QueryClientProvider>
		</PersistGate>
	</Provider>
);
