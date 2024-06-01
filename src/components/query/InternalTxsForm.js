import React from 'react';
import { Box, Typography, IconButton } from "@mui/material";
import NestedField from './NestedField';
import AddButton from './AddQueryButton';
import { Delete } from '@mui/icons-material';

const InternalTxsForm = ({ internalTxs, setInternalTxs }) => {
    const handleAddInternalTx = () => {
        setInternalTxs([...internalTxs, { callId: '', callType: '', to: '', inputsCall: [''] }]);
    };

    const handleInternalTxChange = (index, event) => {
        const { name, value } = event.target;
        const newInternalTxs = [...internalTxs];
        newInternalTxs[index][name] = value;
        setInternalTxs(newInternalTxs);
    };

    const handleDeleteInternalTx = (index) => {
        const newInternalTxs = [...internalTxs];
        newInternalTxs.splice(index, 1);
        setInternalTxs(newInternalTxs);
    };



    return (
        <Box>
            <Typography variant="h6">Internal Transactions</Typography>
            {internalTxs.map((internalTxs, index) => (
                <Box key={index} mb={2} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <NestedField label="Call ID" name="callId" value={internalTxs.callId} onChange={(e) => handleInternalTxChange(index, e)} />
                        <NestedField label="Call Type" name="callType" value={internalTxs.callType} onChange={(e) => handleInternalTxChange(index, e)} />
                        <NestedField label="To" name="to" value={internalTxs.to} onChange={(e) => handleInternalTxChange(index, e)} />
                    </Box>
                    <IconButton onClick={() => handleDeleteInternalTx(index)} color="error">
                        <Delete />
                    </IconButton>
                </Box>
            ))}
            <AddButton onClick={handleAddInternalTx} label="Add Internal Transaction" />
        </Box>
    );
};

export default InternalTxsForm;
