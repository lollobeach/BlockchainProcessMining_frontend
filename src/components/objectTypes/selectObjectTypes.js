import {
    addContractAddressRelationships,
    addEventRelationships,
    addInputNameRelationships,
    addInternalTxRelationships,
    addSenderRelationships,
    addTxHashRelationships,
    addVariableRelationships
} from "./obj2obj_relationships/addRelationships";

export const handleContractAddressObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {

    const contractAddress = []

    results?.forEach((log) => {
        contractAddress.push({
            time: log.timestamp,
            id: log.contractAddress + "_" + log.txHash,
            name: "contractAddress",
            value: log.contractAddress,
            type: "string"
        })
    })

    const newObjectTypes = [...ocel.objectTypes]
    const valuesSet = contractAddress.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
    valuesSet.forEach(value => {
            newObjectTypes.push({
                name: value.name,
                attributes: [{name: "contractAddressValue", type: value.type}],
            })
        }
    )

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "contractAddress",
        names: contractAddress.map(value => ({name: value.name, id: value.id}))
    } : item))

    const objects = []
    contractAddress.forEach(value => {
        const attributeValues = [{name: "contractAddressValue", time: value.time, value: value.value}]
        const object = {
            id: value.id,
            key: "contractAddress",
            type: value.name,
            attributes: attributeValues
        }

        objects.push(object)
    })

    setObjectsItem((oldObjects) => [...oldObjects, ...objects])
    const newOcel = {
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)],
        events: [...ocel.events]
    }
    setOcel(newOcel)

    const events = [...ocel.events]
    events.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "generated by"})
            }
        })
    })

    addContractAddressRelationships(newOcel, setOcel, results);
}

export const handleTxHashObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const txHashes = []

    results?.forEach((log) => {
        txHashes.push({
            time: log.timestamp,
            id: log.txHash,
            name: "transactionHash",
            value: log.txHash,
            type: "string"
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    const valuesSet = txHashes.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
    valuesSet.forEach(value => {
            newObjectTypes.push({
                name: value.name,
                attributes: [{name: "hashValue", type: value.type}]
            })
        }
    )

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "txHash",
        names: txHashes.map(value => ({name: value.name, id: value.id}))
    } : item))

    const objects = []
    txHashes.forEach(value => {
        let attributeValues = []
        attributeValues = [{name: "hashValue", time: value.time, value: value.value}]

        objects.push({
            id: value.id,
            key: "txHash",
            type: value.name,
            attributes: attributeValues
        })
    })

    setObjectsItem((oldObjects) => [...oldObjects, ...objects])
    const newOcel = {
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)],
        events: [...ocel.events]
    }
    setOcel(newOcel)

    const events = [...ocel.events]
    events.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "hash"})
            }
        })
    })

    addTxHashRelationships(newOcel, setOcel);
}

export const handleSenderObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const senders = []

    results?.forEach((log) => {
        senders.push({
            time: log.timestamp,
            id: log.sender + "_" + log.txHash,
            name: "sender",
            value: log.sender,
            type: "string"
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    const valuesSet = senders.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
    valuesSet.forEach(value => {
            newObjectTypes.push({
                name: value.name,
                attributes: [{name: "senderAddress", type: value.type}]
            })
        }
    )

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "sender",
        names: senders.map(value => ({name: value.name, id: value.id}))
    } : item))

    const objects = []
    senders.forEach(value => {
        let attributeValues = []
        attributeValues = [{name: "senderAddress", time: value.time, value: value.value}]

        objects.push({
            id: value.id,
            key: "senders",
            type: value.name,
            attributes: attributeValues
        })
    })

    setObjectsItem((oldObjects) => [...oldObjects, ...objects])
    const newOcel = {
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)],
        events: [...ocel.events]
    }
    setOcel(newOcel)

    const events = [...ocel.events]
    events.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "sent by"})
            }
        })
    })

    addSenderRelationships(newOcel, setOcel);
}

export const handleInputNameObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const variables = []

    results?.forEach((log) => {
        log.inputs.forEach((input, index) => {
            variables.push({
                time: log.timestamp,
                id: "inputName_" + index + "_" + log.txHash,
                name: input.inputName,
                value: input.inputValue,
                type: typeof input.inputValue === "number" ? "integer" : typeof input.inputValue
            })
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    const valuesSet = variables.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
    valuesSet.forEach(value => {
            newObjectTypes.push({
                name: value.name,
                attributes: [{name: "inputValue", type: value.type}]
            })
        }
    )

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "input",
        names: variables.map(value => ({name: value.name, id: value.id}))
    } : item))

    const objects = []
    variables.forEach(value => {
        let attributeValues = []
        attributeValues = [{name: "inputValue", time: value.time, value: value.value}]

        objects.push({
            id: value.id,
            key: "input",
            type: value.name,
            attributes: attributeValues
        })
    })

    setObjectsItem((oldObjects) => [...oldObjects, ...objects])
    const newOcel = {
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)],
        events: [...ocel.events]
    }
    setOcel(newOcel)

    const events = [...ocel.events]
    events.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "takes"})
            }
        })
    })

    addInputNameRelationships(newOcel, setOcel);
}

