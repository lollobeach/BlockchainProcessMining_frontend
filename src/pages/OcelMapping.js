import React, {useState} from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

import CustomTypography from "../components/CustomTypography";
import ObjectType from "../components/objectTypes/ObjectType";
import PageLayout from "../layouts/PageLayout";
import ActivityEventType from "../components/eventTypes/ActivityEventType";
import useDataContext from "../dataContext/useDataContext";
import {_occelMapping} from "../api/services";
function OcelMapping() {
    
    const {results}=useDataContext();

    const [objectsTypesItem, setObjectsTypesItem] = useState([])

    // TODO: the following state should be the array with the object types to send via API for the backend
    const [objectTypesToMap, setObjectTypesToMap] = useState([])

    const {setOcel} = useDataContext()

    const handleAddObjectType = () => {
        setObjectsTypesItem([...objectsTypesItem, {name: "", names: []}])
    }

    const sendObjectTypesToMap = () => {
        _occelMapping(objectTypesToMap,results).then((response) => {
            setOcel(response.data)
            // console.log(response)
        })
    }
    return (
        <PageLayout>
            <Box display="flex" justifyContent="center">
                <Box position="relative" height="100%" width={520} paddingBottom={2}>
                    <Typography variant="h3">
                        Data Mapping
                    </Typography>
                    <Stack marginY={3} height="calc(100vh - 300px)" overflow="auto">
                        <CustomTypography>
                            {"{"}
                        </CustomTypography>
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;"eventTypes": [
                        </CustomTypography>
                        <ActivityEventType/>
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;],
                        </CustomTypography>
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;"objectTypes": [
                            {
                                <Button onClick={handleAddObjectType}>
                                    <AddBoxIcon sx={{fontSize: 30}}/>
                                </Button>
                            }
                            {objectsTypesItem.length === 0 && "],"}
                        </CustomTypography>
                        {objectsTypesItem.length > 0 &&
                            (
                                <>
                                    {objectsTypesItem.map((objectType, index) => (
                                        <ObjectType key={`${index}_object`}
                                                    objectTypesToMap={objectTypesToMap}
                                                    setObjectTypesToMap={setObjectTypesToMap}
                                                    setObjectsTypesItem={setObjectsTypesItem}
                                                    objectsTypesItem={objectsTypesItem} objectType={objectType}
                                                    index={index}/>
                                    ))}
                                    <CustomTypography>
                                        &nbsp;&nbsp;&nbsp;],
                                    </CustomTypography>
                                </>
                            )
                        }
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;"events": []
                        </CustomTypography>
                        <CustomTypography>
                            &nbsp;&nbsp;&nbsp;"objects": []
                        </CustomTypography>
                        <CustomTypography>
                            {"}"}
                        </CustomTypography>
                    </Stack>
                </Box>
            </Box>
            <Button onClick={sendObjectTypesToMap}>
                <AddBoxIcon sx={{fontSize: 30}}/>
            </Button>
        </PageLayout>
    )
}

export default OcelMapping;