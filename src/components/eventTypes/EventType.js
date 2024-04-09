import React, {useState, useEffect} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomTypography from "../CustomTypography";
import EventAttribute from "./EventAttribute";
import useDataContext from "../../dataContext/useDataContext";
import {findRelatedKeys, findUnixTime, findValue} from "../../utils";


function EventType({eventsKey, eventsValue, setEventTypesItem, setEventsItem, eventsTypesItem, eventType, index}) {

    const {results, ocel, setOcel} = useDataContext()

    const [eventAttributes, setEventAttributes] = useState([])
    const [eventId, setEventId] = useState([])

    useEffect(() => {
        eventType.attributes = eventAttributes
    }, [eventAttributes]);

    const handleAddEventAttribute = () => {
        setEventAttributes([...eventAttributes, {key: "", value: "", type: ""}])
    }

    const handleRemoveEventTypeName = (eventType) => {
        setOcel({
            ...ocel,
            eventTypes: ocel.eventTypes.filter(item => !eventType.names.includes(item.name)),
            events: ocel.events.filter(item => !eventType.names.includes(item.type))
        })
        setEventsItem((oldItems) => oldItems.filter(item => !eventType.names.includes(item.type)))
        setEventTypesItem(eventsTypesItem.filter(item => item.name !== eventType.name))
    }

    const handleSelectEventTypeName = (e) => {
        console.log("Oook")
    }

    const handleEventTypeId = (e) => {
        setEventTypesItem(eventsTypesItem.map(item => item === eventType ? {
            ...item,
            id: e.target.value
        } : item))

        const idValues = []
        if (Array.isArray(results)) {
            results.forEach(log => {
                findValue(log, e.target.value, idValues)
            })
        }

        const oldEvents = ocel.events.filter(event => eventType.names.includes(event.type))
        oldEvents.forEach((event, index) => {
            event.id = idValues[index].value
        })

    }

    return (
        <Box display="flex">
            <Box>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}
                </CustomTypography>
                <Box display="flex" gap={1} alignItems="center">
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EVENT ID:
                    </CustomTypography>
                    <Stack spacing={1}>
                        <FormControl disabled={!eventType.name} fullWidth sx={{width: 200}}>
                            <InputLabel>Key</InputLabel>
                            <Select
                                value={eventType.id}
                                label="idEvent"
                                onChange={(e) => handleEventTypeId(e)}
                            >
                                {
                                    eventId.map((name, index) => (
                                        <MenuItem key={index} value={name}>{name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Stack>
                    <CustomTypography>
                        ,
                    </CustomTypography>
                </Box>
                <Box display="flex" gap={1} alignItems="center" marginTop={1}>
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":
                    </CustomTypography>
                    <Stack spacing={1}>
                        <FormControl disabled={Boolean(eventType.name)} fullWidth sx={{width: 200}}>
                            <InputLabel>Key</InputLabel>
                            <Select
                                value={eventType.name}
                                label="name"
                                onChange={(e) => handleSelectEventTypeName(e)}
                            >
                                {
                                    eventsKey.map((name, index) => (
                                        <MenuItem key={index} value={name}>{name}</MenuItem>
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
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"attributes": []
                    {/*{*/}
                    {/*    <Button onClick={handleAddEventAttribute}>*/}
                    {/*        <AddBoxIcon sx={{fontSize: 30}}/>*/}
                    {/*    </Button>*/}
                    {/*}*/}
                    {/*{eventAttributes.length === 0 && "],"}*/}
                </CustomTypography>
                {
                    eventAttributes.length > 0 &&
                    (
                        <>
                            {eventAttributes.map((attribute, index) => (
                                <EventAttribute key={`${index}_attribute`} keys={eventsKey} values={eventsValue}
                                                attribute={attribute} index={index} eventType={eventType}
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
                <Button onClick={() => handleRemoveEventTypeName(eventType)}>
                    <DeleteIcon sx={{fontSize: 30, color: "red"}}/>
                </Button>
            </Box>
        </Box>
    )
}

export default EventType;