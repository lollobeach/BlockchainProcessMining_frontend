const addContractStateVariableRelationships = (ocel, setOcel, jsonLog) => {
    const objects = ocel.objects
    const contractAddressObjects = objects.filter(obj => obj.type.includes("contractAddress"))
    const variableObjects = objects.filter(obj => obj.id.includes("variable_"))
    if (contractAddressObjects.length > 0 && variableObjects.length > 0) {
        if (!contractAddressObjects.some(contractAddressObj => contractAddressObj.relationships?.some(relationship => relationship.qualifier.includes("contains")))) {
            objects.forEach(obj => {
                if (obj.type.includes("contractAddress")) {
                    const relationships = [...(obj.relationships || [])]
                    const storageState = jsonLog.find(log => log.txHash === obj.id.split("_")[1]).storageState
                    variableObjects.forEach(variableObj => {
                        if (storageState.some(variable => variableObj.id.replace("variable_", "").includes(variable.variableName))) {
                            relationships.push({
                                objectId: variableObj.id,
                                qualifier: "contains"
                            })
                        }
                    })
                    obj.relationships = relationships
                }
            })
        }

        if (!variableObjects.some(variableObj => variableObj.relationships?.some(relationship => relationship.qualifier.includes("is storage of")))) {
            objects.forEach(obj => {
                if (obj.id.includes("variable")) {
                    const relationships = [...(obj.relationships || [])]
                    jsonLog.forEach(log => {
                        if (log.storageState.some(variable => obj.id.replace("variable_", "").includes(variable.variableName))) {
                            const contractAddressToAdd = contractAddressObjects.find(contractAddressObj => contractAddressObj.id.split("_")[1] === log.txHash).id
                            relationships.push({
                                objectId: contractAddressToAdd,
                                qualifier: "is storage of"
                            })
                        }
                    })
                    obj.relationships = relationships
                }
            })
        }
    }

    ocel.objects = objects
    setOcel(ocel)
}

const addContractEventRelationships = (ocel, setOcel) => {
    // TODO: Add relationships between events
}

const addContractSenderRelationships = (ocel, setOcel) => {
    const objects = ocel.objects
    const contractAddressObjects = objects.filter(obj => obj.type.includes("contractAddress"))
    const senderObjects = objects.filter(obj => obj.type.includes("sender"))
    if (contractAddressObjects.length > 0 && senderObjects.length > 0) {
        if (!contractAddressObjects.some(contractAddressObj => contractAddressObj.relationships?.some(relationship => relationship.qualifier.includes("invoked by")))) {
            objects.forEach(obj => {
                if (obj.type.includes("contractAddress")) {
                    const relationships = [...(obj.relationships || [])]
                    const senderToAdd = senderObjects.find(senderObj => senderObj.id.split("_")[1] === obj.id.split("_")[1]).id
                    relationships.push({
                        objectId: senderToAdd,
                        qualifier: "invoked by"
                    })
                    obj.relationships = relationships
                }
            })
        }

        if (!senderObjects.some(senderObj => senderObj.relationships?.some(relationship => relationship.qualifier.includes("invokes")))) {
            objects.forEach(obj => {
                if (obj.type.includes("sender")) {
                    const relationships = [...(obj.relationships || [])]
                    const contractAddressToAdd = contractAddressObjects.find(contractAddressObj => contractAddressObj.id.split("_")[1] === obj.id.split("_")[1]).id
                    relationships.push({
                        objectId: contractAddressToAdd,
                        qualifier: "invokes"
                    })
                    obj.relationships = relationships
                }
            })
        }
    }

    ocel.objects = objects
    setOcel(ocel)

}

export const addContractAddressRelationships = (ocel, setOcel, jsonLog) => {
    const objects = ocel.objects;

    if (objects.some(obj => obj.id.includes("variable_"))) {
        addContractStateVariableRelationships(ocel, setOcel, jsonLog);
    }

    if (objects.some(obj => obj.id.includes("event"))) {
        addContractEventRelationships(ocel, setOcel);
    }

    if (objects.some(obj => obj.type.includes("sender"))) {
        addContractSenderRelationships(ocel, setOcel);
    }
}

const addSenderInputRelationships = (ocel, setOcel) => {
    // TODO: Add relationships between sender and input objects
}

const addSenderTxHashRelationships = (ocel, setOcel) => {
    // TODO: Add relationships between sender and transaction hash objects
}

export const addSenderRelationships = (ocel, setOcel, jsonLog) => {
    const objects = ocel.objects;

    if (objects.some(obj => obj.type.includes("contractAddress"))) {
        addContractSenderRelationships(ocel, setOcel, jsonLog);
    }

    if (objects.some(obj => obj.id.includes("inputName"))) {
        addSenderInputRelationships(ocel, setOcel);
    }

    if (objects.some(obj => obj.type.includes("txHash"))) {
        addSenderTxHashRelationships(ocel, setOcel);
    }
}

const addTxHashInternalTxRelationships = (ocel, setOcel) => {
    // TODO: Add relationships between transaction hash and internal transaction objects
}

export const addTxHashRelationships = (ocel, setOcel) => {
    if (ocel.objects.some(obj => obj.type.includes("sender"))) {
        addSenderTxHashRelationships(ocel, setOcel);
    }

    if (ocel.objects.some(obj => obj.type.includes("internalTx"))) {
        addTxHashInternalTxRelationships(ocel, setOcel);
    }
}

export const addInputNameRelationships = (ocel, setOcel) => {
    if (ocel.objects.some(obj => obj.type.includes("sender"))) {
        addSenderInputRelationships(ocel, setOcel);
    }
}

export const addVariableRelationships = (ocel, setOcel, jsonLog) => {
    if (ocel.objects.some(obj => obj.type.includes("contractAddress"))) {
        addContractStateVariableRelationships(ocel, setOcel, jsonLog);
    }
}

export const addEventRelationships = (ocel, setOcel) => {
    if (ocel.objects.some(obj => obj.type.includes("contractAddress"))) {
        addContractEventRelationships(ocel, setOcel);
    }
}

export const addInternalTxRelationships = (ocel, setOcel) => {
    if (ocel.objects.some(obj => obj.type.includes("txHash"))) {
        addTxHashInternalTxRelationships(ocel, setOcel);
    }
}