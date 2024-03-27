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
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
}

export default App;
