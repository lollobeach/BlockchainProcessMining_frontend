export const handleInputNameObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const variables = []

    results?.forEach((log) => {
        log.inputs.forEach((input) => {
            variables.push({
                time: log.timestamp,
                id: input.inputId,
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
                attributes: [{name: "value", type: value.type}]
            })
        }
    )

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "inputName",
        names: variables.map(value => ({name: value.name, id: value.id}))
    } : item))

    const objects = []
    variables.forEach(value => {
        let attributeValues = []
        attributeValues = [{name: "value", time: value.time, value: value.value}]

        objects.push({
            id: value.id,
            key: "inputName",
            type: value.name,
            attributes: attributeValues
        })
    })

    setObjectsItem((oldObjects) => [...oldObjects, ...objects])
    setOcel({
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)],
        events: [...ocel.events]
    })

    const events = [...ocel.events]
    events.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "paramater"})
            }
        })
    })
}

export const handleVariableNameObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const variables = []

    results?.forEach((log) => {
        log.storageState.forEach((variable) => {
            variables.push({
                time: log.timestamp,
                id: variable.variableId,
                name: variable.variableName,
                value: variable.variableValue,
                type: typeof variable.variableValue === "number" ? "integer" : typeof variable.variableValue
            })
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    const valuesSet = variables.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
    valuesSet.forEach(value => {
            newObjectTypes.push({
                name: value.name,
                attributes: [{name: "value", type: value.type}]
            })
        }
    )

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "variableName",
        names: variables.map(value => ({name: value.name, id: value.id}))
    } : item))

    const objects = []
    variables.forEach(value => {
        let attributeValues = []
        attributeValues = [{name: "value", time: value.time, value: value.value}]

        objects.push({
            id: value.id,
            key: "variableName",
            type: value.name,
            attributes: attributeValues
        })
    })

    setObjectsItem((oldObjects) => [...oldObjects, ...objects])
    setOcel({
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)]
    })

    const events = [...ocel.events]
    events.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "update"})
            }
        })
    })
}

export const handleEventNameObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const variables = []

    results?.forEach((log) => {
        log.events.forEach((event) => {
            variables.push({
                time: log.timestamp,
                id: event.eventId,
                name: event.eventName,
                owner: event.eventValues.owner,
                ownerType: "string",
                spender: event.eventValues.spender,
                spenderType: "string",
                value: event.eventValues.value,
                valueType: "integer"
            })
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    const valuesSet = variables.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
    valuesSet.forEach(value => {
            newObjectTypes.push({
                name: value.name,
                attributes: [
                    {name: "owner", type: value.ownerType},
                    {name: "spender", type: value.spenderType},
                    {name: "value", type: value.valueType}
                ]
            })
        }
    )

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "eventName",
        names: variables.map(value => ({name: value.name, id: value.id}))
    } : item))

    const objects = []
    variables.forEach(value => {
        let attributeValues = []
        attributeValues = [{name: "owner", time: value.time, value: value.owner}, {
            name: "spender",
            time: value.time,
            value: value.spender
        }, {name: "value", time: value.time, value: value.value}]

        objects.push({
            id: value.id,
            key: "eventName",
            type: value.name,
            attributes: attributeValues
        })
    })

    setObjectsItem((oldObjects) => [...oldObjects, ...objects])
    setOcel({
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)]
    })

    const events = [...ocel.events]
    events.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "emitted"})
            }
        })
    })
}

export const handleCallTypeObjects = (results, ocel, setObjectsTypesItem, objectsTypesItem, objectType, setObjectsItem, setOcel) => {
    const variables = []

    results?.forEach((log) => {
        log.internalTxs.forEach((internalTx) => {
            variables.push({
                time: log.timestamp,
                id: internalTx.callId,
                name: internalTx.callType,
                value: internalTx.to,
                type: "string"
            })
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    const valuesSet = variables.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name))
    valuesSet.forEach(value => {
        newObjectTypes.push({
            name: value.name,
            attributes: [{name: "to", type: "string"}]
        })
    })

    setObjectsTypesItem(objectsTypesItem.map(item => item === objectType ? {
        ...item,
        name: "callType",
        names: variables.map(value => ({name: value.name, id: value.id}))
    } : item))

    const objects = []
    variables.forEach(value => {
        let attributeValues = []
        attributeValues = [{name: "to", time: value.time, value: value.value}]

        objects.push({
            id: value.id,
            key: "callType",
            type: value.name,
            attributes: attributeValues
        })
    })

    setObjectsItem((oldObjects) => [...oldObjects, ...objects])
    setOcel({
        ...ocel,
        objectTypes: newObjectTypes,
        objects: [...ocel.objects, ...objects.map(({key, ...rest}) => rest)]
    })

    const events = [...ocel.events]
    events.forEach((event) => {
        objects.forEach((object) => {
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "invoked"})
            }
        })
    })
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
        attributes: Array.from(events).map((_, index) => ({name: `eventName_${index+1}`, type: "string"}))
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
                name: `eventName_${i+1}`,
                time: log.timestamp,
                value: value
            })
        }

        objects.push({
            id: `event_${index}`,
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
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "emitted"})
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
        attributes: Array.from(inputs).map((_, index) => ({name: `inputName_${index+1}`, type: "string"}))
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
                name: `inputName_${i+1}`,
                time: log.timestamp,
                value: value
            })
        }

        objects.push({
            id: `input_${index}`,
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
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "parameter"})
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
            internalTxsSize.add(`internalTx_${index+1}`)
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    newObjectTypes.push({
        name: "internalTxs",
        attributes: Array.from(internalTxsSize).map((_, index) => ({name: `internalTx_${index+1}`, type: "string"}))
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
                name: `internalTx_${i+1}`,
                time: log.timestamp,
                value: value
            })
        }

        objects.push({
            id: `internalTx_${index}`,
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
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "invoked"})
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
            variableSize.add(`variableName_${index+1}`)
        })
    })

    let newObjectTypes = [...ocel.objectTypes]
    newObjectTypes.push({
        name: "storageState",
        attributes: Array.from(variableSize).map((_, index) => ({name: `variableName_${index+1}`, type: "string"}))
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
                name: `variableName_${i+1}`,
                time: log.timestamp,
                value: value
            })
        }

        objects.push({
            id: `variable_${index}`,
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
            if (object.attributes[0].time === event.time) {
                event.relationships.push({objectId: object.id, qualifier: "update"})
            }
        })
    })
}