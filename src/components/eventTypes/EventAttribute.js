import React from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import CustomTypography from "../CustomTypography";
import DeleteIcon from "@mui/icons-material/Delete";
import {findValue} from "../../utils";
import useDataContext from "../../dataContext/useDataContext";

function EventAttribute({keys, attribute, index, eventType, setEventAttributes, eventAttributes, isEventType}) {

    const {results, ocel} = useDataContext()

    const [attributeType, setAttributeType] = React.useState()

    const handleRemoveAttribute = (input) => {
        setEventAttributes(eventAttributes.filter(attribute => attribute.name !== input.name))
    }

    const handleSelectKeyAttribute = (e) => {
        setEventAttributes(eventAttributes.map(item => item === attribute ? {
            ...item,
            key: e.target.value,
            value: ""
        } : item))

        const values = []
        if (Array.isArray(results)) {
            findValue(results, e.target.value, values)
        }
    }

    const handleSelectValueAttribute = (e) => {
        setEventAttributes(eventAttributes.map(item => item === attribute ? {
            ...item,
            value: e.target.value,
            key: ""
        } : item))

        const values = []
        if (Array.isArray(results)) {
            findValue(results, e.target.value, values)
        }

        if (eventType) {
            console.log(values)
            console.log(eventType)
            console.log(ocel.eventTypes)
        }
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
                    <Stack>
                        <FormControl fullWidth sx={{width: 200}}>
                            <InputLabel>Key</InputLabel>
                            <Select
                                value={attribute.key}
                                label="name"
                                onChange={(e) => handleSelectKeyAttribute(e)}
                            >
                                {
                                    keys.map((name, index) => (
                                        <MenuItem key={index} value={name}
                                                  sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{width: 200, marginTop: 1}}>
                            <InputLabel>Value</InputLabel>
                            <Select
                                value={attribute.value}
                                label="name"
                                onChange={(e) => handleSelectValueAttribute(e)}
                            >
                                {
                                    keys.map((name, index) => (
                                        <MenuItem key={index} value={name}
                                                  sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>
                {!isEventType &&
                    <Box display="flex" gap={1} alignItems="center" marginTop={1}>
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"value":
                        </CustomTypography>
                        {/*<Stack spacing={1}>*/}
                        {/*    <FormControl fullWidth sx={{width: 200}}>*/}
                        {/*        <InputLabel>Key</InputLabel>*/}
                        {/*        <Select*/}
                        {/*            value={isEventType ? attribute.type : attribute.value}*/}
                        {/*            label="name"*/}
                        {/*            onChange={(e) => (setEventAttributes(eventAttributes.map(item => item === attribute ? {*/}
                        {/*                ...item,*/}
                        {/*                [isEventType ? "type" : "value"]: e.target.value*/}
                        {/*            } : item)))}*/}
                        {/*        >*/}
                        {/*            {*/}
                        {/*                keys.map((name, index) => (*/}
                        {/*                    <MenuItem key={index} value={name}*/}
                        {/*                              sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>*/}
                        {/*                ))*/}
                        {/*            }*/}
                        {/*        </Select>*/}
                        {/*    </FormControl>*/}
                        {/*    <FormControl fullWidth sx={{width: 200}}>*/}
                        {/*        <InputLabel>Value</InputLabel>*/}
                        {/*        <Select*/}
                        {/*            value={isEventType ? attribute.type : attribute.value}*/}
                        {/*            label="name"*/}
                        {/*            onChange={(e) => (setEventAttributes(eventAttributes.map(item => item === attribute ? {*/}
                        {/*                ...item,*/}
                        {/*                [isEventType ? "type" : "value"]: e.target.value*/}
                        {/*            } : item)))}*/}
                        {/*        >*/}
                        {/*            {*/}
                        {/*                values.map((name, index) => (*/}
                        {/*                    <MenuItem key={index} value={name}*/}
                        {/*                              sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>*/}
                        {/*                ))*/}
                        {/*            }*/}
                        {/*        </Select>*/}
                        {/*    </FormControl>*/}
                        {/*</Stack>*/}
                    </Box>
                }
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}{index !== eventAttributes.length - 1 && ","}
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

export default EventAttribute;