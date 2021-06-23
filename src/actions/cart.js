import {
    GET_NUMBER_CART,
    ADD_CART,
    UPDATE_CART,
    DECREASE_QUANTITY,
    INCREASE_QUANTITY,
    DELETE_CART
} from "./types";

export function GetNumberCart() {
    return {
        type: GET_NUMBER_CART
    }
}

export function AddCart(payload) {
    return {
        type: ADD_CART,
        payload: payload
    }
}
export function UpdateCart(payload) {
    return {
        type: UPDATE_CART,
        payload: payload
    }
}
export function DeleteCart(payload) {
    return {
        type: DELETE_CART,
        payload: payload
    }
}

export function IncreaseQuantity(payload) {
    return {
        type: INCREASE_QUANTITY,
        payload: payload
    }
}
export function DecreaseQuantity(payload) {
    return {
        type: DECREASE_QUANTITY,
        payload: payload
    }
}