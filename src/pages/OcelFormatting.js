import React, {useState, useEffect} from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Link, useLocation} from "react-router-dom";

import EventType from "../components/eventTypes/EventType";
import CustomTypography from "../components/CustomTypography";
import ObjectType from "../components/objectTypes/ObjectType";
import Event from "../components/events/Event";
import PageLayout from "../layouts/PageLayout";
import ObjectOCEL from "../components/objects/ObjectOCEL";
import {_downloadOCEL} from "../api/services";

const getAllKeys = (jsonLog, set) => {
    if (Array.isArray(jsonLog)) {
        jsonLog.forEach((log) => {
            if (log) {
                Object.keys(log).forEach((key) => {
                    if (Array.isArray(log[key]) || typeof log[key] === "object") {
                        set.add(key)
                        getAllKeys(log[key], set)
                    } else if (typeof log !== "string") {
                        set.add(key)
                    }
                })
            }
        })
    } else if (typeof jsonLog === "object") {
        Object.keys(jsonLog).forEach((key) => {
            set.add(key)
            if (Array.isArray(jsonLog[key]) || typeof jsonLog[key] === "object") {
                getAllKeys(jsonLog[key], set)
            }
        })
    }
}

const getAllValues = (jsonLog, set) => {
    if (Array.isArray(jsonLog)) {
        jsonLog.forEach((log) => {
            if (log) {
                if (typeof log === "string") set.add(log)
                else {
                    Object.values(log).forEach((value) => {
                        if (Array.isArray(value) || typeof value === "object") {
                            getAllValues(value, set)
                        } else {
                            set.add(value)
                        }
                    })
                }
            }
        })
    } else if (typeof jsonLog === "object") {
        Object.values(jsonLog).forEach((value) => {
            if (Array.isArray(value) || typeof value === "object") {
                getAllValues(value, set)
            } else {
                set.add(value)
            }
        })
    }
}

