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
import forceAtlas2 from 'graphology-layout-forceatlas2';
import useDataContext from "../dataContext/useDataContext";
import { FileUpload } from "@mui/icons-material";
import { HiddenInput } from "../components/HiddenInput";
import React, { useEffect, useState, useRef } from "react";
import {darkTheme} from "@uiw/react-json-view/dark";
import JsonView from "@uiw/react-json-view";
import { _generateGraph } from "../api/services";
import CustomTypography from "../components/CustomTypography";
import AddBoxIcon from '@mui/icons-material/AddBox';
import KeyType from '../components/keyType/keyType';
import MultiDirectedGraph from "graphology";
import { SigmaContainer, useLoadGraph,useRegisterEvents } from "@react-sigma/core";
// import { ForceAtlas2 } from '@react-sigma/layout-forceatlas2';
import Graph from "./Graph"; 
import { TextField } from "@mui/material";


import "@react-sigma/core/lib/style.css";




const CardContentNoPadding = styled(CardContent)`
    padding-top: 0;
    &:last-child {
        padding-bottom: 0;
    }
`;

const NetworkGraph = () => {
    // const { results, setResults } = useDataContext();
    // const [loading, setLoading] = useState(false);
    // const [graphData, setGraphData] = useState(null);
    // const [selectedNode, setSelectedNode] = useState(null);
    // const [edgesArray, setEdgesArray] = useState([]);
    // const [nodesSet, setNodesSet] = useState([]);
    // const [objectsTypesItem, setObjectsTypesItem] = useState([]);
    // const [visibleNodes, setVisibleNodes] = useState(null);


    // const handleFileChange = (e) => {
    //     const fileReader = new FileReader();
    //     fileReader.onload = (event) => {
    //         const content = event.target.result;
    //         try {
    //             setResults(JSON.parse(content));
    //         } catch (err) {
    //             console.error("Invalid JSON file");
    //         }
    //     };
    //     if (e.target.files[0]) {
    //         fileReader.readAsText(e.target.files[0]);
    //     }
    //     e.target.value = null;
    // };

    // const handleAddObjectType = () => {
    //     setObjectsTypesItem([...objectsTypesItem, { nameFrom: "From", nameTo: "To", from: [], to: [] }]);
    // };
    // // const handleSearch = (query) => {
    // //     const edgesFiltered = edgesArray.filter(edge => edge.value === parseInt(query));
    // //     const nodesFiltered = [];
    // //     edgesFiltered.forEach((edge) => {
    // //         if(edge.value === parseInt(query)) {
    // //             nodesSet.forEach((node)=>{
    // //                 if(edge.from === node.id || edge.to === node.id){
    // //                     nodesFiltered.push(node);
    // //                     // graphData.setNodeAttribute(node.id, 'hidden', false);   
    // //                 }

    // //             })

    // //         }
    // //     })
    // //     // setGraphData(graphData);
    // //     setGraphData(createGraph(nodesFiltered, edgesFiltered));
    // // };
    // const handleSearch = (query) => {
    //     const visible = new Set();
    //     const edgesFiltered = edgesArray.filter(edge => edge.value === parseInt(query));
    //     edgesFiltered.forEach((edge) => {
    //         nodesSet.forEach((node) => {
    //             if(edge.from === node.id || edge.to === node.id){
                    
    //             }else{  
    //                 graphData.setNodeAttribute(edge.from, 'hidden', true);
    //                 graphData.setNodeAttribute(edge.to, 'hidden', true);
    //             }
    //         })
    //     });
    //     setVisibleNodes(visible);

    //   };
      
    // const createGraph = (nodes, edges) => {
    //     const graph = new MultiDirectedGraph();
    //     setNodesSet(nodes)
    //     // Add nodes to the graph
    //     nodes.forEach((node) => {
    //         graph.addNode(node.id, {
    //             ...node,
    //         });
    //     });
    //     setEdgesArray(edges);
    //     // Determine max and min edge values
        // const edgeValues = edges.map(edge => edge.value);
        // const maxEdgeValue = Math.max(...edgeValues);
        // const minEdgeValue = Math.min(...edgeValues);
        // // Scale edge values to a smaller range (e.g., 1 to 10)
        // const scaleEdgeValue = (value) => {
        //     if (maxEdgeValue === minEdgeValue) return 5; // Avoid division by zero
        //     return ((value - minEdgeValue) / (maxEdgeValue - minEdgeValue)) * 9 + 1;
        // };

    //     // Add edges with scaled values
    //     edges.forEach((edge) => {
    //         graph.addEdgeWithKey(edge.id,edge.from, edge.to, {
    //             size: scaleEdgeValue(edge.value),
    //         });
    //     });
    //     // Apply ForceAtlas2 layout
    //     forceAtlas2.assign(graph, { iterations: 100, settings: { gravity: 0, scalingRatio: 10 } });

    //     return graph;
    // };
    // const generateGraph = () => {
    //     setLoading(true);
    //     _generateGraph(results, objectsTypesItem).then((response) => {
    //         setLoading(false);
    //         const nodes = Array.from(response.data.nodesSet.values());
    //         const edges = response.data.edgesArray;
    //         // Add node
    //        setGraphData(createGraph(nodes, edges));
    //     }).catch(err => {
    //         setLoading(false);
    //         console.error("Error generating graph:", err);
    //     });
    // };

    // const LoadGraph = () => {
    //     const loadGraph = useLoadGraph();
    //     useEffect(() => {
    //         if (graphData) {
    //             console.log("Loading graph data:", graphData);
    //             // Set the graph data
    //             loadGraph(graphData);
    //         }
    //     }, [graphData,loadGraph]);
    //     return null;
    // };
    // const RefreshOnFilterChange = ({ visibleNodes }) => {
    //     const sigma = useSigma();
      
    //     useEffect(() => {

    //         sigma.refresh(); // Automatically refresh when visibleNodes changes
    //     }, [visibleNodes, sigma]);
      
    //     return null;
    //   };
    // return (
    //     <Box display="flex" flexDirection="column" gap={2}>
            // <Box display="flex" gap={2}>
            //     <Button
            //         component="label"
            //         variant="contained"
            //         startIcon={<FileUpload />}
            //         sx={{ padding: 1, height: "55px" }}
            //     >
            //         Upload File
            //         <HiddenInput type="file" onChange={handleFileChange} />
            //     </Button>

            //     <Stack marginY={3} height="calc(100vh - 300px)" overflow="auto">
            //         <CustomTypography>
            //             &nbsp;&nbsp;&nbsp;"Edges":
            //             <Button onClick={handleAddObjectType}>
            //                 <AddBoxIcon sx={{ fontSize: 30 }} />
            //             </Button>
            //         </CustomTypography>
            //         {objectsTypesItem.map((objectType, index) => (
            //             <KeyType
            //                 key={`object-type-${index}`}
            //                 nameFrom={objectType.nameFrom}
            //                 nameTo={objectType.nameTo}
            //                 objectToSet={objectType}
            //                 index={index}
            //                 setObjectsTypesItem={setObjectsTypesItem}
            //             />
            //         ))}
            //     </Stack>

            //     <Button
            //         variant="contained"
            //         onClick={generateGraph}
            //         sx={{ padding: 1, height: "55px" }}
            //     >
            //         {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Graph"}
            //     </Button>
            // </Box>
    //         <Box display="flex" flexDirection="column" gap={2}>
    //             <Typography variant="h6">Select Edge Value</Typography>
                // <TextField
                    // select
                    // SelectProps={{ native: true }}
                    // defaultValue=""
                    // onChange={(e) => handleSearch(e.target.value)}
                //     sx={{ width: 100 }}
                // >
                //     <option value="">All</option>
                //     {graphData &&
                //         Array.from(new Set(edgesArray.map(edge => edge.value)))
                //             .sort((a, b) => a - b)
                //             .map((value, index) => (
                //                 <option key={index} value={value}>
                //                     {value}
                //                 </option>
                //             ))}
                // </TextField>
    //         </Box>

    //         <Box sx={{ height: 500, width: "100%", mt: 2 }}>
    //             <SigmaContainer
    //                 style={{ height: "100%", width: "100%" }}
    //                 settings={{
    //                     labelRenderedSizeThreshold: 10,
    //                     defaultNodeColor: "#3399FF",
    //                 }}
    //                 >
    //                 <LoadGraph />
    //                 <RefreshOnFilterChange visibleNodes={visibleNodes} />
    //             </SigmaContainer>
    //         </Box>

    //         {selectedNode && (
    //             <Card>
    //                 <CardContentNoPadding
    //                     sx={{
    //                         height: "calc(100% - 112px)",
    //                         overflowY: "auto",
    //                         overflowX: "auto",
    //                         whiteSpace: "pre",
    //                     }}
    //                 >
    //                     <Typography variant="h6">Selected Node Details</Typography>
    //                     <JsonView value={selectedNode} style={{ fontSize: '14px' }} width="100%" />
    //                 </CardContentNoPadding>
    //             </Card>
    //         )}
    //     </Box>
    // );
    const [selectedNode, setSelectedNode] = useState(null);
    const { results, setResults } = useDataContext();
    const [running, setRunning] = useState(false);
    const [nodeFilter, setNodeFilter] = useState("");
    const [edgeFilter, setEdgeFilter] = useState("");
    const [colorLegend,setColorLegend]=useState([]);
    const [visibleNodesCount, setVisibleNodeCount]=useState(0);
  const [graphData, setGraphData] = useState({
    nodes: [
    ],
    edges: [
    ],
  });
  const [objectsTypesItem, setObjectsTypesItem] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedNode(value === "" ? null : value);
  };
  const handleVisibleNodeCount=(count)=>{
    console.log("count",count)
    setVisibleNodeCount(count);
  }
  

  const handleLoadGraph = () => {
    const newNodes = [
    ];

    const newEdges = [
    ];

    setGraphData({
      nodes: newNodes,
      edges: newEdges,
    });
    setSelectedNode(null);
  };

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
    const newObjectType = { nameFrom: '', nameTo: '' };
    setObjectsTypesItem([...objectsTypesItem, newObjectType]);
  };
  const handleNodeSelected = (node) => {
    setSelectedNode(node);
  };
    const generateGraph = () => {
        setLoading(true);
        _generateGraph(results, objectsTypesItem).then((response) => {
            setLoading(false);
            const nodes = Array.from(response.data.nodesSet.values());
            const edges = response.data.edgesArray;
            // Add node
            const newNodes=nodes.map((obj,index) => ({
                key:obj.id,
                attributes: {
                    label: `${obj.label}`,
                    size: 10,
                    details:obj.details,
                    keyUsed:obj.keyUsed,
                    color: obj.color,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                },
            }))
            const colorLegendData = new Set();
            const checkColorElement = (color) => {
                let flag=true;
                colorLegendData.forEach((element) => {
                  if (element.color===color) {
                    flag= false;
                  }
                }); 
                return flag;
            }
            newNodes.forEach((node) => {
                if (node.attributes.color ) {
                  if(checkColorElement(node.attributes.color)){
                    colorLegendData.add({color:node.attributes.color,keyAssigned:node.attributes.keyUsed});
                  }
                }
              });

            setColorLegend(colorLegendData);
            // setColorLegend(colorLegendData);
            const edgeValues = edges.map(edge => edge.value);
            setEdgeFilter(edgeValues);
            const maxEdgeValue = Math.max(...edgeValues);
            const minEdgeValue = Math.min(...edgeValues);
            // Scale edge values to a smaller range (e.g., 1 to 10)
            const scaleEdgeValue = (value) => {
                if (maxEdgeValue === minEdgeValue) return 5; // Avoid division by zero
                return ((value - minEdgeValue) / (maxEdgeValue - minEdgeValue)) * 9 + 1;
            }
            const newEdges=edges.map((obj,index) => ({
                key:obj.id,
                source: obj.from,
                target: obj.to,
                attributes:{
                    value:obj.value,
                    size: scaleEdgeValue(obj.value),
                    color: '#3399FF',
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                },
            }))
        setGraphData({nodes:newNodes, edges:newEdges});

        setLoading(false);
        }).catch(err => {
            setLoading(false);
            console.error("Error generating graph:", err);
        });
    };
