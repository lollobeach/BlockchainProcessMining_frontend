import axios from "axios";

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