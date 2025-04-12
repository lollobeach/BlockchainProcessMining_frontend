import {
    Box,
    Button,
    CircularProgress,
    Typography,
    Card,
    CardContent,
    styled,
    Stack
} from "@mui/material";
import useDataContext from "../dataContext/useDataContext";
import { FileUpload } from "@mui/icons-material";
import { HiddenInput } from "../components/HiddenInput";
import React, { useEffect, useState, useRef } from "react";
import { Network } from "vis-network";
import JsonView from "@uiw/react-json-view";
import { _generateGraph } from "../api/services";
import CustomTypography from "../components/CustomTypography";
import AddBoxIcon from '@mui/icons-material/AddBox';
import KeyType from '../components/keyType/keyType';
import { name } from "dayjs/locale/it";
const CardContentNoPadding = styled(CardContent)(
    `
    padding-top: 0;
    &:last-child {
        padding-bottom: 0;
    }
    `
)

const NetworkGraph = () => {
    const { results, setResults } = useDataContext();
    const [loading, setLoading] = useState(false);
    const [nodesArray, setNodesArray] = useState([]);
    const [edgesArray, setEdgesArray] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [jsonKey, setJsonKey] = useState(null);
    const [objectsTypesItem, setObjectsTypesItem] = useState([]);
    const containerRef = useRef(null);

    const handleFileChange = (e) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const content = event.target.result;
            try {
                setResults(JSON.parse(content));
            } catch (err) {
                console.error("Invalid JSON file");
            }
        };
        if (e.target.files[0]) {
            fileReader.readAsText(e.target.files[0]);
        }
        e.target.value = null;
    };
    const handleAddObjectType = () => {
        setObjectsTypesItem([...objectsTypesItem, {nameFrom:"From",nameTo:"To", from: [], to: []}])
        // setObjectsTypesItem(prev => [...prev, { nameFrom: "From", nameTo: "To" }]);
        // setJsonKeys(prev => [...prev, { nameFrom: "", nameTo: "" }]);
    };
    
    // const handleSetJsonKey = (index, updatedValues) => {
    //     setJsonKeys(prev => {
    //         const updated = [...prev];
    //         console.log(updated[index])
    //         // updated[index] s= { ...updated[index], ...updatedValues };
    //         return updated;
    //     });
    // };
    
    useEffect(() => {
        if (!containerRef.current || nodesArray.length === 0) return;

        const network = new Network(
            containerRef.current,
            { nodes: nodesArray, edges: edgesArray },
            {
                layout: {
                },
                physics: false,
            }
        );
        network.on("selectNode", (params) => {
            const nodeId = params.nodes[0];
            const node = nodesArray.find((n) => n.id === nodeId);
            setSelectedNode(node );
        });

        network.on("deselectNode", () => {
            setSelectedNode(null);
        });
        return () => {
            network.destroy();
        };
    }, [nodesArray, edgesArray]);

    const generateGraph = () => {

        setLoading(true);
        _generateGraph(results,objectsTypesItem).then((response) => {
            setLoading(false);
            const nodes = Array.from(response.data.nodesSet.values());
            const edges = response.data.edgesArray;

            setNodesArray(nodes);
            setEdgesArray(edges);
        }).catch(err => {
            setLoading(false);
            console.error("Error generating graph:", err);
        });
    };
   
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" gap={2}>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<FileUpload />}
                    sx={{ padding: 1, height: "55px" }}
                >
                    Upload File
                    <HiddenInput type="file" onChange={handleFileChange} />
                </Button>
                <Stack marginY={3} height="calc(100vh - 300px)" overflow="auto">
                    <CustomTypography>
                        &nbsp;&nbsp;&nbsp;"Edges":
                        {
                            <Button onClick={handleAddObjectType}>
                                <AddBoxIcon sx={{fontSize: 30}}/>
                            </Button>
                        }
                    </CustomTypography>
                    {objectsTypesItem.length > 0 &&
                        (
                            <>
                                {objectsTypesItem.map((objectType, index) => (
                                    <KeyType 
                                        key={`object-type-${index}`} 
                                        nameFrom={objectType.nameFrom}
                                        nameTo={objectType.nameTo}
                                        objectToSet={objectType}
                                        index={index}
                                    />
                                ))}
                            </>
                        )
                    }
                </Stack>
                <Button
                    variant="contained"
                    onClick={generateGraph}
                    sx={{ padding: 1, height: "55px" }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Graph"}
                </Button>
            </Box>

            <Box
                ref={containerRef}
                sx={{
                    height: 400,
                    width: "50%",
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    mt: 2,
                }}
            />
             {selectedNode && (
                <Card >
                    <CardContentNoPadding sx={{ height: "calc(100% - 112px)", overflowY: "auto", overflowX: "auto", whiteSpace: "pre", overflow: "auto"}}>
                        <Typography variant="h6">Selected Node Details</Typography>
                        {/* {Object.entries(selectedNode).map(([key, value]) => (
                            <Typography key={key} variant="body2">
                                <strong>{key}:</strong> {String(value)}
                            </Typography>
                            
                        ))} */}
                        <JsonView value={selectedNode} style={{fontSize: '14px' }} width="100%" />
                    </CardContentNoPadding>
                </Card>
            )}
        </Box>
    );
};

export default NetworkGraph;
