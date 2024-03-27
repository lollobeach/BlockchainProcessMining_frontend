import React, {useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import CustomTypography from "../CustomTypography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ObjectAttribute from "./ObjectAttribute";

function ObjectType({objectsName, setObjectsTypesItem, objectsTypesItem, objectType, index}) {

    const [objectAttributes, setObjectsAttributes] = useState([])

    const handleAddObjectAttribute = () => {
        setObjectsAttributes([...objectAttributes, {name: "", type: ""}])
    }

    const handleRemoveObject = (event) => {
        setObjectsTypesItem(objectsTypesItem.filter(item => item.name !== event.name))
    }

    const handleSelectObjectName = (e) => {
        setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
            ...item,
            name: e.target.value
        } : item))
    }

    return (
        <Box display="flex" justifyContent="space-between">
            <Box>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}
                </CustomTypography>
                <Box display="flex" gap={1} alignItems="center">
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":
                    </CustomTypography>
                    <FormControl fullWidth sx={{minWidth: 150}}>
                        <InputLabel>Object Name</InputLabel>
                        <Select
                            value={objectType.name}
                            label="name"
                            onChange={(e) => handleSelectObjectName(e)}
                        >
                            {
                                objectsName.map((name, index) => (
                                    <MenuItem key={index} value={name}>{name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
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
                    {
                        objectAttributes.length > 0 &&
                        (
                            <>
                                {objectAttributes.map((attribute, index) => (
                                    <ObjectAttribute key={`${index}_attribute`} attribute={attribute} index={index}
                                                    setObjectsAttributes={setObjectsAttributes}
                                                    objectAttributes={objectAttributes}/>
                                ))}
                            </>
                        )
                    }
                </CustomTypography>
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