export const handleVariableNameObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const variables = []

    results?.forEach((log) => {
        log.storageState.forEach((variable) => {
            variables.push({
                time: log.timestamp,
                id: "variable_" + variable.variableName + "_" + log.contractAddress,
                name: variable.variableName,
                value: variable.variableValue,
                type: typeof variable.variableValue === "number" ? "integer" : typeof variable.variableValue
            })
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    const objects = []
    const valuesSet = variables.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
    valuesSet.forEach(value => {
            newObjectTypes.push({
                name: value.name,
                attributes: [{name: "variableValue", type: value.type}]
            })
            const varObject = {
                id: value.id,
                type: value.name,
                attributes: []
            }
            variables.forEach(variable => {
                if (variable.name === value.name) {
                    varObject.attributes.push({name: "variableValue", time: variable.time, value: variable.value})
                }
            })
            objects.push(varObject)
        }
    )

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "stateVariable",
        names: variables.map(value => ({name: value.name, id: value.id}))
    } : item))

    // variables.forEach(value => {
    //     let attributeValues = []
    //     attributeValues = [{name: "value", time: value.time, value: value.value}]
    //
    //     objects.push({
    //         id: value.id,
    //         key: "variableName",
    //         type: value.name,
    //         attributes: attributeValues
    //     })
    // })

    setObjectsItem((oldObjects) => [...oldObjects, ...objects])
    const newOcel = {
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects],
        events: [...ocel.events]
    }
    setOcel(newOcel)

    const events = [...ocel.events]
    events.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "updates"})
            }
        })
    })

    addVariableRelationships(newOcel, setOcel, results);
}

export const handleEventNameObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const variables = []

    results?.forEach((log) => {
        log.events.forEach((event, index) => {

            const variable = {
                time: log.timestamp,
                id: "event_" + index + "_" + log.txHash,
                name: event.eventName,
                attributes: [],
                attributesValue: []
            }

            const attributesNumber = event.eventValues.__length__
            for (let i = 0; i < attributesNumber; i++) {
                const attributeName = Object.keys(event.eventValues)[i + attributesNumber + 1] || Object.keys(event.eventValues)[i]
                variable.attributes.push({
                    name: attributeName,
                    type: typeof event.eventValues[Object.keys(event.eventValues)[i]] === "number" ? "integer" : "string"
                })

                variable.attributesValue.push({
                    name: attributeName,
                    time: log.timestamp,
                    value: event.eventValues[Object.keys(event.eventValues)[i]]
                })
            }
            variables.push(variable)

        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    const valuesSet = variables.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
    valuesSet.forEach(value => {
            newObjectTypes.push({
                name: value.name,
                attributes: value.attributes
            })
        }
    )

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "event",
        names: variables.map(value => ({name: value.name, id: value.id}))
    } : item))

    const objects = []
    variables.forEach(value => {

        objects.push({
            id: value.id,
            key: "event",
            type: value.name,
            attributes: value.attributesValue
        })
    })

    setObjectsItem((oldObjects) => [...oldObjects, ...objects])
    const newOcel = {
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)],
        events: [...ocel.events]
    }
    setOcel(newOcel)

    const events = [...ocel.events]
    events.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "emits"})
            }
        })
    })

    addEventRelationships(newOcel, setOcel);
}

export const handleCallTypeObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const variables = []

    results?.forEach((log) => {
        log.internalTxs.forEach((internalTx, index) => {
            variables.push({
                time: log.timestamp,
                id: "internalTransaction_" + index + "_" + log.txHash,
                name: "internalTransaction",
                value: internalTx.callType,
                type: "string"
            })
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    const valuesSet = variables.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
    valuesSet.forEach(value => {
        newObjectTypes.push({
            name: value.name,
            attributes: [{name: "callType", type: "string"}]
        })
    })

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "internalTx",
        names: variables.map(value => ({name: value.name, id: value.id}))
    } : item))

    const objects = []
    variables.forEach(value => {
        let attributeValues = []
        attributeValues = [{name: "callType", time: value.time, value: value.value}]

        objects.push({
            id: value.id,
            key: "internalTx",
            type: value.name,
            attributes: attributeValues
        })
    })

    setObjectsItem((oldObjects) => [...oldObjects, ...objects])
    const newOcel = {
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)],
        events: [...ocel.events]
    }
    setOcel(newOcel)

    const events = [...ocel.events]
    events.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "invokes"})
            }
        })
    })

    addInternalTxRelationships(newOcel, setOcel);
}

