import React, {useEffect} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import CustomTypography from "../CustomTypography";
import ActivityEventAttribute from "./ActivityEventAttribute";
// import {findValue} from "../../utils";
import useDataContext from "../../dataContext/useDataContext";

function ActivityEventType({setEventsItem}) {

    const {results, ocel, setOcel} = useDataContext()


    useEffect(() => {
        const values = []
        const temporaryEvents = []

        if (!results) {
            setOcel({eventTypes: [], objectTypes: [], events: [], objects: []})
        } else {
            results?.forEach((log) => {
                // findValue(log, "activity", values)
                temporaryEvents.push({
                    // relationships: log.storageState.map(variable => ({
                    //     objectId: variable.variableId,
                    //     qualifier: variable.variableName
                    // })),
                    id: log.txHash,
                    relationships: [],
                    timestamp: log.timestamp,
                    name: log.activity || "",
                    gasUsed: log.gasUsed,
                    sender: log.sender,
                    attributes: [{name: "gasUsed", type: "string"}, {name: "sender", type: "string"}]
                })
            })

            let newEventTypes = [...ocel.eventTypes]

            const valuesSet = temporaryEvents.filter((value, index, self) => self.map(item => item.name).indexOf(value.name) === index)
            valuesSet.forEach(value => {
                newEventTypes.push({name: value.name, attributes: value.attributes})
            })

            const events = []
            temporaryEvents.forEach((value) => {
                events.push({
                    id: value.id,
                    key: "activity",
                    type: value.name,
                    time: value.timestamp,
                    attributes: [{name: "gasUsed", value: value.gasUsed}, {name: "sender", value: value.sender}],
                    relationships: value.relationships
                })
            })
            setEventsItem((oldEvents) => [...oldEvents, ...events])

            setOcel({
                ...ocel,
                eventTypes: newEventTypes,
                events: [...ocel.events, ...events.map(({key, ...rest}) => rest)]
            })
        }

    }, [results])

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
                        <FormControl disabled fullWidth sx={{width: 200}}>
                            <InputLabel>Key</InputLabel>
                            <Select
                                value="activity"
                                label="name"
                            >
                                <MenuItem value="activity">activity</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <CustomTypography>
                        ,
                    </CustomTypography>
                </Box>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"attributes": [
                </CustomTypography>
                <ActivityEventAttribute/>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
                </CustomTypography>
                <CustomTypography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}
                </CustomTypography>
            </Box>
        </Box>
    )
}

export default ActivityEventType;