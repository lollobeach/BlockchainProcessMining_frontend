import React, {useState, useEffect} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";

import CustomTypography from "../CustomTypography";
import DeleteIcon from "@mui/icons-material/Delete";
import ObjectAttribute from "./ObjectAttribute";
import useDataContext from "../../dataContext/useDataContext";
import {
    handleEventNameObjects,
    handleInputNameObjects,
    handleCallTypeObjects,
    handleVariableNameObjects,
    handleSenderObjects,
    handleContractAddressObjects, handleTxHashObjects
} from "./selectObjectTypes";
import {removeRelationships} from "./obj2obj_relationships/removeRelationships";

function ObjectType({
                        objectsKeys,
                        objectsValue,
                        setObjectsTypesItem,
                        objectsTypesItem,
                        objectType,
                        index
                    }) {

    const {results, ocel, setOcel} = useDataContext()


    const [objectAttributes, setObjectsAttributes] = useState([])

    useEffect(() => {
        objectType.attributes = objectAttributes
    }, [objectAttributes]);

    const handleRemoveObject = (object) => {

        const events = ocel.events
        events.forEach((event) => {
            event.relationships = event.relationships.filter((relationship) => (
                !object.names.map(name => name.id).includes(relationship.objectId)
            ))
        })

        const newOcel = {
            ...ocel,
            objectTypes: ocel.objectTypes.filter(item => !objectType.names.map(value => value.name).includes(item.name)),
            objects: ocel.objects.filter(item => !objectType.names.map(value => value.name).includes(item.type)),
            events: events
        }
        setOcel(newOcel)
        setObjectsTypesItem(objectsTypesItem.filter(item => item.name !== object.name))

        removeRelationships(object, newOcel, setOcel)
    }

    const handlers = {
        "contractAddress": handleContractAddressObjects,
        "txHash": handleTxHashObjects,
        "sender": handleSenderObjects,
        "input": handleInputNameObjects,
        "stateVariable": handleVariableNameObjects,
        "event": handleEventNameObjects,
        "internalTx": handleCallTypeObjects,
    }

    const handleSelectObjectTypeName = (e) => {
        const handler = handlers[e.target.value]
        if (handler) {
            handler(results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setOcel)
        } else {
            console.error("Handler not found")
        }
    }

    const objectTypesOptions = ["contractAddress", "txHash", "sender", "input", "stateVariable", "event", "internalTx"]

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
                                name={`${index}`}
                                value = {objectType.name}
                                label="name"
                                onChange={(e) => handleSelectObjectTypeName(e)}
                                variant='outlined'
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