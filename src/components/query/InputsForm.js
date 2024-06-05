import React from 'react';
import { Box, Typography, IconButton } from "@mui/material";
import NestedField from './NestedField';
import AddButton from './AddQueryButton';
import { Delete } from '@mui/icons-material';

const InputsForm = ({ inputs, setInputs }) => {
    const handleAddInput = () => {
        setInputs([...inputs, { inputId: '', inputName: '', type: '', inputValue: '' }]);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newInputs = [...inputs];
        newInputs[index][name] = value;
        setInputs(newInputs);
    };

    const handleDeleteInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };

    return (
        <Box>
            <Typography variant="h6">Inputs</Typography>
            {inputs.map((input, index) => (
                <Box key={index} mb={2} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <NestedField label="Input ID" name="inputId" value={input.inputId} onChange={(e) => handleInputChange(index, e)} />
                        <NestedField label="Input Name" name="inputName" value={input.inputName} onChange={(e) => handleInputChange(index, e)} />
                        <NestedField label="Type" name="type" value={input.type} onChange={(e) => handleInputChange(index, e)} />
                        <NestedField label="Input Value" name="inputValue" value={input.inputValue} onChange={(e) => handleInputChange(index, e)} />
                    </Box>
                    <IconButton onClick={() => handleDeleteInput(index)} color="error">
                        <Delete />
                    </IconButton>
                </Box>
            ))}
            <AddButton onClick={handleAddInput} label="Add Input" />
        </Box>
    );
};

export default InputsForm;
