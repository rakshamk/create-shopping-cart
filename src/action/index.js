import { LOAD_PRODUCTS, URL_ROOT, SEARCH_PRODUCTS, PRODUCT_ADD, PRODUCT_REMOVE, PRODUCT_DELETE, FILTER_PRICE, FILTER_PRICE_UPDATE } from "../constants";

export function getProducts() {
    const request = fetch(`${URL_ROOT}items`,
        { method: 'GET' })
        .then(response => response.json())

    return {
        type: LOAD_PRODUCTS,
        payload: request
    }
}

export function searchProducts(keyword) {
    const request = fetch(`${URL_ROOT}items?q=${keyword}`,
        { method: 'GET' })
        .then(response => response.json())

    return {
        type: SEARCH_PRODUCTS,
        payload: request
    }
}

export function productAddCart(id) {
    return {
        type: PRODUCT_ADD,
        payload: id
    }
}

export function productRemoveCart(id) {
    return {
        type: PRODUCT_REMOVE,
        payload: id
    }
}

export function productDeleteCart(id) {
    return {
        type: PRODUCT_DELETE,
        payload: id
    }
}

export function productSortAction(action) {
    return {
        type: action
    }
}

export function productsRangeListingUpdate(value) {
    return {
        type: FILTER_PRICE_UPDATE,
        payload: value
    }
}

export function productsRangeListing(value) {
    return {
        type: FILTER_PRICE,
        payload: value
    }
}