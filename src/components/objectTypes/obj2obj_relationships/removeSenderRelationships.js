export const removeSenderRelationships = (ocel, setOcel) => {
    const objects = ocel.objects

    if (objects.some(obj => obj.type === "contractAddress")) {
        removeSenderContractAddressRelationships(ocel, setOcel)
    }
    if (objects.some(obj => obj.id.includes("inputName_"))) {
        removeSenderInputRelationships(ocel, setOcel)
    }
    if (objects.some(obj => obj.type === "txHash")) {
        removeSenderTxHashRelationships(ocel, setOcel)
    }
}

const removeSenderContractAddressRelationships = (ocel, setOcel) => {
    const objects = ocel.objects
    objects.forEach((object) => {
        if (object.type === "contractAddress") {
            object.relationships = object.relationships.filter((relationship) => (
                "invoked by" !== relationship.qualifier
            ))

            if (object.relationships.length === 0) {
                delete object.relationships
            }
        }
    })

    ocel.objects = objects
    setOcel(ocel)
}

const removeSenderInputRelationships = (ocel, setOcel) => {
    const objects = ocel.objects
    objects.forEach((object) => {
        if (object.id.includes("inputName_")) {
            object.relationships = object.relationships.filter((relationship) => (
                "is inserted by" !== relationship.qualifier
            ))

            if (object.relationships.length === 0) {
                delete object.relationships
            }
        }
    })

    ocel.objects = objects
    setOcel(ocel)
}

const removeSenderTxHashRelationships = (ocel, setOcel) => {
    const objects = ocel.objects
    objects.forEach((object) => {
        if (object.type === "txHash") {
            object.relationships = object.relationships.filter((relationship) => (
                "created by" !== relationship.qualifier
            ))

            if (object.relationships.length === 0) {
                delete object.relationships
            }
        }
    })

    ocel.objects = objects
    setOcel(ocel)
}