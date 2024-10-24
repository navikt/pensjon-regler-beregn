import {DataElement} from "../api/domain/types";

export const generateKey = () => {
    return Math.random().toString(36).slice(2, 7)
}

export const hasTypeProperty = (obj: DataElement): obj is DataElement => {
    return obj && typeof obj === "object" && "type" in obj;
}