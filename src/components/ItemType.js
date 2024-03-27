import React, {useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import CustomTypography from "./CustomTypography";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAttribute from "./eventTypes/EventAttribute";

function ItemType({itemsName, setItemTypes, itemsTypes, itemType, index, attribute}) {

    const [itemAttributes, setItemAttributes] = useState([])

    const handleAddEventAttribute = () => {
        setItemAttributes([...itemAttributes, {name: "", type: ""}])
    }

    const handleRemoveEvent = (event) => {
        setItemTypes(itemsTypes.filter(item => item.name !== event.name))
    }

    const handleSelectEventName = (e) => {
        setItemTypes(itemsTypes.map(item => item === itemType ? {
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
                        <InputLabel>Event Name</InputLabel>
                        <Select
                            value={itemType.name}
                            label="name"
                            onChange={(e) => handleSelectEventName(e)}
                        >
                            {
                                itemsName.map((name, index) => (
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
                        <Button onClick={handleAddEventAttribute}>
                            <AddBoxIcon sx={{fontSize: 30}}/>
                        </Button>
                    }
                    {itemAttributes.length === 0 && "],"}
                    {
                        itemAttributes.length > 0 &&
                        (
                            <>
                                {itemAttributes.map((attribute, index) => (
                                    <EventAttribute key={`${index}_attribute`} attribute={attribute} index={index}
                                                    setItemAttributes={setItemAttributes}
                                                    itemAttributes={itemAttributes}/>
                                ))}
                            </>
                        )
                    }
                </CustomTypography>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}{index !== itemsTypes.length - 1 && ","}
                </CustomTypography>
            </Box>
            <Box marginTop={8} marginLeft={2}>
                <Button onClick={() => handleRemoveEvent(itemType)}>
                    <DeleteIcon sx={{fontSize: 30, color: "red"}}/>
                </Button>
            </Box>
        </Box>
    )
}

export default ItemType;