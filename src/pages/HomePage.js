import React, {useState, useEffect} from 'react';
import {
    Box,
    Button,
    FilledInput,
    FormControl,
    InputLabel,
    Stack,
    Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import {Link, useLocation} from "react-router-dom";

import {_sendData} from "../api/services";
import PageLayout from "../layouts/PageLayout";

import JsonResults from "../mock/jsonLog.json"
import useDataContext from "../dataContext/useDataContext";

function HomePage() {

    const {setResults} = useDataContext()

    const [contractName, setContractName] = useState("CakeOFT")
    const [contractAddress, setContractAddress] = useState("0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898")
    const [fromBlock, setFromBlock] = useState("18698008")
    const [toBlock, setToBlock] = useState("18698323")

    const [loading, setLoading] = useState(false)
    // const [results, setResults] = useState()

    // const {state} = useLocation()

    const sendData = async () => {
        setLoading(true)
        const response = await _sendData(contractName, contractAddress, fromBlock, toBlock)
        console.log(response)
        setResults(response)
        setLoading(false)
    }

    return (
        <PageLayout loading={loading} setLoading={setLoading}>
            <Stack justifyContent="space-between" height="100%">
                <Typography textAlign="center" variant="h3">
                    Data Extraction
                </Typography>
                <Stack spacing={2} minWidth={500} justifyContent="center">
                    <FormControl variant="filled">
                        <InputLabel sx={{fontWeight: "700", fontSize: "18px"}}>Contract Name</InputLabel>
                        <FilledInput defaultValue={contractName} label="Contract Name"
                                     onChange={(e) => setContractName(e.target.value)}/>
                    </FormControl>
                    <FormControl variant="filled">
                        <InputLabel sx={{fontWeight: "700", fontSize: "18px"}}>Contract Address</InputLabel>
                        <FilledInput defaultValue={contractAddress} label="Contract Address"
                                     onChange={(e) => setContractAddress(e.target.value)}/>
                    </FormControl>
                    <FormControl variant="filled">
                        <InputLabel sx={{fontWeight: "700", fontSize: "18px"}}>From Block</InputLabel>
                        <FilledInput defaultValue={fromBlock} label="From Block"
                                     onChange={(e) => setFromBlock(e.target.value)}/>
                    </FormControl>
                    <FormControl variant="filled">
                        <InputLabel sx={{fontWeight: "700", fontSize: "18px"}}>To Block</InputLabel>
                        <FilledInput defaultValue={toBlock} label="To Block"
                                     onChange={(e) => setToBlock(e.target.value)}/>
                    </FormControl>
                </Stack>
                <Stack spacing={1} width="100%">
                    <Button variant="contained" disabled={loading} onClick={sendData}
                            sx={{
                                padding: 1,
                                height: "40px",
                                backgroundColor: "#66cdaa",
                                '&:hover': {backgroundColor: "#6fa287"}
                            }}>
                        <Box width="100%">
                            {loading ?
                                <LinearProgress/>
                                :
                                <>
                                    Extract Data
                                </>
                            }
                        </Box>
                    </Button>
                    <Link to="/ocel" style={{textDecoration: "none"}}>
                        <Button variant="contained" sx={{padding: 1, width: "100%"}}>
                            <Typography color="white">Map data</Typography>
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </PageLayout>
    )
}

export default HomePage;