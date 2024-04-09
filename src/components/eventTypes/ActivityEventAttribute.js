import React from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import CustomTypography from "../CustomTypography";
import DeleteIcon from "@mui/icons-material/Delete";

function ActivityEventAttribute() {

    const attributes = ["gasUsed", "sender"]

    return (
        attributes.map((attribute, index) => (
            <Box key={index}>
                <Box display="flex" alignItems="center">
                    <Box>
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}
                        </CustomTypography>
                        <Box display="flex" gap={1} alignItems="center">
                            <CustomTypography>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":
                            </CustomTypography>
                            <Stack>
                                <FormControl disabled fullWidth sx={{width: 200}}>
                                    <InputLabel>Key</InputLabel>
                                    <Select
                                        value={attribute}
                                        label="name"
                                    >
                                        <MenuItem value={attribute}
                                                  sx={{width: 400, overflow: "auto"}}>{attribute}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Box>
                        <Box display="flex" gap={1} alignItems="center" marginTop={1}>
                            <CustomTypography>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"type":
                            </CustomTypography>
                            <Stack>
                                <FormControl disabled fullWidth sx={{width: 200}}>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        value="string"
                                        label="name"
                                    >
                                        <MenuItem value="string"
                                                  sx={{width: 400, overflow: "auto"}}>string</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}{index !== attributes.length - 1 && ","}
                </CustomTypography>
            </Box>
        ))
    )
}

export default ActivityEventAttribute;