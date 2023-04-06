import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const getProducts = createAsyncThunk("public/get-products", async (value, { rejectWithValue, getState }) => {
    try {
        const { data } = await api.get("/products", {
            params: {
                publish: true
            }
        })
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
export const getProductDetail = createAsyncThunk("public/get-product-detail", async (product, { rejectWithValue, getState }) => {
    try {
        const { data } = await api.get(`/products/${product}`, {
            params: {
                publish: true
            }
        })
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }

})


export const getCartItems = createAsyncThunk("public/get-cart", async (cartItem, { rejectWithValue, getState }) => {
    try {
        const { data } = await api.get(`/cart`)
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }

})
export const userRegister = createAsyncThunk("public/register", async (user, { rejectWithValue, getState }) => {
    try {
        const { data } = await api.post(`/user/register`, user)
        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message || error.message)
    }

})
export const forgetPassword = createAsyncThunk("public/forget-pass", async (user, { rejectWithValue, getState }) => {
    try {
        const { data } = await api.post(`/user/forget-password`, user)
        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message || error.message)
    }

})