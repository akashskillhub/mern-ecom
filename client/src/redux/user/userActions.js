import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const login = createAsyncThunk("user/login", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/user/login", userData)
        localStorage.setItem("info", JSON.stringify(data.result))
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
        console.log(orderData)
        const { data } = await api.post(`/orders/place`, {
            products: orderData,
            paid: false,
            status: "placed"
        })
        console.log(data)
        return true
    } catch (error) {
        return rejectWithValue(error.response.data.message || error.message)

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
        localStorage.setItem("info", JSON.stringify(data.result))
        return data.result
    } catch (error) {

        return rejectWithValue(error.response.data.message || error.message)

    }

})
export const initiatePaymentAction = createAsyncThunk("user/initiate-payment", async (amount, { rejectWithValue, getState }) => {
    try {
        const { data } = await api.post(`/orders/initiate-payment`, { amount })
        return data.result
    } catch (error) {

        return rejectWithValue(error.response.data.message || error.message)

    }

})
export const verifyPaymentAction = createAsyncThunk("user/verify-payment", async (response, { rejectWithValue, getState }) => {
    try {
        const { data } = await api.post(`/orders/verify-payment`, response)

        return data.result
    } catch (error) {
        return rejectWithValue(error.response.data.message || error.message)

    }

})

