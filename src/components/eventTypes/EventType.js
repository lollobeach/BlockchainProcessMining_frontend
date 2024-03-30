import React, {useState, useEffect} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomTypography from "../CustomTypography";
import EventAttribute from "./EventAttribute";

function EventType({eventsKey, eventsValue, setEventTypesItem, eventsTypesItem, eventType, index}) {

    const [eventAttributes, setEventAttributes] = useState([])

    useEffect(() => {
        eventType.attributes = eventAttributes
    }, [eventAttributes]);

    const handleAddEventAttribute = () => {
        setEventAttributes([...eventAttributes, {name: "", type: ""}])
    }

    const handleRemoveEvent = (event) => {
        setEventTypesItem(eventsTypesItem.filter(item => item.name !== event.name))
    }

    const handleSelectEventName = (e) => {
        setEventTypesItem(eventsTypesItem.map(item => item === eventType ? {
            ...item,
            name: e.target.value
        } : item))
    }

    return (
        <Box display="flex">
            <Box>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}
                </CustomTypography>
                <Box display="flex" gap={1} alignItems="center">
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":
                    </CustomTypography>
                    <Stack spacing={1}>
                        <FormControl fullWidth sx={{width: 200}}>
                            <InputLabel>Key</InputLabel>
                            <Select
                                value={eventType.name}
                                label="name"
                                onChange={(e) => handleSelectEventName(e)}
                            >
                                {
                                    eventsKey.map((name, index) => (
                                        <MenuItem key={index} value={name}>{name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{width: 200}}>
                            <InputLabel>Value</InputLabel>
                            <Select
                                value={eventType.name}
                                label="name"
                                onChange={(e) => handleSelectEventName(e)}
                            >
                                {
                                    eventsValue.map((name, index) => (
                                        <MenuItem key={index} value={name}
                                                  sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Stack>
                    <CustomTypography>
                        ,
                    </CustomTypography>
                </Box>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"attributes": [
                    {
                        <Button onClick={handleAddEventAttribute}>
                            <AddBoxIcon sx={{fontSize: 30}}/>
                        </Button>
                    }
                    {eventAttributes.length === 0 && "],"}
                </CustomTypography>
                {
                    eventAttributes.length > 0 &&
                    (
                        <>
                            {eventAttributes.map((attribute, index) => (
                                <EventAttribute key={`${index}_attribute`} keys={eventsKey} values={eventsValue}
                                                attribute={attribute} index={index}
                                                setEventAttributes={setEventAttributes} isEventType
                                                eventAttributes={eventAttributes}/>
                            ))}
                            <CustomTypography>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
                            </CustomTypography>
                        </>
                    )
                }
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}{index !== eventsTypesItem.length - 1 && ","}
                </CustomTypography>
            </Box>
            <Box marginTop={8} marginLeft={2}>
                <Button onClick={() => handleRemoveEvent(eventType)}>
                    <DeleteIcon sx={{fontSize: 30, color: "red"}}/>
                </Button>
            </Box>
        </Box>
    )
}

export default EventType;