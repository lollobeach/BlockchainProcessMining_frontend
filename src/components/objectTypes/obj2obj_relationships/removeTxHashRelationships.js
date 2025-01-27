export const removeTxHashRelationships = (ocel, setOcel) => {
    const objects = ocel.objects

    if (objects.some(obj => obj.type === "sender")) {
        removeTxHashSenderRelationships(ocel, setOcel)
    }
    if (objects.some(obj => obj.id.includes("internalTransaction_"))) {
        removeTxHashInternalTxRelationships(ocel, setOcel)
    }
}

const removeTxHashSenderRelationships = (ocel, setOcel) => {
    const objects = ocel.objects
    objects.forEach((object) => {
        if (object.type === "sender") {
            object.relationships = object.relationships.filter((relationship) => (
                "generates" !== relationship.qualifier
            ))

            if (object.relationships.length === 0) {
                delete object.relationships
            }
        }
    })

    ocel.objects = objects
    setOcel(ocel)
}

const removeTxHashInternalTxRelationships = (ocel, setOcel) => {
    const objects = ocel.objects
    objects.forEach((object) => {
        if (object.id.includes("internalTransaction_")) {
            object.relationships = object.relationships.filter((relationship) => (
                "triggered in" !== relationship.qualifier
            ))

            if (object.relationships.length === 0) {
                delete object.relationships
            }
        }
    })

    ocel.objects = objects
    setOcel(ocel)
}