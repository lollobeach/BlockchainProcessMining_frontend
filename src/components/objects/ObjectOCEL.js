import React, {useState, useEffect} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import CustomTypography from "../CustomTypography";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ObjectAttribute from "../objectTypes/ObjectAttribute";
import DeleteIcon from "@mui/icons-material/Delete";

function ObjectOCEL({objectKeys, objectValues, setObject, objectsType, objects, object, index}) {

    const [objectAttributes, setObjectAttributes] = useState([])

    useEffect(() => {
        object.attributes = objectAttributes
    }, [objectAttributes]);

    const handleAddObjectAttribute = () => {
        setObjectAttributes([...objectAttributes, {name: "", time: "", value: ""}])
    }

    const handleSelectObjectId = (e) => {
        setObject(objects.map(item => item === object ? {
            ...item,
            id: e.target.value
        } : item))
    }

    const handleSelectObjectType = (e) => {
        setObject(objects.map(item => item === object ? {
            ...item,
            type: e.target.value
        } : item))
    }

    const handleRemoveObject = (e) => {
        setObject(objects.filter(item => item.id !== e.id))
    }

    return (
        <Box display="flex">
            <Box>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}
                </CustomTypography>
                {/*<Box display="flex" gap={1} alignItems="center">*/}
                {/*    <CustomTypography>*/}
                {/*        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":*/}
                {/*    </CustomTypography>*/}
                {/*    <Stack spacing={1}>*/}
                {/*        <FormControl fullWidth sx={{width: 200}}>*/}
                {/*            <InputLabel>Key</InputLabel>*/}
                {/*            <Select*/}
                {/*                value={object.id}*/}
                {/*                label="name"*/}
                {/*                onChange={(e) => handleSelectObjectId(e)}*/}
                {/*            >*/}
                {/*                {*/}
                {/*                    objectKeys.map((name, index) => (*/}
                {/*                        <MenuItem key={index} value={name}>{name}</MenuItem>*/}
                {/*                    ))*/}
                {/*                }*/}
                {/*            </Select>*/}
                {/*        </FormControl>*/}
                {/*        <FormControl fullWidth sx={{width: 200}}>*/}
                {/*            <InputLabel>Value</InputLabel>*/}
                {/*            <Select*/}
                {/*                value={object.id}*/}
                {/*                label="name"*/}
                {/*                onChange={(e) => handleSelectObjectId(e)}*/}
                {/*            >*/}
                {/*                {*/}
                {/*                    objectValues.map((name, index) => (*/}
                {/*                        <MenuItem key={index} value={name}*/}
                {/*                                  sx={{width: 400, overflow: "auto"}}>{name}</MenuItem>*/}
                {/*                    ))*/}
                {/*                }*/}
                {/*            </Select>*/}
                {/*        </FormControl>*/}
                {/*    </Stack>*/}
                {/*</Box>*/}
                <Box display="flex" gap={1} alignItems="center" marginTop={1}>
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"type": <span
                        style={{color: "#0016ff"}}>{object.key}-{object.type}</span>
                    </CustomTypography>
                    {/*<FormControl fullWidth sx={{width: 200}}>*/}
                    {/*    <InputLabel>Type</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        value={object.type}*/}
                    {/*        label="name"*/}
                    {/*        onChange={(e) => handleSelectObjectType(e)}*/}
                    {/*    >*/}
                    {/*        {*/}
                    {/*            objectsType.map(item => item.name).map((name, index) => (*/}
                    {/*                <MenuItem key={index} value={name}>{name}</MenuItem>*/}
                    {/*            ))*/}
                    {/*        }*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}
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
                            {
                                objectAttributes.map((attribute, index) => (
                                    <ObjectAttribute key={`${index}_attribute`} keys={objectKeys}
                                                     values={objectValues} attribute={attribute}
                                                     index={index} setObjectsAttributes={setObjectAttributes}
                                                     objectAttributes={objectAttributes}
                                    />
                                ))
                            }
                            <CustomTypography>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
                            </CustomTypography>
                        </>
                    )
                }
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}{index !== objects.length - 1 && ","}
                </CustomTypography>
            </Box>
            {/*<Box marginTop={8} marginLeft={2}>*/}
            {/*    <Button onClick={() => handleRemoveObject(object)}>*/}
            {/*        <DeleteIcon sx={{fontSize: 30, color: "red"}}/>*/}
            {/*    </Button>*/}
            {/*</Box>*/}
        </Box>
    );
}

export default ObjectOCEL;