import axios from "axios";

const serverUrl = "http://localhost:8000";

export const _sendData = async (contractName, contractAddress, fromBlock, toBlock) => {
    const body = {
        contractAddress,
        contractName,
        fromBlock,
        toBlock
    }

    try {
        const response = await axios.post(serverUrl + "/submit", body)
        return response.data
    } catch (error) {
        console.error(error)
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