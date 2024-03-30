import React, {useState, useEffect} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import CustomTypography from "../CustomTypography";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAttribute from "../eventTypes/EventAttribute";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EventRelationship from "./EventRelationship";

function Event({eventKeys, eventValues, eventsType, setEventsItem, events, event, index, objects}) {

    const [eventAttributes, setEventAttributes] = useState([])
    const [eventRelationships, setEventRelationships] = useState([])

    useEffect(() => {
        event.attributes = eventAttributes
        event.relationships = eventRelationships
    }, [eventAttributes, eventRelationships]);

    const handleAddEventAttribute = () => {
        setEventAttributes([...eventAttributes, {name: "", value: ""}])
    }

    const handleAddEventRelationships = () => {
        setEventRelationships([...eventRelationships, {objectId: "", qualifier: ""}])
    }

    const handleRemoveEvent = (event) => {
        setEventsItem(events.filter(item => item.id !== event.id))
    }

    const handleSelectEventId = (e) => {
        setEventsItem(events.map(item => item === event ? {
            ...item,
            id: e.target.value
        } : item))
    }

    const handleSelectEventType = (e) => {
        setEventsItem(events.map(item => item === event ? {
            ...item,
            type: e.target.value
        } : item))
    }

    const handleSelectEventTime = (e) => {
        setEventsItem(events.map(item => item === event ? {
            ...item,
            time: e.target.value
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
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":
                    </CustomTypography>
                    <Stack spacing={1}>
                        <FormControl fullWidth sx={{width: 200}}>
                            <InputLabel>Key</InputLabel>
                            <Select
                                value={event.id}
                                label="name"
                                onChange={(e) => handleSelectEventId(e)}
                            >
                                {
                                    eventKeys.map((name, index) => (
                                        <MenuItem key={index} value={name}>{name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{width: 200}}>
                            <InputLabel>Value</InputLabel>
                            <Select
                                value={event.id}
                                label="name"
                                onChange={(e) => handleSelectEventId(e)}
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
                <Box display="flex" gap={1} alignItems="center" marginTop={1}>
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"type":
                    </CustomTypography>
                    <FormControl fullWidth sx={{width: 200}}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={event.type}
                            label="name"
                            onChange={(e) => handleSelectEventType(e)}
                        >
                            {
                                eventsType.map(item => item.name).map((name, index) => (
                                    <MenuItem key={index} value={name}>{name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box display="flex" gap={1} alignItems="center" marginTop={1}>
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"time":
                    </CustomTypography>
                    <FormControl fullWidth sx={{width: 200}}>
                        <InputLabel>Time</InputLabel>
                        <Select
                            value={event.time}
                            label="name"
                            onChange={(e) => handleSelectEventTime(e)}
                        >
                            {
                                eventValues.filter(value => !isNaN(new Date(value).getTime()) && value.toString().includes("Z")).map((name, index) => (
                                    <MenuItem key={index} value={name}>{name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
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
                                <EventAttribute key={`${index}_attribute`} keys={eventKeys} values={eventValues}
                                                attribute={attribute} index={index}
                                                setEventAttributes={setEventAttributes}
                                                eventAttributes={eventAttributes}/>
                            ))}
                            <CustomTypography>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
                            </CustomTypography>
                        </>
                    )
                }
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"relationships": [
                    {
                        <Button onClick={handleAddEventRelationships}>
                            <AddBoxIcon sx={{fontSize: 30}}/>
                        </Button>
                    }
                    {eventRelationships.length === 0 && "],"}
                </CustomTypography>
                {
                    eventRelationships.length > 0 &&
                    (
                        <>
                            {
                                eventRelationships.map((relationship, index) => (
                                    <EventRelationship key={`${index}_relationship`} eventKeys={eventKeys}
                                                       eventValues={eventValues} objects={objects}
                                                       relationship={relationship}
                                                       eventRelationships={eventRelationships}
                                                       setEventRelationships={setEventRelationships}
                                                       index={index}/>
                                ))
                            }
                            <CustomTypography>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
                            </CustomTypography>
                        </>
                    )
                }
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}{index !== events.length - 1 && ","}
                </CustomTypography>
            </Box>
            <Box marginTop={8} marginLeft={2}>
                <Button onClick={() => handleRemoveEvent(event)}>
                    <DeleteIcon sx={{fontSize: 30, color: "red"}}/>
                </Button>
            </Box>
        </Box>
    );
}

export default Event;