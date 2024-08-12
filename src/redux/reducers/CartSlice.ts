import {createSlice} from "@reduxjs/toolkit";
interface isOpenCart {
    isOpenCart: boolean,
    totalPrice: number
}

const initialState: isOpenCart = {
    isOpenCart: false,
    totalPrice: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        openCart(state: isOpenCart) {
            state.isOpenCart = !state.isOpenCart
            console.log(state.isOpenCart)
            state.isOpenCart && document.querySelector('body').classList.add('open-cart')
        },
        closeCart(state: isOpenCart) {
            state.isOpenCart && document.querySelector('body').classList.remove('open-cart')
            state.isOpenCart = !state.isOpenCart
        },
        getTotalPrice(state:isOpenCart ,action) {
            state.totalPrice = action.payload.reduce((total, item) => total + item.price, 0);
        }
    }
})

export default cartSlice.reducer;
