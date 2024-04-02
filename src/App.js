import React from 'react';
import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";

import './App.css';
import HomePage from "./pages/HomePage";
import OcelFormatting from "./pages/OcelFormatting";
import BodyLayout from "./layouts/BodyLayout";
import {ThemeProvider} from "@mui/material";
import {customTheme} from "./theme/customTheme";
import DataProvider from "./dataContext/DataContext";

const router = createBrowserRouter([
    {
        path: "/", element: <BodyLayout/>,
        children: [
            {path: "/", element: <HomePage/>},
            {path: "/ocel", element: <OcelFormatting/>},
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
