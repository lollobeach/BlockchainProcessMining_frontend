import React, {useState, useEffect} from 'react';
import {
    Alert,
    Box,
    Button, Dialog, DialogContent, DialogTitle,
    FilledInput,
    FormControl, IconButton,
    InputLabel, MenuItem, Select, Slide, Slider, Snackbar,
    Stack,
    Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import {Link} from "react-router-dom";

import {_sendData} from "../api/services";
import PageLayout from "../layouts/PageLayout";

import useDataContext from "../dataContext/useDataContext";
import {HiddenInput} from "../components/HiddenInput";
import {FileUpload, FilterList} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function HomePage() {

    const {setResults} = useDataContext()

    const [contractName, setContractName] = useState("CakeOFT")
    const [contractAddress, setContractAddress] = useState("0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898")
    const [fromBlock, setFromBlock] = useState("18698008")
    const [toBlock, setToBlock] = useState("18698323")

    const [network, setNetwork] = useState("Mainnet")
    const [loading, setLoading] = useState(false)
    const [smartContract, setSmartContract] = useState(null)

    const [error, setError] = useState()

    const [openFilters, setOpenFilters] = useState(false)
    const [gasUsed, setGasUsed] = useState([0, 1000000])

    const sendData = async () => {
        setLoading(true)
        const response = await _sendData(contractName, contractAddress, fromBlock, toBlock, network, smartContract)
        if (response.status === 200) {
            setResults(response.data)
            setLoading(false)
        } else {
            setError(response.data)
            setLoading(false)
        }
    }

    const networks = ["Mainnet", "Sepolia", "Polygon", "Mumbai"]

    useEffect(() => {
        switch (network) {
            case "Mainnet":
                setContractName("CakeOFT")
                setContractAddress("0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898")
                setFromBlock("18698008")
                setToBlock("18698323")
                break
            case "Sepolia":
                setContractName("emergencyResponsePlan")
                setContractAddress("0xD4c4C6562cb70188d019C106D3C6305E74530247")
                setFromBlock("5713209")
                setToBlock("5713239")
                break
            case "Polygon":
                setContractName("")
                setContractAddress("")
                setFromBlock("")
                setToBlock("")
                break
            case "Mumbai":
                setContractName("EmergencyResponsePlan")
                setContractAddress("0x381942ED223ca793D32b7ccF3499e94766A9FBA4")
                setFromBlock("47081256")
                setToBlock("47081375")
                break
            default:
                console.log("Change Network")
        }

    }, [network, smartContract]);

    const handleNetworkChange = (e) => {
        setNetwork(e.target.value)
    }

    const handleContractUpload = (e) => {
        const file = e.target.files[0]
        setSmartContract(file)
        e.target.value = null
    }

    window.onclick = function (event) {
        setError(null)
    }

    return (
        <>
            <Snackbar open={error} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert severity="error" variant="filled" sx={{width: "100%"}}>
                    {error}
                </Alert>
            </Snackbar>
            <Dialog
                TransitionComponent={Transition}
                keepMounted
                open={openFilters}
                onClose={() => setOpenFilters(false)}
            >
                <DialogTitle>
                    <Typography variant="h5">Filters</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography fontWeight={700}>Gas Used</Typography>
                    <Slider
                        value={gasUsed}
                        onChange={(e, newValue) => setGasUsed(newValue)}
                        valueLabelDisplay="auto"
                        getAriaValueText={(value) => `${value}`}
                    />
                </DialogContent>
            </Dialog>
            <PageLayout loading={loading} setLoading={setLoading}>
                <Box display="flex" justifyContent="space-between">
                    <IconButton size="large" sx={{color: "#ffb703"}} onClick={() => setOpenFilters(true)}>
                        <FilterList fontSize="large"/>
                    </IconButton>
                    <FormControl fullWidth sx={{width: 200}}>
                        <InputLabel>Network</InputLabel>
                        <Select
                            value={network}
                            label="name"
                            onChange={(e) => handleNetworkChange(e)}
                        >
                            {
                                networks.map((name, index) => (
                                    <MenuItem key={index} value={name}>
                                        <Typography>{name}</Typography>
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Stack justifyContent="space-evenly" height="100%">
                    <Box display="flex" justifyContent="space-between" gap={5}>
                        <Box width="100%">
                            <Typography textAlign="center" variant="h3">
                                Data Extraction
                            </Typography>
                            <Stack spacing={2} justifyContent="center">
                                <FormControl variant="filled">
                                    <InputLabel sx={{fontWeight: "700", fontSize: "18px"}}>Contract Name</InputLabel>
                                    <FilledInput value={contractName} label="Contract Name"
                                                 onChange={(e) => setContractName(e.target.value)}/>
                                </FormControl>
                                <FormControl variant="filled">
                                    <InputLabel sx={{fontWeight: "700", fontSize: "18px"}}>Contract Address</InputLabel>
                                    <FilledInput value={contractAddress} label="Contract Address"
                                                 onChange={(e) => setContractAddress(e.target.value)}/>
                                </FormControl>
                                <FormControl variant="filled">
                                    <InputLabel sx={{fontWeight: "700", fontSize: "18px"}}>From Block</InputLabel>
                                    <FilledInput value={fromBlock} label="From Block"
                                                 onChange={(e) => setFromBlock(e.target.value)}/>
                                </FormControl>
                                <FormControl variant="filled">
                                    <InputLabel sx={{fontWeight: "700", fontSize: "18px"}}>To Block</InputLabel>
                                    <FilledInput value={toBlock} label="To Block"
                                                 onChange={(e) => setToBlock(e.target.value)}/>
                                </FormControl>
                            </Stack>
                        </Box>
                        {/*<Box width="100%">*/}
                        {/*    <Typography variant="h6" color="gray">filters</Typography>*/}
                        {/*    <Stack spacing={1} marginTop={1}>*/}
                        {/*        <Typography fontWeight={700}>Gas Used</Typography>*/}
                        {/*        <Box display="flex" gap={1}>*/}
                        {/*            <TextField type="number" label="From"/>*/}
                        {/*            <TextField type="number" label="To"/>*/}
                        {/*        </Box>*/}
                        {/*        <Typography fontWeight={700}>Sender</Typography>*/}
                        {/*        <TextField label="Address"/>*/}
                        {/*        <Typography fontWeight={700}>Timestamp</Typography>*/}
                        {/*        <Box display="flex" gap={1}>*/}
                        {/*            <TextField type="number" label="From"/>*/}
                        {/*            <TextField type="number" label="To"/>*/}
                        {/*        </Box>*/}
                        {/*    </Stack>*/}
                        {/*</Box>*/}
                    </Box>
                    <Stack spacing={1} width="100%">
                        <Box height="24px" display="flex" width="50%" gap={2}>
                            {smartContract &&
                                <>
                                    <Typography>{smartContract.name}</Typography>
                                    <Button onClick={() => setSmartContract(null)}>
                                        <DeleteIcon sx={{color: "red"}}/>
                                    </Button>
                                </>
                            }
                        </Box>
                        <Box display="flex" width="100%" gap={1}>
                            <Button fullWidth component="label" startIcon={<FileUpload/>} variant="contained"
                                    disabled={loading}
                                    sx={{
                                        backgroundColor: "#86469C",
                                        '&:hover': {backgroundColor: "#512960"}
                                    }}
                            >
                                Upload Smart Contract
                                <HiddenInput type="file" accept=".sol" onChange={handleContractUpload}/>
                            </Button>
                            <Button fullWidth variant="contained" disabled={loading} onClick={sendData}
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
                        </Box>
                        <Link to="/ocel" style={{textDecoration: "none"}}>
                            <Button variant="contained" sx={{padding: 1, width: "100%"}}>
                                <Typography color="white">Map data</Typography>
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </PageLayout>
        </>
    )
}

export default HomePage;