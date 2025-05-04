import React, { useEffect } from "react";
import { useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";
import forceAtlas2 from "graphology-layout-forceatlas2";

const startForceAtlasAnimation = (graph) => {
    forceAtlas2.assign(graph, {
        iterations: 30,
        settings: {
            gravity: 0.5,
            scalingRatio: 10,
            strongGravityMode: true,
            adjustSizes: true,
        },
    });
        console.log("ForceAtlas2 layout animation step applied");
};
const smallUpdate = (graph) => {
    forceAtlas2.assign(graph, {
        iterations: 10,
        settings: {
            gravity: 1,
            scalingRatio: 30,
            strongGravityMode: true,
            adjustSizes: true,
        },
    });
        console.log("ForceAtlas2 layout animation step applied");
};
const runForceAtlasLayoutByClick = (graph) => {
    const interval = setInterval(() => {
        forceAtlas2.assign(graph, {
            iterations: 15,
            settings: {
                gravity: 1,
                scalingRatio: 20,
                strongGravityMode: true,
                adjustSizes: true,
            },
        });
        console.log("ForceAtlas2 layout step applied");
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        console.log("ForceAtlas2 layout stopped after 20 seconds");
    }, 20000);
};

const Graph = ({graphData,nodeFilter,onNodeSelected,onVisibleNodeCount}) => {
  const loadGraph = useLoadGraph();
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();
  const graph = sigma.getGraph();

  useEffect(() => {
    if (!graphData) return;

    // Load new graph data
    loadGraph(graphData);
    const graph = sigma.getGraph();

    // Animate layout
    if(graph.nodes().length > 0) {
        startForceAtlasAnimation(graph);
    }
    const numberOfNode=graph.nodes().length;
    let draggedNode = null;
    let isDragging = false;

    onVisibleNodeCount(numberOfNode);
    // Register node click events
    registerEvents({
        downNode: (event) => {
            isDragging = true;
            draggedNode = event.node;
            graph.setNodeAttribute(draggedNode, "highlighted", true);
            sigma.getCamera().disable(); // Disable camera movement during drag
        },
        moveBody: ({ event }) => {
            if (!isDragging || !draggedNode) return;

            
            const pos = sigma.viewportToGraph(event);
            graph.setNodeAttribute(draggedNode, "x", pos.x);
            graph.setNodeAttribute(draggedNode, "y", pos.y);

            event.preventSigmaDefault();
            event.original.preventDefault();
            event.original.stopPropagation();
        },
        upNode: () => {
            if (draggedNode) {
                graph.removeNodeAttribute(draggedNode, "highlighted");
            }
            isDragging = false;
            draggedNode = null;
            sigma.getCamera().enable(); 
        },
        upStage: () => {
            if (draggedNode) {
                graph.removeNodeAttribute(draggedNode, "highlighted");
            }
            isDragging = false;
            draggedNode = null;
            sigma.getCamera().enable(); 
        },
      clickNode: (event) => {
       
        onNodeSelected(graph.getNodeAttributes(event.node).details);
      },
      
    });


  }, [graphData, loadGraph, registerEvents, sigma]);
  useEffect(() => {
    if (!graph) return;
    let visibleNodeCount=new Set();
    if(nodeFilter!==""){
        smallUpdate(graph);
        graph.forEachNode((node)=>{
            graph.setNodeAttribute(node,"hidden",true);
        })
        graph.forEachEdge((edge, attributes) => {
            if(attributes.value===parseInt(nodeFilter)){
                graph.setNodeAttribute(graph.source(edge),"hidden",false);
                graph.setNodeAttribute(graph.target(edge),"hidden",false);
                visibleNodeCount.add(graph.source(edge));
                visibleNodeCount.add(graph.target(edge));
            }
        })
    }else{
        graph.forEachNode((node)=>{
            graph.setNodeAttribute(node,"hidden",false);
            visibleNodeCount.add(node);
        })
    }
    onVisibleNodeCount(visibleNodeCount.size);
  }, [nodeFilter, graph]);
  return null;
};

export default Graph;