export const handleSelectEventsObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const events = new Set()

    results?.forEach((log) => {
        log.events.forEach((event) => {
            events.add(event.eventName)
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    newObjectTypes.push({
        name: "events",
        attributes: Array.from(events).map((_, index) => ({name: `eventName_${index + 1}`, type: "string"}))
    })

    const objects = []
    results?.forEach((log, index) => {
        const attributes = []
        for (let i = 0; i < events.size; i++) {
            let value = ""
            if (i <= log.events.length - 1 && Array.from(events).includes(log.events[i].eventName)) {
                value = log.events[i].eventName
            }

            attributes.push({
                name: `eventName_${i + 1}`,
                time: log.timestamp,
                value: value
            })
        }

        objects.push({
            id: `event_${index + 1}`,
            type: "events",
            attributes: attributes
        })
    })

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "events",
        names: objects.map((object) => ({name: `events`, id: object.id}))
    } : item))

    setOcel({
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects],
    })

    const ocelEvents = [...ocel.events]
    ocelEvents.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0]?.time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "emits"})
            }
        })
    })
}

export const handleSelectInputsObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const inputs = new Set()

    results?.forEach((log) => {
        log.inputs.forEach((input) => {
            inputs.add(input.inputName)
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    newObjectTypes.push({
        name: "inputs",
        attributes: Array.from(inputs).map((_, index) => ({name: `inputName_${index + 1}`, type: "string"}))
    })

    const objects = []
    results?.forEach((log, index) => {
        const attributes = []
        for (let i = 0; i < inputs.size; i++) {
            let value = ""
            if (i <= log.inputs.length - 1 && Array.from(inputs).includes(log.inputs[i].inputName)) {
                value = log.inputs[i].inputName
            }

            attributes.push({
                name: `inputName_${i + 1}`,
                time: log.timestamp,
                value: value
            })
        }

        objects.push({
            id: `input_${index + 1}`,
            type: "inputs",
            attributes: attributes
        })
    })

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "inputs",
        names: objects.map((object) => ({name: `inputs`, id: object.id}))
    } : item))

    setOcel({
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects],
    })

    const ocelEvents = [...ocel.events]
    ocelEvents.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0]?.time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "takes"})
            }
        })
    })
}

export const handleSelectInternalTxsObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const internalTxs = new Set()
    const internalTxsSize = new Set()

    results?.forEach((log) => {
        log.internalTxs.forEach((internalTx, index) => {
            internalTxs.add(internalTx.callType)
            internalTxsSize.add(`internalTx_${index + 1}`)
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    newObjectTypes.push({
        name: "internalTxs",
        attributes: Array.from(internalTxsSize).map((_, index) => ({name: `internalTx_${index + 1}`, type: "string"}))
    })

    const objects = []
    results?.forEach((log, index) => {
        const attributes = []
        for (let i = 0; i < internalTxsSize.size; i++) {
            let value = ""
            if (i <= log.internalTxs.length - 1 && Array.from(internalTxs).includes(log.internalTxs[i].callType)) {
                value = log.internalTxs[i].callType
            }

            attributes.push({
                name: `internalTx_${i + 1}`,
                time: log.timestamp,
                value: value
            })
        }

        objects.push({
            id: `internalTx_${index + 1}`,
            type: "internalTxs",
            attributes: attributes
        })
    })

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "internalTxs",
        names: objects.map((object) => ({name: `internalTxs`, id: object.id}))
    } : item))

    setOcel({
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects],
    })

    const ocelEvents = [...ocel.events]
    ocelEvents.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0]?.time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "invokes"})
            }
        })
    })
}

export const handleSelectStorageStateObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const variables = new Set()
    const variableSize = new Set()

    results?.forEach((log) => {
        log.storageState.forEach((variable, index) => {
            variables.add(variable.variableName)
            variableSize.add(`variableName_${index + 1}`)
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    newObjectTypes.push({
        name: "storageState",
        attributes: Array.from(variableSize).map((_, index) => ({name: `variableName_${index + 1}`, type: "string"}))
    })

    const objects = []
    results?.forEach((log, index) => {
        const attributes = []
        for (let i = 0; i < variableSize.size; i++) {
            let value = ""
            if (i <= log.storageState.length - 1 && Array.from(variables).includes(log.storageState[i].variableName)) {
                value = log.storageState[i].variableName
            }

            attributes.push({
                name: `variableName_${i + 1}`,
                time: log.timestamp,
                value: value
            })
        }

        objects.push({
            id: `storageStateVariable`,
            type: "storageState",
            attributes: attributes
        })
    })

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "storageState",
        names: objects.map((object) => ({name: `storageState`, id: object.id}))
    } : item))

    setOcel({
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects],
    })

    const ocelEvents = [...ocel.events]
    ocelEvents.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0]?.time === event?.time) {
                event.relationships.push({objectId: object.id, qualifier: "updates"})
            }
        })
    })
}