import React, {useState, useEffect} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";

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

    useEffect(() => {
        objectType.attributes = objectAttributes
    }, [objectAttributes]);

    const handleAddObjectAttribute = () => {
        setObjectsAttributes([...objectAttributes, {name: "", type: ""}])
    }

    const handleRemoveObject = (object) => {

        const events = ocel.events
        events.forEach((event) => {
            event.relationships = event.relationships.filter((relationship) => (
                !object.names.map(name => name.id).includes(relationship.objectId)
            ))
        })

        setOcel({
            ...ocel,
            objectTypes: ocel.objectTypes.filter(item => !objectType.names.includes(item.name)),
            objects: ocel.objects.filter(item => !objectType.names.includes(item.type)),
            events: events
        })
        setObjectsItem((oldObjects) => oldObjects.filter(item => !objectType.names.includes(item.type)))
        setObjectsTypesItem(objectsTypesItem.filter(item => item.name !== object.name))
    }

    const handleInputNameObjects = () => {
        const variables = []

        results.forEach((log) => {
            log.inputs.forEach((input) => {
                variables.push({
                    time: log.timestamp,
                    id: input.inputId,
                    name: input.inputName,
                    value: input.inputValue,
                    type: typeof input.inputValue === "number" ? "integer" : typeof input.inputValue
                })
            })
        })

        let newObjectTypes = [...ocel.objectTypes]
        const valuesSet = variables.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
        valuesSet.forEach(value => {
                newObjectTypes.push({
                    name: value.name,
                    attributes: [{name: "value", type: value.type}]
                })
            }
        )

        setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
            ...item,
            name: "inputName",
            names: variables.map(value => ({name: value.name, id: value.id}))
        } : item))

        const objects = []
        variables.forEach(value => {
            let attributeValues = []
            attributeValues = [{name: "value", time: value.time, value: value.value}]

            objects.push({
                id: value.id,
                key: "inputName",
                type: value.name,
                attributes: attributeValues
            })
        })

        setObjectsItem((oldObjects) => [...oldObjects, ...objects])
        setOcel({
            ...ocel,
            objectTypes: newObjectTypes,
            objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)],
            events: [...ocel.events]
        })

        const events = [...ocel.events]
        events.forEach((event) => {
            objects.forEach((object) => {
                if (object.attributes[0].time === event.time) {
                    event.relationships.push({objectId: object.id, qualifier: "paramater"})
                }
            })
        })
    }

    const handleStorageStateObjects = () => {
        const variables = []

        results.forEach((log) => {
            log.storageState.forEach((variable) => {
                variables.push({
                    time: log.timestamp,
                    id: variable.variableId,
                    name: variable.variableName,
                    value: variable.variableValue,
                    type: typeof variable.variableValue === "number" ? "integer" : typeof variable.variableValue
                })
            })
        })

        let newObjectTypes = [...ocel.objectTypes]
        const valuesSet = variables.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
        valuesSet.forEach(value => {
                newObjectTypes.push({
                    name: value.name,
                    attributes: [{name: "value", type: value.type}]
                })
            }
        )

        setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
            ...item,
            name: "variableName",
            names: variables.map(value => ({name: value.name, id: value.id}))
        } : item))

        const objects = []
        variables.forEach(value => {
            let attributeValues = []
            attributeValues = [{name: "value", time: value.time, value: value.value}]

            objects.push({
                id: value.id,
                key: "variableName",
                type: value.name,
                attributes: attributeValues
            })
        })

        setObjectsItem((oldObjects) => [...oldObjects, ...objects])
        setOcel({
            ...ocel,
            objectTypes: newObjectTypes,
            objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)]
        })

        const events = [...ocel.events]
        events.forEach((event) => {
            objects.forEach((object) => {
                if (object.attributes[0].time === event.time) {
                    event.relationships.push({objectId: object.id, qualifier: "update"})
                }
            })
        })
    }

    const handleInternalTxsObjects = () => {
        const variables = []

        results.forEach((log) => {
            log.internalTxs.forEach((internalTx) => {
                variables.push({
                    time: log.timestamp,
                    id: internalTx.callId,
                    name: internalTx.callType,
                    value: internalTx.to,
                    type: "string"
                })
            })
        })

        let newObjectTypes = [...ocel.objectTypes]
        const valuesSet = variables.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
        valuesSet.forEach(value => {
            newObjectTypes.push({
                name: value.name,
                attributes: [{name: "to", type: "string"}]
            })
        })

        setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
            ...item,
            name: "callType",
            names: variables.map(value => ({name: value.name, id: value.id}))
        } : item))

        const objects = []
        variables.forEach(value => {
            let attributeValues = []
            attributeValues = [{name: "to", time: value.time, value: value.value}]

            objects.push({
                id: value.id,
                key: "callType",
                type: value.name,
                attributes: attributeValues
            })
        })

        setObjectsItem((oldObjects) => [...oldObjects, ...objects])
        setOcel({
            ...ocel,
            objectTypes: newObjectTypes,
            objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)]
        })

        const events = [...ocel.events]
        events.forEach((event) => {
            objects.forEach((object) => {
                if (object.attributes[0].time === event.time) {
                    event.relationships.push({objectId: object.id, qualifier: "invoked"})
                }
            })
        })
    }

    const handleEventNameObjects = () => {
        const variables = []

        results.forEach((log) => {
            log.events.forEach((event) => {
                variables.push({
                    time: log.timestamp,
                    id: event.eventId,
                    name: event.eventName,
                    owner: event.eventValues.owner,
                    ownerType: "string",
                    spender: event.eventValues.spender,
                    spenderType: "string",
                    value: event.eventValues.value,
                    valueType: "integer"
                })
            })
        })

        let newObjectTypes = [...ocel.objectTypes]
        const valuesSet = variables.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
        valuesSet.forEach(value => {
                newObjectTypes.push({
                    name: value.name,
                    attributes: [
                        {name: "owner", type: value.ownerType},
                        {name: "spender", type: value.spenderType},
                        {name: "value", type: value.valueType}
                    ]
                })
            }
        )

        setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
            ...item,
            name: "eventName",
            names: variables.map(value => ({name: value.name, id: value.id}))
        } : item))

        const objects = []
        variables.forEach(value => {
            let attributeValues = []
            attributeValues = [{name: "owner", time: value.time, value: value.owner}, {
                name: "spender",
                time: value.time,
                value: value.spender
            }, {name: "value", time: value.time, value: value.value}]

            objects.push({
                id: value.id,
                key: "eventName",
                type: value.name,
                attributes: attributeValues
            })
        })

        setObjectsItem((oldObjects) => [...oldObjects, ...objects])
        setOcel({
            ...ocel,
            objectTypes: newObjectTypes,
            objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)]
        })

        const events = [...ocel.events]
        events.forEach((event) => {
            objects.forEach((object) => {
                if (object.attributes[0].time === event.time) {
                    event.relationships.push({objectId: object.id, qualifier: "emitted"})
                }
            })
        })
    }

    const handleSelectObjectTypeName = (e) => {
        switch (e.target.value) {
            case "inputName":
                handleInputNameObjects()
                break;
            case "variableName":
                handleStorageStateObjects()
                break;
            case "eventName":
                handleEventNameObjects()
                break;
            case "callType":
                handleInternalTxsObjects()
                break;
            default:
                console.log("Choose a valid object type")
        }
    }

    // const handleObjectTypeId = (e) => {
    //     setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
    //         ...item,
    //         id: e.target.value
    //     } : item))
    //
    //     const idValues = []
    //     if (Array.isArray(results)) {
    //         results.forEach(log => {
    //             findValue(log, e.target.value, idValues)
    //         })
    //     }
    //     const oldEvents = ocel.objects.filter(object => objectType.names.includes(object.type))
    //     oldEvents.forEach((event, index) => {
    //         event.id = idValues[index].value
    //     })
    //
    // }

    const objectTypesOptions = ["inputName", "variableName", "eventName", "callType"]

    return (
        <Box display="flex">
            <Box>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}
                </CustomTypography>
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
                                    objectTypesOptions.map((name, index) => (
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