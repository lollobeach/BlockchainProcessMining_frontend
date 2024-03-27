import React from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import CustomTypography from "./CustomTypography";
import DeleteIcon from "@mui/icons-material/Delete";

function ItemAttribute({attribute, index, setItemAttributes, itemAttributes}) {
    const handleRemoveAttribute = (input) => {
        setItemAttributes(itemAttributes.filter(attribute => attribute.name !== input.name))
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}
                </CustomTypography>
                <Box display="flex" gap={1} alignItems="center">
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":
                    </CustomTypography>
                    <FormControl fullWidth sx={{minWidth: 150}}>
                        <InputLabel>Attribute Name</InputLabel>
                        <Select
                            value={attribute.name}
                            label="name"
                            onChange={(e) => (setItemAttributes(itemAttributes.map(item => item === attribute ? {
                                ...item,
                                name: e.target.value
                            } : item)))}
                        >
                            <MenuItem value="amount">Amount</MenuItem>
                            <MenuItem value="date">Date</MenuItem>
                            <MenuItem value="authority">Authority</MenuItem>
                            <MenuItem value="process">Process</MenuItem>
                            <MenuItem value="duration">Duration</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box display="flex" gap={1} alignItems="center" marginTop={1}>
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"type":
                    </CustomTypography>
                    <FormControl fullWidth sx={{minWidth: 150}}>
                        <InputLabel>Attribute Type</InputLabel>
                        <Select
                            value={attribute.type}
                            label="name"
                            onChange={(e) => (setItemAttributes(itemAttributes.map(item => item === attribute ? {
                                ...item,
                                type: e.target.value
                            } : item)))}
                        >
                            <MenuItem value="uint">Uint</MenuItem>
                            <MenuItem value="date">Date</MenuItem>
                            <MenuItem value="string">String</MenuItem>
                            <MenuItem value="uuid">UUID</MenuItem>
                            <MenuItem value="timestamp">Timestamp</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}{index !== itemAttributes.length - 1 && ","}
                </CustomTypography>
            </Box>
            <Box marginLeft={2}>
                <Button onClick={() => handleRemoveAttribute(attribute)} sx={{minWidth: 0, padding: 0}}>
                    <DeleteIcon sx={{fontSize: 25, color: "red"}}/>
                </Button>
            </Box>
        </Box>
    );
}

export default ItemAttribute;