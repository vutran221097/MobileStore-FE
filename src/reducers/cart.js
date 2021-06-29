import {
    GET_NUMBER_CART,
    ADD_CART,
    DECREASE_QUANTITY,
    INCREASE_QUANTITY,
    DELETE_CART
} from "../actions/types";

const initProduct = {
    numberCart: 0,
    Carts: [],
    _productCart: []
};

export default function productCart(state = initProduct, action) {
    switch (action.type) {
        case GET_NUMBER_CART:
            return {
                ...state
            };
        case ADD_CART:
            if (state.numberCart === 0) {
                const cart = {
                    id: action.payload._id,
                    quantity: 1,
                    name: action.payload.name,
                    image: action.payload.image,
                    price: action.payload.price,
                    color: action.payload.color,
                    guarantee : action.payload.guarantee
                };
                state.Carts.push(cart);
            } else {
                let check = false;
                state.Carts.forEach((item, key) => {
                    if (item.id === action.payload._id) {
                        state.Carts[key].quantity++;
                        check = true;
                    }
                });
                if (!check) {
                    let _cart = {
                        id: action.payload._id,
                        quantity: 1,
                        name: action.payload.name,
                        image: action.payload.image,
                        price: action.payload.price,
                        color: action.payload.color,
                        guarantee : action.payload.guarantee
                    };
                    state.Carts.push(_cart);
                }
            }
            return {
                ...state,
                numberCart: state.numberCart + 1
            };
        case INCREASE_QUANTITY:
            state.numberCart++;
            state.Carts[action.payload].quantity++;

            return {
                ...state
            };
        case DECREASE_QUANTITY:
            let quantity = state.Carts[action.payload].quantity;
            if (quantity > 1) {
                state.numberCart--;
                state.Carts[action.payload].quantity--;
            }

            return {
                ...state
            };
        case DELETE_CART:
            let quantity_ = state.Carts[action.payload].quantity;
            return {
                ...state,
                numberCart: state.numberCart - quantity_,
                    Carts: state.Carts.filter(item => {
                        return item.id !== state.Carts[action.payload].id
                    })

            }
            default:
                return state;
    }
}