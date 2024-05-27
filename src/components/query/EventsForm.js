import React from 'react';
import { Box, Typography, IconButton } from "@mui/material";
import NestedField from './NestedField';
import AddButton from './AddQueryButton';
import { Delete } from '@mui/icons-material';

const EventsForm = ({ events, setEvents }) => {
    const handleAddEvent = () => {
        setEvents([...events, { eventId: '', eventName: '', eventValues: {} }]);
    };

    const handleEventChange = (index, event) => {
        const { name, value } = event.target;
        const newEvents = [...events];
        newEvents[index][name] = value;
        setEvents(newEvents);
    };

    const handleDeleteEvent = (index) => {
        const newEvents = [...events];
        newEvents.splice(index, 1);
        setEvents(newEvents);
    };

    return (
        <Box>
            <Typography variant="h6">Events</Typography>
            {events.map((event, index) => (
                <Box key={index} mb={2} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <NestedField label="Event ID" name="eventId" value={event.eventId} onChange={(e) => handleEventChange(index, e)} />
                        <NestedField label="Event Name" name="eventName" value={event.eventName} onChange={(e) => handleEventChange(index, e)} />
                    </Box>
                    <IconButton onClick={() => handleDeleteEvent(index)} color="error">
                        <Delete />
                    </IconButton>
                </Box>
            ))}
            <AddButton onClick={handleAddEvent} label="Add Event" />
        </Box>
    );
};

export default EventsForm;
