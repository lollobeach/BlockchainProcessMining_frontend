import axios from "axios";
import jp from 'jsonpath';
const serverUrl = "http://localhost:8000";

export const _sendData = async (contractName, contractAddress, impl_contract, fromBlock, toBlock, network, sc, filters) => {
    const formData = new FormData()
    formData.append('file', sc)
    formData.append('contractAddress', contractAddress)
    formData.append('implementationContractAddress', impl_contract)
    formData.append('contractName', contractName)
    formData.append('fromBlock', fromBlock)
    formData.append('toBlock', toBlock)
    formData.append('network', network)
    formData.append('filters', JSON.stringify(filters))

    try {
        const response = await axios.post(serverUrl + "/submit", formData)
        return {status: response.status, data: response.data}
    } catch (error) {
        console.error(error)
        return {status: error.response.status, data: error.response.data}
    }
}

export const _downloadJson = async (jsonLog) => {
    const body = {
        jsonLog
    }

    try {
        const response = await axios.post(serverUrl + "/json-download", body, {responseType: 'blob'})
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const _downloadCSV = async (jsonLog) => {
    const body = {
        jsonLog
    }
    try {
        const response = await axios.post(serverUrl + "/csv-download", body, {responseType: 'blob'})
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const _xesDownload = async (jsonLog) => {
    const body = {
        jsonLog
    }
    try {
        const response = await axios.post(serverUrl + "/xes-translator", body, {responseType: 'blob'})
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const _downloadOCEL = async (ocel) => {
    const body = {
        ocel
    }
    try {
        const response = await axios.post(serverUrl + "/ocel-download", body, {responseType: 'blob'})
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const _downloadJSONOCEL = async (ocel) => {
    const body = {
        ocel
    }

    try {
        const response = await axios.post(serverUrl + "/jsonocel-download", body, {responseType: 'blob'})
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const _downloadCSVOCEL = async (ocel) => {
    const body = {
        ocel
    }

    try {
        const response = await axios.post(serverUrl + "/csvocel-download", body, {responseType: 'blob'})
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const _searchTransactionByQuery = async (query) => {
    try {
        const response = await axios.post(serverUrl + "/api/query", query)
        return {status: response.status, data: response.data}
    } catch (error) {
        console.error(error)
        return {status: error.response.status, data: error.response.data}
    }
}

export const _occelMapping = async (objectsToMap,blockchainLog) => {
    try {
        const response = await axios.post(serverUrl + "/api/ocelMap", {objectsToMap,blockchainLog})
        return {status: response.status, data: response.data}
    } catch (error) {
        console.error(error)
        return {status: error.response.status, data: error.response.data}
    }
}

export const _ocelXes = async (objectsToXes,jsonToXes)=>{
    try {
        const response = await axios.post(serverUrl + "/api/xes", {objectsToXes,jsonToXes})
        return {status: response.status, data: response.data}
    } catch (error) {
        console.error(error)
        return {status: error.response.status, data: error.response.data}
    }

}

export const _generateGraph=async (jsonData,edges)=>{
    try {
        const nodesSet = new Map();
        let index=0;
        let edgesArray = [];
        let level=0;
        const addNodeIfMissing = (id,label, shape, level, color, tx) => {
            if (!nodesSet.has(id)) {
                nodesSet.set(id, {
                    id,
                    label: label,
                    shape,
                    level,
                    color,
                    details: tx
                });
            }
        }; 
        const getNodeId = (item) => {
            if (typeof item === 'object' && item !== null) {
                return JSON.stringify(item);
            }
            return String(item);
        };
        
        let indexNodeTo=0;
        let indexNodeFrom=0;
        edges.forEach(edge => {
           
            let from=edge.from;
            let to=edge.to;
            jsonData.forEach(tx => {
                let fromResults=jp.value(tx, `$..${from}`);
                let toResults=jp.value(tx, `$..${to}`);
                const fromItems=Array.isArray(fromResults) ? fromResults : [fromResults];
                const toItems=Array.isArray(toResults) ? toResults : [toResults];
                fromItems.forEach((fromItem) => {
                    const idFrom = getNodeId(fromItem);
                    const labelFrom = idFrom.slice(0,64)+"...";
                    addNodeIfMissing(idFrom, labelFrom, "ellipse", level, "lightblue", tx);
                
                    toItems.forEach((toItem) => {
                        const idTo = getNodeId(toItem);
                        const labelTo = idTo.slice(0,64)+"...";
                        addNodeIfMissing(idTo, labelTo, "box", level + 1, "orange", tx);
                        edgesArray.push({
                            id: `${idFrom}-${idTo}-${index}`,
                            from: idFrom,
                            to: idTo,
                            label: ""
                        });
                        index++;
                    });
                });
                
            })
            level++;
        })
            
        return {status:200,data:{nodesSet,edgesArray}};
    } catch (error) {
        console.error(error)
        return {status: error.response.status, data: error.response.data}
    }
}


function findAllValuesByKey(obj, key) {
    let results = [];

    function recursiveSearch(o) {
        if (typeof o !== 'object' || o === null) return;

        if (key in o) {
            results.push(o[key]);
        }

        for (let k in o) {
            if (typeof o[k] === 'object') {
                recursiveSearch(o[k]);
            } else if (Array.isArray(o[k])) {
                o[k].forEach(item => recursiveSearch(item));
            }
        }
    }

    recursiveSearch(obj);
    return results;
}