import { createSlice } from "@reduxjs/toolkit";
import { continueWithGoogle, getUserOrders, login, placeOrder, updateProfile } from "./userActions";

const userSlice = createSlice({
    name: "user",
    initialState: {
        info: JSON.parse(localStorage.getItem("userInfo"))
    },
    reducers: {
        invalidateUser: (state, { payload }) => {
            payload.forEach(item => {
                state[item] = null
            })
        },
        logout: (state) => {
            localStorage.removeItem("userInfo")
            state.info = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loading = false
                state.info = payload
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

            .addCase(updateProfile.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(updateProfile.fulfilled, (state, { payload }) => {
                state.loading = false
                state.update = true
            })
            .addCase(updateProfile.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })


            .addCase(placeOrder.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(placeOrder.fulfilled, (state, { payload }) => {
                state.loading = false
                state.placed = true
            })
            .addCase(placeOrder.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })


            .addCase(getUserOrders.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(getUserOrders.fulfilled, (state, { payload }) => {
                state.loading = false
                state.orderHistory = payload
            })
            .addCase(getUserOrders.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

            .addCase(continueWithGoogle.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(continueWithGoogle.fulfilled, (state, { payload }) => {
                state.loading = false
                state.info = payload
            })
            .addCase(continueWithGoogle.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

    }

})
export const { invalidateUser, logout } = userSlice.actions
export default userSlice.reducer