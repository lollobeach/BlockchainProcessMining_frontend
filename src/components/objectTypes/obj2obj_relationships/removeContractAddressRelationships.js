export const removeContractAddressRelationships = (ocel, setOcel) => {
    const objects = ocel.objects

    if (objects.some(obj => obj.type === "sender")) {
        removeContractAddressSenderRelationships(ocel, setOcel)
    }
    if (objects.some(obj => obj.id.includes("variable_"))) {
        removeContractAddressVariableNameRelationships(ocel, setOcel)
    }
    if (objects.some(obj => obj.id.includes("event_"))) {
        removeContractAddressEventNameRelationships(ocel, setOcel)
    }
}

const removeContractAddressSenderRelationships = (ocel, setOcel) => {
    const objects = ocel.objects
    objects.forEach((object) => {
        if (object.type === "sender") {
            object.relationships = object.relationships.filter((relationship) => (
                "invokes" !== relationship.qualifier
            ))

            if (object.relationships.length === 0) {
                delete object.relationships
            }
        }
    })

    ocel.objects = objects
    setOcel(ocel)
}

const removeContractAddressVariableNameRelationships = (ocel, setOcel) => {
    const objects = ocel.objects
    objects.forEach((object) => {
        if (object.id.includes("variable_")) {
            object.relationships = object.relationships.filter((relationship) => (
                !relationship.qualifier.includes("storage of")
            ))

            if (object.relationships.length === 0) {
                delete object.relationships
            }
        }
    })

    ocel.objects = objects
    setOcel(ocel)
}

const removeContractAddressEventNameRelationships = (ocel, setOcel) => {
    const objects = ocel.objects
    objects.forEach((object) => {
        if (object.id.includes("event_")) {
            object.relationships = object.relationships.filter((relationship) => (
                !relationship.qualifier.includes("member of")
            ))

            if (object.relationships.length === 0) {
                delete object.relationships
            }
        }
    })

    ocel.objects = objects
    setOcel(ocel)
}