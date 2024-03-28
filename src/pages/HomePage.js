import React, {useState} from 'react';
import {
    Box,
    Button,
    FilledInput,
    FormControl,
    InputLabel,
    Stack,
    Typography,
    Card,
    CardHeader,
    CardContent, styled, CircularProgress, Grid
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import {Link} from "react-router-dom";

import JsonView from "@uiw/react-json-view";
import {darkTheme} from "@uiw/react-json-view/dark";

import {_downloadCSV, _downloadJson, _sendData} from "../api/services";
import {Download} from "@mui/icons-material";

const CardContentNoPadding = styled(CardContent)(
    `
    padding-top: 0;
    &:last-child {
        padding-bottom: 0;
    }
    `
)

function HomePage() {

    const [contractName, setContractName] = useState("CakeOFT")
    const [contractAddress, setContractAddress] = useState("0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898")
    const [fromBlock, setFromBlock] = useState("18698008")
    const [toBlock, setToBlock] = useState("18698323")

    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState()

    const [jsonUrl, setJsonUrl] = useState()

    const sendData = async () => {
        setLoading(true)
        const response = await _sendData(contractName, contractAddress, fromBlock, toBlock)
        setResults(response)
        setLoading(false)
    }

    const downloadJson = async () => {
        setLoading(true)
        const response = await _downloadJson(results)
        const href = window.URL.createObjectURL(response)
        const anchor = document.createElement('a')
        anchor.href = href
        anchor.download = "jsonLog.json"
        anchor.click()
        setLoading(false)
    }

    const downloadCSV = async () => {
        setLoading(true)
        const response = await _downloadCSV(results)
        const href = window.URL.createObjectURL(response)
        const anchor = document.createElement('a')
        anchor.href = href
        anchor.download = "jsonLog.csv"
        anchor.click()
        setLoading(false)
    }

    return (
        <Box display="flex" justifyContent="center" marginTop={5} paddingX={5} height="100%">
            <Grid container spacing={2}>
                <Grid item lg={6} md={12} width="100%">
                    <Stack spacing={5}>
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
                            <Button variant="contained" onClick={sendData}
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
                            <Button disabled={!results} variant="contained" sx={{padding: 1}}>
                                <Link to="/ocel" style={{textDecoration: "none"}}>
                                    <Typography color="white">Map data</Typography>
                                </Link>
                            </Button>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item lg={6} md={12} width="100%">
                    <Stack spacing={1}>
                        <Card sx={{minWidth: "500px", height: "500px"}}>
                            <CardHeader title="Results"/>
                            <CardContentNoPadding sx={{height: "calc(100% - 112px)", overflow: "auto"}}>
                                {
                                    loading ? (
                                            <Box width="100%" height="100%" display="flex" justifyContent="center"
                                                 alignItems="center">
                                                <CircularProgress/>
                                            </Box>
                                        ) :
                                        results &&
                                        <>
                                            <JsonView value={results} style={darkTheme} width="100%"/>
                                        </>
                                }
                            </CardContentNoPadding>
                        </Card>
                        <Box display="flex" justifyContent="space-evenly" alignItems="center" gap={1}>
                            <Button disabled={!results} startIcon={<Download/>} onClick={downloadJson} variant="contained" sx={{padding: 1, width: 120}}>
                                <Typography variant="h6">JSON</Typography>
                            </Button>
                            <Button disabled={!results} startIcon={<Download/>} onClick={downloadCSV} variant="contained" sx={{padding: 1, width: 120, backgroundColor: "#38a651", '&:hover': {backgroundColor: "#2f6749"}}} href={jsonUrl}
                                    download>
                                <Typography variant="h6">CSV</Typography>
                            </Button>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>

            {/*{*/}
            {/*    jsonUrl &&*/}
            {/*    <Box>*/}
            {/*        <Typography variant="h6" textAlign="center">*/}
            {/*            Download the JSON file*/}
            {/*        </Typography>*/}
            {/*        <Button variant="contained" sx={{padding: 1}} href={jsonUrl} download>*/}
            {/*            Download*/}
            {/*        </Button>*/}
            {/*    </Box>*/}
            {/*}*/}
        </Box>
    );
}

export default HomePage;