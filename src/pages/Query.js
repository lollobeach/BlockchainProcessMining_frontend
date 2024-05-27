import React, {useState} from 'react';
import {
    Box,
    Button,
    Stack,
    Typography,
    Switch,
    FormControlLabel,
} from "@mui/material";
import {Delete} from '@mui/icons-material';
import LinearProgress from "@mui/material/LinearProgress";
import {_queryGetByQuery} from "../api/services";
import NestedField from '../components/query/NestedField';
import RangeFields from '../components/query/RangeFields';
import InputsForm from '../components/query/InputsForm';
import StorageStateForm from '../components/query/StorageStateForm';
import InternalTxsForm from '../components/query/InternalTxsForm';
import EventsForm from '../components/query/EventsForm';
import QueryPageLayout from "../layouts/QueryPageLayout";

function Query() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        txHash: '',
        contractAddress: '',
        sender: '',
        gasUsed: '',
        gasUsedFrom: '',
        gasUsedTo: '',
        activity: '',
        blockNumber: '',
        blockNumberFrom: '',
        blockNumberTo: '',
        timestampFrom: '',
        timestampTo: '',
        inputs: [],
        storageState: [],
        internalTxs: [],
        events: []
    });

    const [showGasUsedRange, setShowGasUsedRange] = useState(false);
    const [showBlockNumberRange, setShowBlockNumberRange] = useState(false);

    const [results, setResults] = useState([]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSwitchChange = (setter) => (event) => {
        setter(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const filterEmptyFields = (obj) => {
            if (Array.isArray(obj)) {
                return obj.filter(item => {
                    return Object.values(item).some(value => value !== '' && value !== null && value !== undefined);
                });
            } else if (typeof obj === 'object' && obj !== null) {
                return Object.keys(obj).reduce((acc, key) => {
                    const value = obj[key];
                    if (value !== '' && value !== null && value !== undefined) {
                        if (typeof value === 'object') {
                            const nestedObject = filterEmptyFields(value);
                            if (Object.keys(nestedObject).length > 0) {
                                acc[key] = nestedObject;
                            }
                        } else {
                            acc[key] = value;
                        }
                    }
                    return acc;
                }, {});
            }
            return obj;
        };

        const filteredData = filterEmptyFields(formData);
        console.log(filteredData)

        _queryGetByQuery(filteredData)
            .then(response => {
                setResults(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Errore nell\'esecuzione della query:', error);
                setLoading(false);
            });
    };

    return (
        <QueryPageLayout loading={loading} setLoading={setLoading} results={results} setResults={setResults}>
            <Stack justifyContent="space-evenly" height="100%">
                <Box display="flex" justifyContent="space-between" gap={5}>
                    <Box width="100%">
                        <Box mb={4}>
                            <Typography textAlign="center" variant="h3">
                                Transaction Extractor
                            </Typography>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2} justifyContent="center">
                                <Box display="flex" alignItems="center" gap={2}>
                                    <NestedField label="Transaction Hash" name="txHash" value={formData.txHash}
                                                 onChange={handleChange}/>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <NestedField label="Contract Address" name="contractAddress"
                                                 value={formData.contractAddress} onChange={handleChange}/>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <NestedField label="Sender" name="sender" value={formData.sender}
                                                 onChange={handleChange}/>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <RangeFields
                                        title="Gas Used"
                                        name="gasUsed"
                                        from={formData.gasUsedFrom}
                                        to={formData.gasUsedTo}
                                        type="number"
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <NestedField label="Activity" name="activity" value={formData.activity}
                                                 onChange={handleChange}/>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <RangeFields
                                        title="Block Number"
                                        name="blockNumber"
                                        from={formData.blockNumberFrom}
                                        to={formData.blockNumberTo}
                                        type="number"
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <RangeFields
                                        title="Timestamp"
                                        name="timestamp"
                                        from={formData.timestampFrom}
                                        to={formData.timestampTo}
                                        type="datetime-local"
                                        onChange={handleChange}
                                    />
                                </Box>
                                <InputsForm inputs={formData.inputs}
                                            setInputs={(inputs) => setFormData({...formData, inputs})}/>
                                <StorageStateForm storageState={formData.storageState}
                                                  setStorageState={(storageState) => setFormData({
                                                      ...formData,
                                                      storageState
                                                  })}/>
                                <InternalTxsForm internalTxs={formData.internalTxs}
                                                 setInternalTxs={(internalTxs) => setFormData({
                                                     ...formData,
                                                     internalTxs
                                                 })}/>
                                <EventsForm events={formData.events}
                                            setEvents={(events) => setFormData({...formData, events})}/>
                                <Box display="flex" justifyContent="space-between" gap={2}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        disabled={loading}
                                        sx={{
                                            padding: 1,
                                            height: "40px",
                                            backgroundColor: "#66cdaa",
                                            '&:hover': {backgroundColor: "#6fa287"}
                                        }}
                                    >
                                        <Box width="100%">
                                            {loading ? <LinearProgress/> : <>Cerca</>}
                                        </Box>
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={() => setFormData({
                                            txHash: '',
                                            contractAddress: '',
                                            sender: '',
                                            gasUsed: '',
                                            gasUsedFrom: '',
                                            gasUsedTo: '',
                                            activity: '',
                                            blockNumber: '',
                                            blockNumberFrom: '',
                                            blockNumberTo: '',
                                            timestamp: '',
                                            timestampFrom: '',
                                            timestampTo: '',
                                            inputs: [],
                                            storageState: [],
                                            internalTxs: [],
                                            events: []
                                        })}
                                        sx={{
                                            padding: 1,
                                            height: "40px",
                                            backgroundColor: "#f44336",
                                            '&:hover': {backgroundColor: "#d32f2f"}
                                        }}
                                        startIcon={<Delete/>}
                                    >
                                        Svuota tutti i campi
                                    </Button>
                                </Box>

                            </Stack>
                        </form>
                    </Box>
                </Box>
            </Stack>
        </QueryPageLayout>
    );
}

export default Query;