import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Keep this
import {DataProvider} from './Components/DataProvider/DataProvider.jsx'
import {reducer,initialState} from './Utilities/reducer.jsx'
ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider reducer={reducer} initialState={initialState}> 
    <App />
  </DataProvider>
);