//   const generateGraph = () => {
//     setLoading(true);

//     setTimeout(() => {
//       const newNodes = objectsTypesItem.map((obj, index) => ({
//         key: `generated_node_${index}`,
//         attributes: {
//           label: `${obj.nameFrom} to ${obj.nameTo}`,
//           size: 15,
//           color: '#1abc9c',
//           x: Math.random() * 100,
//           y: Math.random() * 100,
//         },
//       }));

//       const newEdges = newNodes.map((node, index) => ({
//         key: `generated_edge_${index}`,
//         source: newNodes[index % newNodes.length].key,
//         target: newNodes[(index + 1) % newNodes.length].key,
//         attributes: {},
//       }));

//       setGraphData({ nodes: newNodes, edges: newEdges });
//       setLoading(false);
//     }, 1000); // fake loading
//   };

  return (
    <div style={{ height: '100%', width: '100%'}}>
      {/* Top control box */}
      <Box display="flex" gap={2} marginBottom={2} style={{ height: '25em' }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<FileUpload />}
          sx={{ padding: 1, height: "55px" }}
        >
          Upload File
          <HiddenInput type="file" onChange={handleFileChange} />
        </Button>
        

        <Stack marginY={3}  overflow="auto">
          <CustomTypography>
            <Button onClick={handleAddObjectType}>
              <Button  variant="contained"
              sx={{ padding: 1, height: "55px" }}>Add edge</Button>
            </Button>
          </CustomTypography>

          {objectsTypesItem.map((objectType, index) => (
            <KeyType
              key={`object-type-${index}`}
              nameFrom={objectType.nameFrom}
              nameTo={objectType.nameTo}
              objectToSet={objectType}
              index={index}
              setObjectsTypesItem={setObjectsTypesItem}
            />
          ))}
        </Stack>

        <Button
          variant="contained"
          onClick={generateGraph}
          sx={{ padding: 1, height: "55px" }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Graph"}
        </Button>
        <TextField
            select
            label="Edge Size"
            SelectProps={{ native: true }}
            defaultValue=""
            sx={{ width: 150 }}
            onChange={(e) => setNodeFilter(e.target.value)}
        >
            <option value=""></option>
            {edgeFilter &&
                Array.from(new Set(edgeFilter))
                    .sort((a, b) => a - b)
                    .map((size, index) => (
                        <option key={index} value={size}>
                            {size}
                        </option>
                    ))}
        </TextField>
       <Typography variant="h6">Visible Nodes: {visibleNodesCount}</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6">Color Legend</Typography>
        {Array.from(colorLegend).map((legendItem, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: legendItem.color,
                borderRadius: "50%",
              }}
            />
            <Typography variant="body1">{legendItem.keyAssigned}</Typography>
          </Box>
        ))}
      </Box>
      </Box>
      {/* Graph itself */}
      <SigmaContainer style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
        <Graph selectedNode={selectedNode} 
        graphData={graphData}
        nodeFilter={nodeFilter}
        onNodeSelected={handleNodeSelected}
        onVisibleNodeCount={handleVisibleNodeCount}/>
      </SigmaContainer>
      {selectedNode && (
      <Stack marginY={3} height="calc(100vh - 300px)" overflow="auto">
      
      <JsonView value={selectedNode} style={{ fontSize: '14px' }} width="100%" />

        </Stack>
      )}
    </div>
  );
};


export default NetworkGraph;
