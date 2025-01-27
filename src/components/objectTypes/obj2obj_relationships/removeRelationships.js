import {removeContractAddressRelationships} from "./removeContractAddressRelationships";
import {removeSenderRelationships} from "./removeSenderRelationships";
import {removeTxHashRelationships} from "./removeTxHashRelationships";

export const removeRelationships = (objectToRemove, ocel, setOcel) => {
    const nameToRemove = objectToRemove.name

    if (nameToRemove === "contractAddress") {
        removeContractAddressRelationships(ocel, setOcel)
    } else if (nameToRemove === "sender") {
        removeSenderRelationships(ocel, setOcel)
    } else if (nameToRemove === "txHash") {
        removeTxHashRelationships(ocel, setOcel)
    } else if (nameToRemove === "input") {
        removeInputSenderRelationships(ocel, setOcel)
    } else if (nameToRemove === "stateVariable") {
        removeStateVariableContractAddressRelationships(ocel, setOcel)
    } else if (nameToRemove === "event") {
        removeEventContractAddressRelationships(ocel, setOcel)
    } else if (nameToRemove === "internalTx") {
        removeInternalTxTxHashRelationships(ocel, setOcel)
    }
}

const removeInputSenderRelationships = (ocel, setOcel) => {
    const objects = ocel.objects
    objects.forEach((object) => {
        if (object.type === "sender") {
            object.relationships = object.relationships.filter((relationship) => (
                "passes" !== relationship.qualifier
            ))

            if (object.relationships.length === 0) {
                delete object.relationships
            }
        }
    })

    ocel.objects = objects
    setOcel(ocel)
}

const removeStateVariableContractAddressRelationships = (ocel, setOcel) => {
    const objects = ocel.objects
    objects.forEach((object) => {
        if (object.type === "contractAddress") {
            object.relationships = object.relationships.filter((relationship) => (
                "contains" !== relationship.qualifier
            ))

            if (object.relationships.length === 0) {
                delete object.relationships
            }
        }
    })

    ocel.objects = objects
    setOcel(ocel)
}

const removeEventContractAddressRelationships = (ocel, setOcel) => {
    const objects = ocel.objects
    objects.forEach((object) => {
        if (object.type === "contractAddress") {
            object.relationships = object.relationships.filter((relationship) => (
                "defines" !== relationship.qualifier
            ))

            if (object.relationships.length === 0) {
                delete object.relationships
            }
        }
    })

    ocel.objects = objects
    setOcel(ocel)
}

const removeInternalTxTxHashRelationships = (ocel, setOcel) => {
    const objects = ocel.objects
    objects.forEach((object) => {
        if (object.type === "transactionHash") {
            object.relationships = object.relationships.filter((relationship) => (
                "triggers" !== relationship.qualifier
            ))

            if (object.relationships.length === 0) {
                delete object.relationships
            }
        }
    })

    ocel.objects = objects
    setOcel(ocel)
}