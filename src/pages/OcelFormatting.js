import React, {useState} from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Link} from "react-router-dom";
import $ from 'jquery'

import JsonResults from "../mock/jsonLog.json"
import EventType from "../components/eventTypes/EventType";
import CustomTypography from "../components/CustomTypography";
import ObjectType from "../components/objectTypes/ObjectType";


function OcelFormatting() {

    const [eventsTypesItem, setEventTypesItem] = useState([])
    const [eventsName, setEventsName] = useState([])

    const [objectsTypesItem, setObjectsTypesItem] = useState([])
    const [objectsName, setObjectsName] = useState([])

    const handleAddEventType = () => {
        if (eventsTypesItem.length < eventsName.length) {
            setEventTypesItem([...eventsTypesItem, {name: "", attributes: []}])
        }
    }

    const handleAddObjectType = () => {
        if (objectsTypesItem.length < objectsName.length) {
            setObjectsTypesItem([...objectsTypesItem, {name: "", attributes: []}])
        }
    }

    return (
        <Box display="flex" justifyContent="center">
            <Box>
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
                                    <EventType key={`${index}_event`} eventsName={eventsName}
                                               setEventTypesItem={setEventTypesItem}
                                               eventsTypesItem={eventsTypesItem} eventType={eventType} index={index}/>
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
                                    <ObjectType key={`${index}_object`} objectsName={objectsName}
                                                setObjectsTypesItem={setObjectsTypesItem}
                                                objectsTypesItem={objectsTypesItem} objectType={objectType} index={index}/>
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
                            <Button>
                                <AddBoxIcon sx={{fontSize: 30}}/>
                            </Button>
                        }]
                    </CustomTypography>
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;"objects": [
                        {
                            <Button>
                                <AddBoxIcon sx={{fontSize: 30}}/>
                            </Button>
                        }]
                    </CustomTypography>
                    <CustomTypography>
                        {"}"}
                    </CustomTypography>
                </Stack>
                <Button variant="contained" sx={{padding: 1}}>
                    <Link to="/" style={{textDecoration: "none"}}>
                        <Typography color="white">Download JSON</Typography>
                    </Link>
                </Button>
            </Box>
        </Box>
    )
}

export default OcelFormatting;