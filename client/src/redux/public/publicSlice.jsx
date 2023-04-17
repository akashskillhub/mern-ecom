import { createSlice } from "@reduxjs/toolkit";
import { forgetPassword, getCartItems, getProductDetail, getProducts, resetPassword, userRegister } from "./publicAction";

const publicSlice = createSlice({
    name: "public",
    initialState: {
        cart: JSON.parse(localStorage.getItem("cart")) || []
    },
    reducers: {
        invalidatePublic: (state, { payload }) => {
            payload.forEach(item => {
                state[item] = null
            })
        },
        addToCart: (state, { payload }) => {
            state.cart.push(payload)
            state.total = state.cart.reduce((total, item) => total + (item.qty * item.price), 0)

            localStorage.setItem("cart", JSON.stringify(state.cart))

        },
        deleteCartItem: (state, { payload }) => {
            state.cart.splice(payload, 1)
        },
        emptyCart: state => {
            state.cart = []
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getProducts.pending, (state, { payload }) => {
                state.laoding = true
            })
            .addCase(getProducts.fulfilled, (state, { payload }) => {
                state.laoding = false
                state.products = payload
            })
            .addCase(getProducts.rejected, (state, { payload }) => {
                state.laoding = false
                state.error = payload
            })

            .addCase(getProductDetail.pending, (state, { payload }) => {
                state.laoding = true
            })
            .addCase(getProductDetail.fulfilled, (state, { payload }) => {
                state.laoding = false
                state.singleProduct = payload
            })
            .addCase(getProductDetail.rejected, (state, { payload }) => {
                state.laoding = false
                state.error = payload
            })





            .addCase(getCartItems.pending, (state, { payload }) => {
                state.laoding = true
            })
            .addCase(getCartItems.fulfilled, (state, { payload }) => {
                state.laoding = false
                state.cart = payload
            })
            .addCase(getCartItems.rejected, (state, { payload }) => {
                state.laoding = false
                state.error = payload
            })


            .addCase(userRegister.pending, (state, { payload }) => {
                state.laoding = true
            })
            .addCase(userRegister.fulfilled, (state, { payload }) => {
                state.laoding = false
                state.register = true
            })
            .addCase(userRegister.rejected, (state, { payload }) => {
                state.laoding = false
                state.error = payload
            })


            .addCase(forgetPassword.pending, (state, { payload }) => {
                state.laoding = true
            })
            .addCase(forgetPassword.fulfilled, (state, { payload }) => {
                state.laoding = false
                state.emailSend = true
            })
            .addCase(forgetPassword.rejected, (state, { payload }) => {
                state.laoding = false
                state.error = payload
            })


            .addCase(resetPassword.pending, (state, { payload }) => {
                state.laoding = true
            })
            .addCase(resetPassword.fulfilled, (state, { payload }) => {
                state.laoding = false
                state.resetPass = true
            })
            .addCase(resetPassword.rejected, (state, { payload }) => {
                state.laoding = false
                state.error = payload
            })
    }

})

export const { addToCart, emptyCart, deleteCartItem, invalidatePublic } = publicSlice.actions

export default publicSlice.reducer