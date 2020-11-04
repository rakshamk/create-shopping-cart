import { LOAD_PRODUCTS, SEARCH_PRODUCTS, PRODUCT_ADD, PRODUCT_REMOVE, PRODUCT_DELETE, FILTER_PRICE, FILTER_PRICE_UPDATE, INITIAL_STATE, SORT_ASENDING, SORT_DESENDING, SORT_DISCOUNT } from "../constants";

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_PRODUCTS: {
            return {
                ...state, list: action.payload, dataLoading: false
            }
        }
        case SEARCH_PRODUCTS: {
            return { ...state, list: action.payload }
        }
        case SORT_ASENDING: {
            const sortAsend = state.list.sort((a, b) => parseFloat(a.price.actual) - parseFloat(b.price.actual));
            return { ...state, list: sortAsend, activeSort: SORT_ASENDING }
        }
        case SORT_DESENDING: {
            const sortDesend = state.list.sort((a, b) => parseFloat(b.price.actual) - parseFloat(a.price.actual));
            return { ...state, list: sortDesend, activeSort: SORT_DESENDING }
        }
        case SORT_DISCOUNT: {
            const sortDiscount = state.list.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount));
            return { ...state, list: sortDiscount, activeSort: SORT_DISCOUNT }
        }
        case FILTER_PRICE_UPDATE: {
            return { ...state, value: { ...action.payload } }
        }
        case FILTER_PRICE: {
            if (state.hasOwnProperty('oldList')) {
                state.list = state.oldList
            }
            let filteredData = state.list.filter((e) => e.price.actual >= action.payload.min && e.price.actual <= action.payload.max);
            return { ...state, oldList: state.list, list: filteredData }
        }
        case PRODUCT_ADD: {
            let addedItem = state.list.find(item => item.id === action.payload)
            let existed_item = state.addedItems.find(item => action.payload === item.id)
            if (existed_item) {
                addedItem['quantity'] += 1;
                state.totalProducts += 1;
                return {
                    ...state,
                    total: state.total + addedItem.price.actual,
                    totalDisplay: state.totalDisplay + addedItem.price.display,
                    totalDiscount: state.totalDiscount + (addedItem.price.display - addedItem.price.actual)
                }
            }
            else {
                state.totalProducts += 1;
                addedItem['quantity'] = 1;

                return {
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total: state.total + addedItem.price.actual,
                    totalDisplay: state.totalDisplay + addedItem.price.display,
                    totalDiscount: state.totalDiscount + (addedItem.price.display - addedItem.price.actual)
                }

            }
        }
        case PRODUCT_REMOVE: {
            let removedItem = state.list.find(item => item.id === action.payload);
            let existed_item = state.addedItems.find(item => action.payload === item.id);
            if (existed_item) {
                removedItem['quantity'] -= 1;
                state.totalProducts -= 1;
                let newState = {
                    ...state,
                    total: state.total - removedItem.price.actual,
                    totalDisplay: state.totalDisplay - removedItem.price.display,
                    totalDiscount: state.totalDiscount - (removedItem.price.display - removedItem.price.actual)
                }
                if (removedItem.quantity === 0) {
                    let remainItems = state.addedItems.filter(item => action.payload !== item.id);
                    newState.addedItems = remainItems
                }
                return newState;
            }
            else {
                state.totalProducts -= 1;
                removedItem['quantity'] -= 1;

                return {
                    ...state,
                    addedItems: [...state.addedItems, removedItem],
                    total: state.total + removedItem.price.actual,
                    totalDisplay: state.totalDisplay - removedItem.price.display,
                    totalDiscount: state.totalDiscount - (removedItem.price.display - removedItem.price.actual)
                }

            }
        }
        case PRODUCT_DELETE: {
            let productDeleted = state.addedItems.find(item => item.id === action.payload);
            let remainItems = state.addedItems.filter(item => action.payload !== item.id);
            let quantity = productDeleted.quantity;
            let total = state.total - (productDeleted.price.actual * quantity);
            let totalDisplay = state.totalDisplay - (productDeleted.price.display * quantity);
            let totalDiscount = state.totalDiscount - ((productDeleted.price.display - productDeleted.price.actual) * quantity)
            let totalProducts = state.totalProducts - quantity;
            productDeleted.quantity = 0;
            return {
                ...state,
                addedItems: remainItems,
                total,
                totalDisplay,
                totalDiscount,
                totalProducts
            }
        }
        default:
            return state;
    }
}