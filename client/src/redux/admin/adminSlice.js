import { createSlice } from "@reduxjs/toolkit";
import { addProduct, getOrders, getUsers, handleUserAccount, readProducts, updateOrderStatus, updateProduct } from "./adminActions";

const adminSlice = createSlice({
    name: "admin",
    initialState: {},
    reducers: {
        invalidate: state => {
            state.productAdded = null
            state.error = null
            state.update = null
            state.statusUpdate = false
            state.userAccountUpdate = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addProduct.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(addProduct.fulfilled, (state, { payload }) => {
                state.loading = false
                state.productAdded = true
            })
            .addCase(addProduct.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })


            .addCase(readProducts.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(readProducts.fulfilled, (state, { payload }) => {
                state.loading = false
                state.products = payload
            })
            .addCase(readProducts.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })


            .addCase(updateProduct.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(updateProduct.fulfilled, (state, { payload }) => {
                state.loading = false
                state.update = true
            })
            .addCase(updateProduct.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })


            .addCase(getOrders.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(getOrders.fulfilled, (state, { payload }) => {
                state.loading = false
                state.orders = payload
            })
            .addCase(getOrders.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

            .addCase(updateOrderStatus.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
                state.loading = false
                state.statusUpdate = true
            })
            .addCase(updateOrderStatus.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

            .addCase(getUsers.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(getUsers.fulfilled, (state, { payload }) => {
                state.loading = false
                state.users = payload
            })
            .addCase(getUsers.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

            .addCase(handleUserAccount.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(handleUserAccount.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userAccountUpdate = true
            })
            .addCase(handleUserAccount.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    }

})

export const { invalidate } = adminSlice.actions

export default adminSlice.reducer