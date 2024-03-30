import React from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import CustomTypography from "../CustomTypography";
import DeleteIcon from "@mui/icons-material/Delete";

function ObjectAttribute({keys, values, attribute, index, setObjectsAttributes, objectAttributes, isObjectType}) {

    const handleRemoveAttribute = (input) => {
        setObjectsAttributes(objectAttributes.filter(attribute => attribute.name !== input.name))
    }

    return (
        <Box display="flex" alignItems="center">
            <Box>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}
                </CustomTypography>
                <Box display="flex" gap={1} alignItems="center">
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":
                    </CustomTypography>
                    <Stack spacing={1}>
                        <FormControl fullWidth sx={{width: 200}}>
                            <InputLabel>Key</InputLabel>
                            <Select
                                value={attribute.name}
                                label="name"
                                onChange={(e) => (setObjectsAttributes(objectAttributes.map(item => item === attribute ? {
                                    ...item,
                                    name: e.target.value
                                } : item)))}
                            >
                                {
                                    keys.map((name, index) => (
                                        <MenuItem key={index} value={name}
                                                  sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{width: 200}}>
                            <InputLabel>Value</InputLabel>
                            <Select
                                value={attribute.name}
                                label="name"
                                onChange={(e) => (setObjectsAttributes(objectAttributes.map(item => item === attribute ? {
                                    ...item,
                                    name: e.target.value
                                } : item)))}
                            >
                                {
                                    values.map((name, index) => (
                                        <MenuItem key={index} value={name}
                                                  sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>
                {
                    isObjectType ? (
                        <Box display="flex" gap={1} alignItems="center" marginTop={1}>
                            <CustomTypography>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"type":
                            </CustomTypography>
                            <Stack spacing={1}>
                                <FormControl fullWidth sx={{width: 200}}>
                                    <InputLabel>Key</InputLabel>
                                    <Select
                                        value={attribute.type}
                                        label="name"
                                        onChange={(e) => (setObjectsAttributes(objectAttributes.map(item => item === attribute ? {
                                            ...item,
                                            type: e.target.value
                                        } : item)))}
                                    >
                                        {
                                            keys.map((name, index) => (
                                                <MenuItem key={index} value={name}
                                                          sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{width: 200}}>
                                    <InputLabel>Value</InputLabel>
                                    <Select
                                        value={attribute.type}
                                        label="name"
                                        onChange={(e) => (setObjectsAttributes(objectAttributes.map(item => item === attribute ? {
                                            ...item,
                                            type: e.target.value
                                        } : item)))}
                                    >
                                        {
                                            values.map((name, index) => (
                                                <MenuItem key={index} value={name}
                                                          sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Box>
                    ) : (
                        <>
                            <Box display="flex" gap={1} alignItems="center" marginTop={1}>
                                <CustomTypography>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"time":
                                </CustomTypography>
                                <FormControl fullWidth sx={{width: 200}}>
                                    <InputLabel>Time</InputLabel>
                                    <Select
                                        value={attribute.time}
                                        label="name"
                                        onChange={(e) => (setObjectsAttributes(objectAttributes.map(item => item === attribute ? {
                                            ...item,
                                            time: e.target.value
                                        } : item)))}
                                    >
                                        {
                                            values.filter(value => !isNaN(new Date(value).getTime()) && value.toString().includes("Z")).map((name, index) => (
                                                <MenuItem key={index} value={name}
                                                          sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box display="flex" gap={1} alignItems="center" marginTop={1}>
                                <CustomTypography>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"value":
                                </CustomTypography>
                                <Stack spacing={1}>
                                    <FormControl fullWidth sx={{width: 200}}>
                                        <InputLabel>Key</InputLabel>
                                        <Select
                                            value={attribute.value}
                                            label="name"
                                            onChange={(e) => (setObjectsAttributes(objectAttributes.map(item => item === attribute ? {
                                                ...item,
                                                value: e.target.value
                                            } : item)))}
                                        >
                                            {
                                                keys.map((name, index) => (
                                                    <MenuItem key={index} value={name}
                                                              sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth sx={{width: 200}}>
                                        <InputLabel>Value</InputLabel>
                                        <Select
                                            value={attribute.value}
                                            label="name"
                                            onChange={(e) => (setObjectsAttributes(objectAttributes.map(item => item === attribute ? {
                                                ...item,
                                                value: e.target.value
                                            } : item)))}
                                        >
                                            {
                                                values.map((name, index) => (
                                                    <MenuItem key={index} value={name}
                                                              sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Box>
                        </>
                    )
                }
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}{index !== objectAttributes.length - 1 && ","}
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

export default ObjectAttribute;