import React from 'react';
import {
    RouterProvider,
    createBrowserRouter,
} from "react-router";

import './App.css';
import HomePage from "./pages/HomePage";
import OcelMapping from "./pages/OcelMapping";
import BodyLayout from "./layouts/BodyLayout";
import {ThemeProvider} from "@mui/material";
import {customTheme} from "./theme/customTheme";
import DataProvider from "./dataContext/DataContext";
import Query from "./pages/Query";
import XesPage from "./pages/XesPage";
import NetworkGraph from "./pages/VisualModel";
import DataView from "./pages/DataView";

const router = createBrowserRouter([
    {
        path: "/", element: <BodyLayout/>,
        children: [
            {path: "/", element: <HomePage/>},
            {path: "/ocel", element: <OcelMapping/>},
            {path: "/query", element: <Query/>},
            {path: "/xes",element:<XesPage/>},
            {path: "/visual",element:<NetworkGraph/>},
            {path: "/view", element: <DataView/>}
        ]
    }
]);

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <DataProvider>
                <RouterProvider router={router}/>
            </DataProvider>
        </ThemeProvider>
    );
}

export default App;
