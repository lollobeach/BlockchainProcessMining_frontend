import React from 'react';
import { Box, Typography, IconButton } from "@mui/material";
import NestedField from './NestedField';
import AddButton from './AddQueryButton';
import { Delete } from '@mui/icons-material';

const StorageStateForm = ({ storageState, setStorageState }) => {
    const handleAddStorageState = () => {
        setStorageState([...storageState, { variableId: '', variableName: '', type: '', variableValue: '', variableRawValue: '' }]);
    };

    const handleStorageStateChange = (index, event) => {
        const { name, value } = event.target;
        const newStorageState = [...storageState];
        newStorageState[index][name] = value;
        setStorageState(newStorageState);
    };

    const handleDeleteStorageState = (index) => {
        const newStorageState = [...storageState];
        newStorageState.splice(index, 1);
        setStorageState(newStorageState);
    };

    return (
        <Box>
            <Typography variant="h6">Storage State</Typography>
            {storageState.map((state, index) => (
                <Box key={index} mb={2} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <NestedField label="Variable ID" name="variableId" value={state.variableId} onChange={(e) => handleStorageStateChange(index, e)} />
                        <NestedField label="Variable Name" name="variableName" value={state.variableName} onChange={(e) => handleStorageStateChange(index, e)} />
                        <NestedField label="Type" name="type" value={state.type} onChange={(e) => handleStorageStateChange(index, e)} />
                        <NestedField label="Variable Value" name="variableValue" value={state.variableValue} onChange={(e) => handleStorageStateChange(index, e)} />
                        <NestedField label="Variable Raw Value" name="variableRawValue" value={state.variableRawValue} onChange={(e) => handleStorageStateChange(index, e)} />
                    </Box>
                    <IconButton onClick={() => handleDeleteStorageState(index)} color="error">
                        <Delete />
                    </IconButton>
                </Box>
            ))}
            <AddButton onClick={handleAddStorageState} label="Add Storage State" />
        </Box>
    );
};

export default StorageStateForm;
