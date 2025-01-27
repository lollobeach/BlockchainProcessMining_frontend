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

        if (!variableObjects.some(variableObj => variableObj.relationships?.some(relationship => relationship.qualifier.includes("storage of")))) {
            objects.forEach(obj => {
                if (obj.id.includes("variable")) {
                    const relationships = [...(obj.relationships || [])]
                    jsonLog.forEach(log => {
                        if (log.storageState.some(variable => obj.id.replace("variable_", "").includes(variable.variableName))) {
                            const contractAddressToAdd = contractAddressObjects.find(contractAddressObj => contractAddressObj.id.split("_")[1] === log.txHash).id
                            relationships.push({
                                objectId: contractAddressToAdd,
                                qualifier: "storage of"
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
    const objects = ocel.objects
    const contractAddressObjects = objects.filter(obj => obj.type.includes("contractAddress"))
    const eventObjects = objects.filter(obj => obj.id.includes("event_"))

    if (contractAddressObjects.length > 0 && eventObjects.length > 0) {
        if (!contractAddressObjects.some(contractAddressObj => contractAddressObj.relationships?.some(relationship => relationship.qualifier.includes("defines")))) {
            objects.forEach(obj => {
                if (obj.type.includes("contractAddress")) {
                    const relationships = [...(obj.relationships || [])]
                    eventObjects.forEach(eventObj => {
                        if (eventObj.id.split("_")[2] === obj.id.split("_")[1]) {
                            relationships.push({
                                objectId: eventObj.id,
                                qualifier: "defines"
                            })
                        }
                    })
                    obj.relationships = relationships
                }
            })
        }

        if (!eventObjects.some(eventObj => eventObj.relationships?.some(relationship => relationship.qualifier.includes("member of")))) {
            objects.forEach(obj => {
                if (obj.id.includes("event_")) {
                    const relationships = [...(obj.relationships || [])]
                    const contractAddressToAdd = contractAddressObjects.find(contractAddressObj => contractAddressObj.id.split("_")[1] === obj.id.split("_")[2]).id
                    relationships.push({
                        objectId: contractAddressToAdd,
                        qualifier: "member of"
                    })
                    obj.relationships = relationships
                }
            })
        }
    }

    ocel.objects = objects
    setOcel(ocel)
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
    const objects = ocel.objects;
    const senderObjects = objects.filter(obj => obj.type.includes("sender"));
    const inputObjects = objects.filter(obj => obj.id.includes("inputName_"));
    if (senderObjects.length > 0 && inputObjects.length > 0) {
        if (!senderObjects.some(senderObj => senderObj.relationships?.some(relationship => relationship.qualifier.includes("passes")))) {
            objects.forEach(obj => {
                if (obj.type.includes("sender")) {
                    const relationships = [...(obj.relationships || [])]
                    inputObjects.forEach(inputObj => {
                        if (inputObj.id.split("_")[2] === obj.id.split("_")[1]) {
                            relationships.push({
                                objectId: inputObj.id,
                                qualifier: "passes"
                            })
                        }
                    })
                    obj.relationships = relationships
                }
            })
        }

        if (!inputObjects.some(inputObj => inputObj.relationships?.some(relationship => relationship.qualifier.includes("inserted by")))) {
            objects.forEach(obj => {
                if (obj.id.includes("inputName_")) {
                    const relationships = [...(obj.relationships || [])]
                    const senderToAdd = senderObjects.find(senderObj => senderObj.id.split("_")[1] === obj.id.split("_")[2]).id
                    relationships.push({
                        objectId: senderToAdd,
                        qualifier: "inserted by"
                    })
                    obj.relationships = relationships
                }
            })
        }
    }

    ocel.objects = objects
    setOcel(ocel)
}

const addSenderTxHashRelationships = (ocel, setOcel) => {
    const objects = ocel.objects;
    const senderObjects = objects.filter(obj => obj.type.includes("sender"));
    const txHashObjects = objects.filter(obj => obj.type.includes("transactionHash"));
    if (senderObjects.length > 0 && txHashObjects.length > 0) {
        if (!senderObjects.some(senderObj => senderObj.relationships?.some(relationship => relationship.qualifier.includes("generates")))) {
            objects.forEach(obj => {
                if (obj.type.includes("sender")) {
                    const relationships = [...(obj.relationships || [])]
                    const txHashToAdd = txHashObjects.find(txHashObj => txHashObj.id === obj.id.split("_")[1]).id
                    relationships.push({
                        objectId: txHashToAdd,
                        qualifier: "generates"
                    })
                    obj.relationships = relationships
                }
            })
        }

        if (!txHashObjects.some(txHashObj => txHashObj.relationships?.some(relationship => relationship.qualifier.includes("created by")))) {
            objects.forEach(obj => {
                if (obj.type.includes("transactionHash")) {
                    const relationships = [...(obj.relationships || [])]
                    const senderToAdd = senderObjects.find(senderObj => senderObj.id.split("_")[1] === obj.id).id
                    relationships.push({
                        objectId: senderToAdd,
                        qualifier: "created by"
                    })
                    obj.relationships = relationships
                }
            })
        }
    }

    ocel.objects = objects
    setOcel(ocel)
}

export const addSenderRelationships = (ocel, setOcel, jsonLog) => {
    const objects = ocel.objects;

    if (objects.some(obj => obj.type.includes("contractAddress"))) {
        addContractSenderRelationships(ocel, setOcel, jsonLog);
    }

    if (objects.some(obj => obj.id.includes("inputName"))) {
        addSenderInputRelationships(ocel, setOcel);
    }

    if (objects.some(obj => obj.type.includes("transactionHash"))) {
        addSenderTxHashRelationships(ocel, setOcel);
    }
}

const addTxHashInternalTxRelationships = (ocel, setOcel) => {
    const objects = ocel.objects;
    const txHashObjects = objects.filter(obj => obj.type.includes("transactionHash"));
    const internalTxObjects = objects.filter(obj => obj.id.includes("internalTransaction_"));
    if (txHashObjects.length > 0 && internalTxObjects.length > 0) {
        if (!txHashObjects.some(txHashObj => txHashObj.relationships?.some(relationship => relationship.qualifier.includes("triggers")))) {
            objects.forEach(obj => {
                if (obj.type.includes("transactionHash")) {
                    const relationships = [...(obj.relationships || [])]
                    internalTxObjects.forEach(internalTxObj => {
                        if (internalTxObj.id.split("_")[2] === obj.id) {
                            relationships.push({
                                objectId: internalTxObj.id,
                                qualifier: "triggers"
                            })
                        }
                    })
                    obj.relationships = relationships
                }
            })
        }

        if (!internalTxObjects.some(internalTxObj => internalTxObj.relationships?.some(relationship => relationship.qualifier.includes("triggered in")))) {
            objects.forEach(obj => {
                if (obj.id.includes("internalTransaction_")) {
                    const relationships = [...(obj.relationships || [])]
                    const txHashToAdd = txHashObjects.find(txHashObj => txHashObj.id === obj.id.split("_")[2]).id
                    relationships.push({
                        objectId: txHashToAdd,
                        qualifier: "triggered in"
                    })
                    obj.relationships = relationships
                }
            })
        }
    }

    ocel.objects = objects
    setOcel(ocel)
}

export const addTxHashRelationships = (ocel, setOcel) => {
    if (ocel.objects.some(obj => obj.type.includes("sender"))) {
        addSenderTxHashRelationships(ocel, setOcel);
    }

    if (ocel.objects.some(obj => obj.id.includes("internalTransaction_"))) {
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
    if (ocel.objects.some(obj => obj.type.includes("transactionHash"))) {
        addTxHashInternalTxRelationships(ocel, setOcel);
    }
}