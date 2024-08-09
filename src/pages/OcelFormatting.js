import React, {useState, useEffect} from 'react';
import {Box, Button, Stack, Tab, Tabs, Typography} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

import EventType from "../components/eventTypes/EventType";
import CustomTypography from "../components/CustomTypography";
import ObjectType from "../components/objectTypes/ObjectType";
import PageLayout from "../layouts/PageLayout";
import useDataContext from "../dataContext/useDataContext";
import ActivityEventType from "../components/eventTypes/ActivityEventType";

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

function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{paddingX: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function OcelFormatting() {

    const {results} = useDataContext()

    const [tab, setTab] = useState(0)

    const [jsonKeys, setJsonKeys] = useState([])
    const [jsonValues, setJsonValues] = useState([])

    const [eventsTypesItem, setEventTypesItem] = useState([])
    const [objectsTypesItem, setObjectsTypesItem] = useState([])
    const [eventsItem, setEventsItem] = useState([])
    const [objectsItem, setObjectsItem] = useState([])


    useEffect(() => {
        if (results) {
            const keySet = new Set()
            getAllKeys(results, keySet)
            setJsonKeys([...keySet])

            const valueSet = new Set()
            getAllValues(results, valueSet)
            setJsonValues([...valueSet])
        } else {
            setJsonKeys([])
            setJsonValues([])
        }
    }, [results]);

    const handleAddEventType = () => {
        setEventTypesItem([...eventsTypesItem, {name: "", attributes: [], names: [], id: ""}])
    }

    const handleAddObjectType = () => {
        setObjectsTypesItem([...objectsTypesItem, {name: "", names: []}])
    }

    // const handleAddEvent = () => {
    //     setEventsItem([...eventsItem, {id: "", key: "", type: "", time: "", attributes: [], relationships: []}])
    // }

    // const handleAddObject = () => {
    //     setObjectsItem([...objectsItem, {id: "", type: "", attributes: []}])
    // }

    const handleTabs = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <PageLayout>
            <Box display="flex" justifyContent="center">
                <Box position="relative" height="100%" width={520} paddingBottom={2}>
                    <Typography variant="h3">
                        Data Formatting
                    </Typography>
                    <Box>
                        <Tabs value={tab} onChange={handleTabs} aria-label="basic tabs example">
                            <Tab label="Automatic Mapping"/>
                            <Tab label="Manual Mapping"/>
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tab} index={0}>
                        <Stack marginY={3} height="calc(100vh - 300px)" overflow="auto">
                            <CustomTypography>
                                {"{"}
                            </CustomTypography>
                            <CustomTypography>
                                &nbsp;&nbsp;&nbsp;"eventTypes": [
                            </CustomTypography>
                            {
                                tab === 0 && (
                                    <>
                                        <ActivityEventType setEventsItem={setEventsItem} />
                                        <CustomTypography>
                                            &nbsp;&nbsp;&nbsp;],
                                        </CustomTypography>
                                    </>
                                )
                            }
                            {eventsTypesItem.length > 0 &&
                                (
                                    <>
                                        {eventsTypesItem.map((eventType, index) => (
                                            <EventType key={`${index}_event`} eventsKey={jsonKeys}
                                                       eventsValue={jsonValues}
                                                       setEventTypesItem={setEventTypesItem}
                                                       setEventsItem={setEventsItem}
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
                                                        setObjectsItem={setObjectsItem}
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
                                &nbsp;&nbsp;&nbsp;"events": []
                                {/*{*/}
                                {/*    <Button onClick={handleAddEvent}>*/}
                                {/*        <AddBoxIcon sx={{fontSize: 30}}/>*/}
                                {/*    </Button>*/}
                                {/*}*/}
                                {/*{eventsItem.length === 0 && "],"}*/}
                            </CustomTypography>
                            {/*{*/}
                            {/*    eventsItem.length > 0 &&*/}
                            {/*    (*/}
                            {/*        <>*/}
                            {/*            {*/}
                            {/*                eventsItem.map((event, index) => (*/}
                            {/*                    <Event key={`${index}_event`} eventKeys={jsonKeys}*/}
                            {/*                           eventValues={jsonValues} eventsType={eventsTypesItem}*/}
                            {/*                           setEventsItem={setEventsItem} events={eventsItem} event={event}*/}
                            {/*                           index={index} objects={objectsItem}*/}
                            {/*                    />*/}
                            {/*                ))*/}
                            {/*            }*/}
                            {/*            <CustomTypography>*/}
                            {/*                &nbsp;&nbsp;&nbsp;],*/}
                            {/*            </CustomTypography>*/}
                            {/*        </>*/}
                            {/*    )*/}
                            {/*}*/}
                            <CustomTypography>
                                &nbsp;&nbsp;&nbsp;"objects": []
                                {/*{*/}
                                {/*    <Button onClick={handleAddObject}>*/}
                                {/*        <AddBoxIcon sx={{fontSize: 30}}/>*/}
                                {/*    </Button>*/}
                                {/*}*/}
                                {/*{objectsItem.length === 0 && "],"}*/}
                                {/*{*/}
                                {/*    objectsItem.length > 0 &&*/}
                                {/*    (*/}
                                {/*        <>*/}
                                {/*            {*/}
                                {/*                objectsItem.map((object, index) => (*/}
                                {/*                    <ObjectOCEL key={`${index}_object`} objectKeys={jsonKeys}*/}
                                {/*                                objectValues={jsonValues}*/}
                                {/*                                setObject={setObjectsItem} objectsType={objectsTypesItem}*/}
                                {/*                                objects={objectsItem} object={object} index={index}*/}
                                {/*                    />*/}
                                {/*                ))*/}
                                {/*            }*/}
                                {/*            <CustomTypography>*/}
                                {/*                &nbsp;&nbsp;&nbsp;]*/}
                                {/*            </CustomTypography>*/}
                                {/*        </>*/}
                                {/*    )*/}
                                {/*}*/}
                            </CustomTypography>
                            <CustomTypography>
                                {"}"}
                            </CustomTypography>
                        </Stack>
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={1}>
                        Developing...
                    </CustomTabPanel>
                </Box>
            </Box>
        </PageLayout>
    )
}

export default OcelFormatting;