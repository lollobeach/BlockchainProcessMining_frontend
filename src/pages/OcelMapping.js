import React, {useState, useEffect} from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

import CustomTypography from "../components/CustomTypography";
import ObjectType from "../components/objectTypes/ObjectType";
import PageLayout from "../layouts/PageLayout";
import useDataContext from "../dataContext/useDataContext";
import ActivityEventType from "../components/eventTypes/ActivityEventType";

const getAllKeys = (jsonLog, set) => {
    if (jsonLog && Array.isArray(jsonLog)) {
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
    } else if (jsonLog && typeof jsonLog === "object") {
        Object.keys(jsonLog).forEach((key) => {
            set.add(key)
            if (Array.isArray(jsonLog[key]) || typeof jsonLog[key] === "object") {
                getAllKeys(jsonLog[key], set)
            }
        })
    }
}

const getAllValues = (jsonLog, set) => {
    if (jsonLog && Array.isArray(jsonLog)) {
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
    } else if (jsonLog && typeof jsonLog === "object") {
        Object.values(jsonLog).forEach((value) => {
            if (Array.isArray(value) || typeof value === "object") {
                getAllValues(value, set)
            } else {
                set.add(value)
            }
        })
    }
}

function OcelMapping() {

    const {results} = useDataContext()

    const [jsonKeys, setJsonKeys] = useState([])
    const [jsonValues, setJsonValues] = useState([])

    const [objectsTypesItem, setObjectsTypesItem] = useState([])


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

    const handleAddObjectType = () => {
        setObjectsTypesItem([...objectsTypesItem, {name: "", names: []}])
    }

    return (
        <PageLayout>
            <Box display="flex" justifyContent="center">
                <Box position="relative" height="100%" width={520} paddingBottom={2}>
                    <Typography variant="h3">
                        Data Mapping
                    </Typography>
                    <Stack marginY={3} height="calc(100vh - 300px)" overflow="auto">
                        <CustomTypography>
                            {"{"}
                        </CustomTypography>
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;"eventTypes": [
                        </CustomTypography>
                        <ActivityEventType/>
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;],
                        </CustomTypography>
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
                            &nbsp;&nbsp;&nbsp;"events": []
                        </CustomTypography>
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;"objects": []
                        </CustomTypography>
                        <CustomTypography>
                            {"}"}
                        </CustomTypography>
                    </Stack>
                </Box>
            </Box>
        </PageLayout>
    )
}

export default OcelMapping;