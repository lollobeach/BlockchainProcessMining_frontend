import React from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import CustomTypography from "../CustomTypography";
import DeleteIcon from "@mui/icons-material/Delete";

function EventRelationship({
                               objects,
                               eventKeys,
                               eventValues,
                               relationship,
                               eventRelationships,
                               setEventRelationships,
                               index
                           }) {

    const handleRemoveRelationShip = (input) => {
        setEventRelationships(eventRelationships.filter(relationship => relationship.objectId !== input.objectId))
    }

    return (
        <Box display="flex" alignItems="center">
            <Box>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}
                </CustomTypography>
                <Box display="flex" gap={1} alignItems="center">
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"objectId":
                    </CustomTypography>
                    <FormControl fullWidth sx={{width: 200}}>
                        <InputLabel>ID</InputLabel>
                        <Select
                            value={relationship.objectId}
                            label="name"
                            onChange={(e) => (setEventRelationships(eventRelationships.map(item => item === relationship ? {
                                ...item,
                                objectId: e.target.value
                            } : item)))}
                        >
                            {
                                objects.map((object, index) => (
                                    <MenuItem key={index} value={object.id}
                                              sx={{width: 400, overflow: "auto"}}>{object.id}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box display="flex" gap={1} alignItems="center" marginTop={1}>
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"qualifier":
                    </CustomTypography>
                    <Stack spacing={1}>
                        <FormControl fullWidth sx={{width: 200}}>
                            <InputLabel>Key</InputLabel>
                            <Select
                                value={relationship.qualifier}
                                label="name"
                                onChange={(e) => (setEventRelationships(eventRelationships.map(item => item === relationship ? {
                                    ...item,
                                    qualifier: e.target.value
                                } : item)))}
                            >
                                {
                                    eventKeys.map((name, index) => (
                                        <MenuItem key={index} value={name}
                                                  sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{width: 200}}>
                            <InputLabel>Value</InputLabel>
                            <Select
                                value={relationship.qualifier}
                                label="name"
                                onChange={(e) => (setEventRelationships(eventRelationships.map(item => item === relationship ? {
                                    ...item,
                                    qualifier: e.target.value
                                } : item)))}
                            >
                                {
                                    eventValues.map((name, index) => (
                                        <MenuItem key={index} value={name}
                                                  sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}{index !== eventRelationships.length - 1 && ","}
                </CustomTypography>
            </Box>
            <Box marginLeft={2}>
                <Button onClick={() => handleRemoveRelationShip(relationship)} sx={{minWidth: 0, padding: 0}}>
                    <DeleteIcon sx={{fontSize: 25, color: "red"}}/>
                </Button>
            </Box>
        </Box>
    );
}

export default EventRelationship;