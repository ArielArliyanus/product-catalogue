export const ADD_ITEM = 'ADD_ITEM';

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item,
});

export const SET_PRODUCTS = 'SET_PRODUCTS';

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});