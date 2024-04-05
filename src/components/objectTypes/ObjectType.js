import React, {useState, useEffect} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";

import CustomTypography from "../CustomTypography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ObjectAttribute from "./ObjectAttribute";
import {findRelatedKeys, findUnixTime, findValue} from "../../utils";
import useDataContext from "../../dataContext/useDataContext";

function ObjectType({
                        objectsKeys,
                        objectsValue,
                        setObjectsTypesItem,
                        setObjectsItem,
                        objectsTypesItem,
                        objectType,
                        index
                    }) {

    const {results, ocel, setOcel} = useDataContext()

    const [objectAttributes, setObjectsAttributes] = useState([])
    const [objectId, setObjectId] = useState([])

    useEffect(() => {
        objectType.attributes = objectAttributes
    }, [objectAttributes]);

    const handleAddObjectAttribute = () => {
        setObjectsAttributes([...objectAttributes, {name: "", type: ""}])
    }

    const handleRemoveObject = (object) => {
        setOcel({
            ...ocel,
            objectTypes: ocel.objectTypes.filter(item => !objectType.names.includes(item.name)),
            objects: ocel.objects.filter(item => !objectType.names.includes(item.type))
        })
        setObjectsItem((oldObjects) => oldObjects.filter(item => !objectType.names.includes(item.type)))
        setObjectsTypesItem(objectsTypesItem.filter(item => item.name !== object.name))
    }

    const handleSelectObjectTypeName = (e) => {
        if (e.target.value === "variableName") {
            const variables = []
            const names = []
            let ids = []

            if (Array.isArray(results)) {
                results.forEach((log) => {
                    findValue(log, e.target.value, names)
                    log.storageState.forEach((variable) => {
                        variables.push({timestamp: log.timestamp, name: variable.variableName, value: variable.variableValue, type: typeof variable.variableValue === "number" ? "integer" : typeof variable.variableValue})
                    })
                })
            }
            else {
                findValue(results, e.target.value, variables)
            }
            findRelatedKeys(results, e.target.value, ids)

            setObjectId(ids.filter(item => item !== e.target.value))

            let newObjectTypes = [...ocel.objectTypes]

            const valuesSet = variables.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
            valuesSet.forEach(value => {
                newObjectTypes.push({name: value.name, attributes: [{name: "value", type: value.type}]})
            })

            setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
                ...item,
                name: e.target.value,
                names: names.map(value => value.value)
            } : item))

            const objects = []
            variables.forEach(value => {
                objects.push({id: "", key: e.target.value, type: value.name, attributes: [{name: "value", time: value.timestamp, value: value.value}]})
            })
            setObjectsItem((oldObjects) => [...oldObjects, ...objects])

            setOcel({
                ...ocel,
                objectTypes: newObjectTypes,
                objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)]
            })
        }
    }

    const handleObjectTypeId = (e) => {
        setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
            ...item,
            id: e.target.value
        } : item))

        const idValues = []
        if (Array.isArray(results)) {
            results.forEach(log => {
                findValue(log, e.target.value, idValues)
            })
        }

        const oldEvents = ocel.objects.filter(object => objectType.names.includes(object.type))
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
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OBJECT ID:
                    </CustomTypography>
                    <Stack spacing={1}>
                        <FormControl disabled={!objectType.name} fullWidth sx={{width: 200}}>
                            <InputLabel>Key</InputLabel>
                            <Select
                                value={objectType.id}
                                label="idEvent"
                                onChange={(e) => handleObjectTypeId(e)}
                            >
                                {
                                    objectId.map((name, index) => (
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
                        <FormControl fullWidth sx={{width: 200}}>
                            <InputLabel>Key</InputLabel>
                            <Select
                                value={objectType.name}
                                label="name"
                                onChange={(e) => handleSelectObjectTypeName(e)}
                            >
                                {
                                    objectsKeys.map((name, index) => (
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
                    {/*    <Button onClick={handleAddObjectAttribute}>*/}
                    {/*        <AddBoxIcon sx={{fontSize: 30}}/>*/}
                    {/*    </Button>*/}
                    {/*}*/}
                    {/*{objectAttributes.length === 0 && "],"}*/}
                </CustomTypography>
                {
                    objectAttributes.length > 0 &&
                    (
                        <>
                            {objectAttributes.map((attribute, index) => (
                                <ObjectAttribute key={`${index}_attribute`} keys={objectsKeys} values={objectsValue}
                                                 attribute={attribute} index={index} isObjectType
                                                 setObjectsAttributes={setObjectsAttributes}
                                                 objectAttributes={objectAttributes}/>
                            ))}
                            <CustomTypography>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
                            </CustomTypography>
                        </>
                    )
                }
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}{index !== objectsTypesItem.length - 1 && ","}
                </CustomTypography>
            </Box>
            <Box marginTop={8} marginLeft={2}>
                <Button onClick={() => handleRemoveObject(objectType)}>
                    <DeleteIcon sx={{fontSize: 30, color: "red"}}/>
                </Button>
            </Box>
        </Box>
    )
}

export default ObjectType;