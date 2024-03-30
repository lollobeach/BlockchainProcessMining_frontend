import React, {useState, useEffect} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";

import CustomTypography from "../CustomTypography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ObjectAttribute from "./ObjectAttribute";

function ObjectType({objectsKeys, objectsValue, setObjectsTypesItem, objectsTypesItem, objectType, index}) {

    const [objectAttributes, setObjectsAttributes] = useState([])

    useEffect(() => {
        objectType.attributes = objectAttributes
    }, [objectAttributes]);

    const handleAddObjectAttribute = () => {
        setObjectsAttributes([...objectAttributes, {name: "", type: ""}])
    }

    const handleRemoveObject = (object) => {
        setObjectsTypesItem(objectsTypesItem.filter(item => item.name !== object.name))
    }

    const handleSelectObjectName = (e) => {
        setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
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
                            value={objectType.name}
                            label="name"
                            onChange={(e) => handleSelectObjectName(e)}
                        >
                            {
                                objectsKeys.map((name, index) => (
                                    <MenuItem key={index} value={name}>{name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{width: 200}}>
                        <InputLabel>Value</InputLabel>
                        <Select
                            value={objectType.name}
                            label="name"
                            onChange={(e) => handleSelectObjectName(e)}
                        >
                            {
                                objectsValue.map((name, index) => (
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
                        <Button onClick={handleAddObjectAttribute}>
                            <AddBoxIcon sx={{fontSize: 30}}/>
                        </Button>
                    }
                    {objectAttributes.length === 0 && "],"}
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