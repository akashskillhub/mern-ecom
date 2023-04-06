import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const login = createAsyncThunk("user/login", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/user/login", userData)
        return data.result
    } catch (error) {
        return rejectWithValue(error.response.data.message || error.message)
    }

})
export const updateProfile = createAsyncThunk("user/update-profile", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await api.put(`/users/${userData.id}`, userData)
        return true
    } catch (error) {
        return rejectWithValue("something went wrong : " + error.message)

    }

})
export const placeOrder = createAsyncThunk("user/order-place", async (orderData, { rejectWithValue, getState }) => {
    try {
        const { data } = await api.post(`/orders`, {
            userId: getState().user.info.id,
            products: orderData,
            paid: false,
            status: "placed"
        })
        return true
    } catch (error) {
        return rejectWithValue("something went wrong : " + error.message)

    }

})
export const getUserOrders = createAsyncThunk("user/get-orders", async (orderData, { rejectWithValue, getState }) => {
    try {
        const { data } = await api.get(`/orders`, {
            params: {
                userId: getState().user.info.id
            }
        })
        return data
    } catch (error) {
        return rejectWithValue("something went wrong : " + error.message)

    }
})
export const continueWithGoogle = createAsyncThunk("user/google", async (tokenId, { rejectWithValue, getState }) => {
    try {
        const { data } = await api.post(`/user/continue-with-google`, { tokenId })
        return data.result
    } catch (error) {

        return rejectWithValue(error.response.data.message || error.message)

    }

})