function OcelFormatting() {


    const [jsonKeys, setJsonKeys] = useState([])
    const [jsonValues, setJsonValues] = useState([])

    const [eventsTypesItem, setEventTypesItem] = useState([])
    const [objectsTypesItem, setObjectsTypesItem] = useState([])
    const [eventsItem, setEventsItem] = useState([])
    const [objectsItem, setObjectsItem] = useState([])


    const {state} = useLocation()

    useEffect(() => {
        if (state) {
            const keySet = new Set()
            getAllKeys(state.results, keySet)
            setJsonKeys([...keySet])

            const valueSet = new Set()
            getAllValues(state.results, valueSet)
            setJsonValues([...valueSet])
        }
    }, []);

    const handleAddEventType = () => {
        setEventTypesItem([...eventsTypesItem, {name: "", attributes: []}])
    }

    const handleAddObjectType = () => {
        setObjectsTypesItem([...objectsTypesItem, {name: "", attributes: []}])
    }

    const handleAddEvent = () => {
        setEventsItem([...eventsItem, {id: "", type: "", time: "", attributes: [], relationships: []}])
    }

    const handleAddObject = () => {
        setObjectsItem([...objectsItem, {id: "", type: "", attributes: []}])
    }

    const downloadOcel = async () => {
        const ocel = {
            eventTypes: eventsTypesItem,
            objectTypes: objectsTypesItem,
            events: eventsItem,
            objects: objectsItem
        }
        const response = await _downloadOCEL(ocel)
        const href = window.URL.createObjectURL(response)
        const anchor = document.createElement('a')
        anchor.href = href
        anchor.download = "ocel.json"
        anchor.click()
        window.URL.revokeObjectURL(href)
    }

    return (
        <PageLayout results={state.results}>
            <Box display="flex" justifyContent="center" height="100%">
                <Box position="relative" height="100%" width={520} paddingBottom={2}>
                    <Typography variant="h3">
                        Data Formatting
                    </Typography>
                    <Stack marginY={3}>
                        <CustomTypography>
                            {"{"}
                        </CustomTypography>
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;"eventTypes": [
                            {
                                <Button onClick={handleAddEventType}>
                                    <AddBoxIcon sx={{fontSize: 30}}/>
                                </Button>
                            }
                            {eventsTypesItem.length === 0 && "],"}
                        </CustomTypography>
                        {eventsTypesItem.length > 0 &&
                            (
                                <>
                                    {eventsTypesItem.map((eventType, index) => (
                                        <EventType key={`${index}_event`} eventsKey={jsonKeys} eventsValue={jsonValues}
                                                   setEventTypesItem={setEventTypesItem}
                                                   eventsTypesItem={eventsTypesItem} eventType={eventType}
                                                   index={index}/>
                                    ))}
                                    <CustomTypography>
                                        &nbsp;&nbsp;&nbsp;],
                                    </CustomTypography>
                                </>
                            )
                        }
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;"objectTypes": [
                            {
                                <Button onClick={handleAddObjectType}>
                                    <AddBoxIcon sx={{fontSize: 30}}/>
                                </Button>
                            }
                            {objectsTypesItem.length === 0 && "],"}
                        </CustomTypography>
                        {objectsTypesItem.length > 0 &&
                            (
                                <>
                                    {objectsTypesItem.map((objectType, index) => (
                                        <ObjectType key={`${index}_object`} objectsKeys={jsonKeys}
                                                    objectsValue={jsonValues}
                                                    setObjectsTypesItem={setObjectsTypesItem}
                                                    objectsTypesItem={objectsTypesItem} objectType={objectType}
                                                    index={index}/>
                                    ))}
                                    <CustomTypography>
                                        &nbsp;&nbsp;&nbsp;],
                                    </CustomTypography>
                                </>
                            )
                        }
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;"events": [
                            {
                                <Button onClick={handleAddEvent}>
                                    <AddBoxIcon sx={{fontSize: 30}}/>
                                </Button>
                            }
                            {eventsItem.length === 0 && "],"}
                        </CustomTypography>
                        {
                            eventsItem.length > 0 &&
                            (
                                <>
                                    {
                                        eventsItem.map((event, index) => (
                                            <Event key={`${index}_event`} eventKeys={jsonKeys}
                                                   eventValues={jsonValues} eventsType={eventsTypesItem}
                                                   setEventsItem={setEventsItem} events={eventsItem} event={event}
                                                   index={index} objects={objectsItem}
                                            />
                                        ))
                                    }
                                    <CustomTypography>
                                        &nbsp;&nbsp;&nbsp;],
                                    </CustomTypography>
                                </>
                            )
                        }
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;"objects": [
                            {
                                <Button onClick={handleAddObject}>
                                    <AddBoxIcon sx={{fontSize: 30}}/>
                                </Button>
                            }
                            {objectsItem.length === 0 && "],"}
                            {
                                objectsItem.length > 0 &&
                                (
                                    <>
                                        {
                                            objectsItem.map((object, index) => (
                                                <ObjectOCEL key={`${index}_object`} objectKeys={jsonKeys}
                                                            objectValues={jsonValues}
                                                            setObject={setObjectsItem} objectsType={objectsTypesItem}
                                                            objects={objectsItem} object={object} index={index}
                                                />
                                            ))
                                        }
                                        <CustomTypography>
                                            &nbsp;&nbsp;&nbsp;]
                                        </CustomTypography>
                                    </>
                                )
                            }
                        </CustomTypography>
                        <CustomTypography>
                            {"}"}
                        </CustomTypography>
                    </Stack>
                    <Box display="flex" justifyContent="space-evenly" alignItems="center" gap={1} position="absolute"
                         bottom={0} height="48px">
                        <Link to="/" state={{state}}>
                            <Button color="error" variant="contained" sx={{padding: 1, width: "175px"}}>
                                <Typography>BACK</Typography>
                            </Button>
                        </Link>
                        <Button variant="contained" onClick={downloadOcel} sx={{padding: 1, width: "175px"}}>
                            <Typography color="white">Download OCEL</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </PageLayout>
    )
}

export default OcelFormatting;