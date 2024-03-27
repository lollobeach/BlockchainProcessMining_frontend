import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function HomePage() {
    return (
        <Box display="flex" justifyContent="center">
            <Box>
                <Typography variant="h3">
                    Data Extraction
                </Typography>
                <Button variant="contained" sx={{padding: 1}}>
                    <Link to="/ocel" style={{textDecoration: "none"}}>
                        <Typography color="white">Extract data</Typography>
                    </Link>
                </Button>
            </Box>
        </Box>
    );
}

export default HomePage;